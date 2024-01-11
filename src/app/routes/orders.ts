import { Elysia } from "elysia"
import { orderModel } from "../models/models";

export const orderRouter = new Elysia();

orderRouter.get("/", async () => {
    return { orders: await orderModel.find().exec() };
});

orderRouter.get("/all", async () => {
    return { orders: await orderModel.find().exec() };
});

const hst = "highest", lst = "lowest", avg = "average";
const sort_map = new Map()
    .set("high", hst)
    .set("highest", hst)
    .set("low", lst)
    .set("lowest", lst)
    .set("avg", avg)
    .set("average", avg);

const month_map = new Map()
    .set("1", 0).set("Jan", 0).set("January", 0)
    .set("2", 1).set("Feb", 1).set("February", 1)
    .set("3", 2).set("March", 2)
    .set("4", 3).set("April", 3)
    .set("5", 4).set("May", 4)
    .set("6", 5).set("June", 5)
    .set("7", 6).set("July", 6)
    .set("8", 7).set("Aug", 7).set("August", 7)
    .set("9", 8).set("Sep", 8).set("September", 8)
    .set("10", 9).set("Oct", 9).set("October", 9)
    .set("11", 10).set("Nov", 10).set("November", 10)
    .set("12", 11).set("Dec", 11).set("December", 11);

const status_map = new Map()
    .set("0", "Fetching").set(0, "Fetching")
    .set("1", "Sent").set(1, "Sent")
    .set("2", "Arrived").set(2, "Arrived");

type Item = {
    name: string;
    id: number;
    shelft: string;
    weight: number;
    price: number;
};

type Timestamp = {
    date: string;
    status: number;
};

type Order = {
    warehouseID: number;
    status: number;
    id: number;
    driverID: number;
    fetcherID: number;
    items: Item[];
    timestamps: Timestamp[]
};

// kr as base
// Values taken at : 29 Dec 2023
const currency_map = new Map()
    .set("sek", 1)
    .set("dollar", 10.00)
    .set("euro", 11.08)
    .set("rubel", 0.11)
    .set("robux", 0.16) // A Roblox "Robux" is more worth than a Russian Rubel...

orderRouter.get("/total/:month/", async ({ params: { month }, query: { currency } }) => {
    if (!month_map.has(month)) {
        return { orders: {} };
    }

    let wantedCurrency = "sek";
    if (currency) {
        if (currency_map.has(currency)) {
            wantedCurrency = currency;
        }
    }

    let allOrders: Order[] = await orderModel.find().exec() as unknown as Order[];

    const year = new Date().getFullYear();
    const startTime: number = new Date(year, month_map.get(month), 1, 8, 0, 0, 0).getTime();
    const endTime: number = new Date(year, month_map.get(month) + 1, 1, 8, 0, 0, 0).getTime();

    allOrders = allOrders.filter(order => {
        let fetchTime = new Date(order.timestamps[0].date).getTime();
        if (startTime < fetchTime && fetchTime < endTime) {
            return order;
        }
    });

    let totalSum = 0;
    allOrders.forEach(order => {
        order.items.forEach(item => {
            totalSum += item.price;
        })
    })

    let priceMod = currency_map.get(wantedCurrency);
    totalSum /= priceMod;

    return { sum: totalSum, unit: wantedCurrency };
});

orderRouter.get("/sort/:month/:sorting", async ({ params: { month, sorting }, query: { currency } }) => {
    if (!month_map.has(month) || !sort_map.has(sorting)) {
        return {};
    }

    let wantedCurrency = "sek";
    if (currency) {
        if (currency_map.has(currency)) {
            wantedCurrency = currency;
        }
    }

    let allOrders: Order[] = await orderModel.find().exec() as unknown as Order[];

    const year = new Date().getFullYear();
    const startTime: number = new Date(year, month_map.get(month), 1, 8, 0, 0, 0).getTime();
    const endTime: number = new Date(year, month_map.get(month) + 1, 1, 8, 0, 0, 0).getTime();

    allOrders = allOrders.filter(order => {
        let fetchTime = new Date(order.timestamps[0].date).getTime();
        if (startTime < fetchTime && fetchTime < endTime) {
            return order;
        }
    });

    switch (sort_map.get(sorting)) {
        case hst:
            {
                let highestPrice = 0;
                let that_order;

                allOrders.forEach(order => {
                    let orderPrice = 0;
                    order.items.forEach(item => {
                        orderPrice += item.price;
                    });

                    highestPrice = Math.max(orderPrice, highestPrice);
                    if (highestPrice == orderPrice) {
                        that_order = order;
                    }
                });

                highestPrice /= currency_map.get(wantedCurrency);
                return { highest: highestPrice, currency: wantedCurrency, order: that_order };
            }
        case lst:
            // Generated data is so large so there is always a bino order, that is 16kr...
            // ...always. But as you can see in the code it checks it still.
            {
                let lowestPrice = Number.POSITIVE_INFINITY;
                let that_order;

                allOrders.forEach(order => {
                    let orderPrice = 0;
                    order.items.forEach(item => {
                        orderPrice += item.price;
                    });

                    lowestPrice = Math.min(orderPrice, lowestPrice);
                    if (lowestPrice == orderPrice) {
                        that_order = order;
                    }
                });

                lowestPrice /= currency_map.get(wantedCurrency);
                return { lowest: lowestPrice, currency: wantedCurrency, order: that_order };
            }
        case avg:
            {
                let averagePrice = 0;

                allOrders.forEach(order => {
                    order.items.forEach(item => {
                        averagePrice += item.price;
                    });
                });

                averagePrice /= allOrders.length;

                averagePrice /= currency_map.get(wantedCurrency);
                return { average: averagePrice, currency: wantedCurrency };
            }
    }
});

const time_sort_map = new Map()
    .set("oldest", "old")
    .set("old", "old")
    .set("newest", "new")
    .set("new", "new")

orderRouter.get("/logistical/:time_sort/:status", async ({ params: { time_sort, status } }) => {
    if (!time_sort_map.has(time_sort) || status_map.has(status)) {
        return {};
    }

    let wanted_sort = time_sort_map.get(time_sort);
    let wanted_status = status_map.get(status);

    let allOrders = await orderModel.find().exec();

    switch (wanted_sort) {
        case "old":
            {

                return {};
            }
        case "new":
            {
                return {};
            }
    }

    return { orders: allOrders };
});