/*

    Warehouses ->
        Products ->
            Amount 
            Weight
            Shelf []
                Shelf->Item []
                    Items
            Price
        Workers [] ->
            Drivers
            Fetchers
        "Schedule for orders every day?"
            
    Worker ->
        Name - for fun
        Occupation
        ID
        Schedules (for every month of a year)
        Warehouse connections (By ID)

    Order ->
        Status ENUM ->
            Aquired
            Fetching
            Sent
            Arrived
        ID
        Items
        Driver
        Dates [] ->
            Aquired
            Fetching
            Sent
            Arrived

    Item ->
        ID
        Name
        Price
        Weight

    Timestamps ENUM
        January, 
        February, 
        March, 
        April, 
        May, 
        June, 
        July, 
        August, 
        September, 
        October, 
        November, 
        December
        Quarter ->
            1: January, February, March
            2: April, May, June
            3: July, August, September
            4: October, November, December
        Days [] ->
            Monday
            Tuesday
            Wednesday
            Thursday
            Friday
*/
import * as Names from "./Names"

function gen_rand(max: number) {
    return Math.floor(Math.random() * max)
}

const Timestamps = {
    Monts: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    Quarters: {
        1: ["January", "February", "March"],
        2: ["April", "May", "June"],
        3: ["July", "August", "September"],
        4: ["October", "November", "December"]
    },
    Days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
    ]
};

class Worker {
    name: string = "";
    occupation: string = "";
    warehouses: Array<number> = [];
    schedule: Array<Object> = [];
    id: number = 0;
};

class Item {
    name: string = "";
    id: number = 0;
    shelf: string = "";
    weight: number = 0;
    price: number = 0;
};

enum Status {
    Aquired,
    Fetching,
    Sent,
    Arrived,
    None = 10
};

class Timestamp {
    date: Date = new Date();
    status: Status = 10;

    constructor(_date: Date, _status: Status) {
        this.date = _date;
        this.status = _status;
    }
}

class Order {
    warehouseID: Number = 0;
    status: Status = Status.None;
    id: Number = 0;
    driverID: Number = 0;
    fetcherID: Number = 0;
    items: Array<Item> = [];
    timestamps: Array<Timestamp> = [];
};

class ShelfItem {
    amount: Number = 0;
    item: Item = new Item();
};

class Shelf {
    items: Array<ShelfItem> = [];
    id: string = "";
    warehouseLocation: string = "";
    warehouseID: number = 0;
};

class WarehouseOrder {
    aquiredDate: Number = Date.now();
    items: Array<object> = [];
    fetcherID: Number = 0;
}

class Warehouse {
    location: string = "";
    drivers: Array<Worker> = [];
    fetchers: Array<Worker> = [];
    shelves: Array<Shelf> = [];
    id: number = 0;
    allOrders: Array<WarehouseOrder> = [];
};

let warehouses: Array<Warehouse> = [];
{
    let index = 0;
    for (let name in Names.Locations) {
        let currHouse = new Warehouse();

        currHouse.id = index;
        currHouse.location = name;

        warehouses.push(currHouse);
        index++;
    }
}
// To fill; Shelves and workers
// workers fill the warehouses

function generateSchedule() {
    let fullSchedule = [];

    for (let day in Timestamps.Days) {
        let timeWorkedHours = gen_rand(4) + 4; // Work 4 to 8 hours

        let startHour = (5 + gen_rand(4)).toString();
        let startTime = "0" + startHour.toString() + ":00";
        let endHour: Number = Number(startHour) + Number(timeWorkedHours);
        let endTime = endHour.toString() + ":00";

        fullSchedule.push({
            startTime: startTime,
            endTime: endTime,
            day: day,
            workingTime: timeWorkedHours,
        });
    }

    return fullSchedule;
}

let workers: Array<Worker> = [];
warehouses.forEach((warehouse, index) => {
    let driverAmount = gen_rand(4) + 2;
    for (let d = 0; d < driverAmount; d++) {
        let driver = new Worker();

        driver.id = index;
        index++;

        driver.name = Names.Names[gen_rand(Names.Names.length - 1)];

        driver.occupation = "Driver";
        driver.warehouses.push(warehouse.id);

        driver.schedule = generateSchedule();
        workers.push(driver);

        warehouse.drivers.push(driver);
    }

    let fetcherAmount = gen_rand(4) + 1;
    for (let f = 0; f < fetcherAmount; f++) {
        let fetcher = new Worker();

        fetcher.id = index;
        index++;

        fetcher.name = Names.Names[gen_rand(Names.Names.length - 1)];

        fetcher.occupation = "Fetcher";
        fetcher.warehouses.push(warehouse.id);

        fetcher.schedule = generateSchedule();
        workers.push(fetcher);

        warehouse.fetchers.push(fetcher);
    }
});
// Fills drivers and fetchers fully - only one warehouse connection / not good for drivers? 

let items: Array<Item> = [];
Names.Products.forEach((product, index) => {
    let item = new Item();
    item.id = index;
    item.name = product;
    item.price = gen_rand(900) + 10;
    item.weight = gen_rand(20) + 1;

    items.push(item);
});

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

warehouses.forEach((warehouse, index) => {
    let shelfAmount = gen_rand(20) + 10;
    for (let i = 0; i < shelfAmount; i++) {
        let shelf = new Shelf();
        shelf.id = alphabet[gen_rand(alphabet.length)] + gen_rand(9).toString() + alphabet[gen_rand(alphabet.length)] + gen_rand(9).toString();
        shelf.items = [];
        let itemAmount = gen_rand(8) + 2;
        for (let j = 0; j < itemAmount; j++) {
            let shelfItem = new ShelfItem();
            shelfItem.item = structuredClone(items[gen_rand(items.length)]);
            shelfItem.amount = gen_rand(50) + 20;
            shelfItem.item.shelf = shelf.id;
            shelf.items.push(shelfItem);
        }

        shelf.warehouseLocation = warehouse.location;
        shelf.warehouseID = warehouse.id;

        warehouse.shelves.push(shelf);
    }
});
// Gives the warehouses 10-30 shelfs with shelf-items
let warehouseItemsIndexed: Array<Array<Item>> = [];
getItemsPerHouse(); // Fills the above array

// Used later in code to fill array
function getItemsPerHouse() {
    return warehouses.forEach((w, index) => {
        warehouseItemsIndexed[index] = [];
        w.shelves.forEach(s => {
            s.items.forEach(i => {
                warehouseItemsIndexed[index].push(i.item)
            })
        })
    });
}

// for each day of for each month of a year
let finalOrders = [];
const movingDate = new Date("2023-01-01");
const swoopTimes = [43200000, 57600000, 72000000]; // 12:00 - 16:00 - 20:00

let index = 0;
let orderStack: Array<Order> = [];
while (movingDate.getFullYear() != 2024) {

    warehouses.forEach((warehouse, i) => {
        if (Math.random() < 0.05) {
            let order = new Order();

            order.warehouseID = warehouse.id;

            order.id = index++;
            order.driverID = warehouse.drivers[gen_rand(warehouse.drivers.length - 1)].id;
            order.fetcherID = warehouse.fetchers[gen_rand(warehouse.fetchers.length - 1)].id;

            order.items = [];
            for (let itm = 0; itm < gen_rand(3) + 1; itm++) {
                let atI: number = gen_rand(warehouseItemsIndexed[i].length - 1);
                let possibleItems: Array<Item> = warehouseItemsIndexed[i];
                let selectedItem = possibleItems[atI];
                order.items.push(selectedItem)
            }

            order.status = Status.Aquired;
            order.timestamps.push(new Timestamp(new Date(movingDate.getTime() + swoopTimes[gen_rand(swoopTimes.length - 1)]), Status.Aquired))

            orderStack.push(order);
        }
    });

    let toPop: Array<Number> = [];
    orderStack.forEach((order, index) => {
        if (Math.random() < 0.75) {
            if (order.status == Status.Aquired) {
                order.status++;
                order.timestamps.push(new Timestamp(new Date(movingDate.getTime() + gen_rand(300000000) + 72000000), Status.Fetching))
            } else if (order.status == Status.Fetching) {
                order.status++;
                order.timestamps.push(new Timestamp(new Date(movingDate.getTime() + gen_rand(300000000) + 72000000), Status.Sent))
            } else if (order.status == Status.Arrived) {
                order.timestamps.push(new Timestamp(new Date(movingDate.getTime() + gen_rand(300000000) + 72000000), Status.Arrived))
                finalOrders.push(order);
                toPop.push(index);
            }
        }
    });

    for (let rIndex = orderStack.length - 1; rIndex >= 0; rIndex--) {
        if (toPop.includes(rIndex)) {
            orderStack.toSpliced(rIndex, 1);
        }
    }

    movingDate.setDate(movingDate.getDate() + 1);
}

Bun.write(Bun.file("./resources/orders.json"), JSON.stringify(orderStack, null, 2));
Bun.write(Bun.file("./resources/warehouses.json"), JSON.stringify(warehouses, null, 2));
Bun.write(Bun.file("./resources/workers.json"), JSON.stringify(workers, null, 2));
Bun.write(Bun.file("./resources/items.json"), JSON.stringify(items, null, 2));