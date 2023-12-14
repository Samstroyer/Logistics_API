
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

export class Worker {
    name: string = "";
    occupation: string = "";
    warehouses: Array<number> = [];
    schedule: Array<Object> = [];
    id: number = 0;
};

export class Item {
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

export class Timestamp {
    date: Date = new Date();
    status: Status = 10;

    constructor(_date: Date, _status: Status) {
        this.date = _date;
        this.status = _status;
    }
}

export class Order {
    warehouseID: Number = 0;
    status: Status = Status.None;
    id: Number = 0;
    driverID: Number = 0;
    fetcherID: Number = 0;
    items: Array<Item> = [];
    timestamps: Array<Timestamp> = [];
};

export class ShelfItem {
    amount: Number = 0;
    item: Item = new Item();
};

export class Shelf {
    items: Array<ShelfItem> = [];
    id: string = "";
    warehouseLocation: string = "";
    warehouseID: number = 0;
};

export class WarehouseOrder {
    aquiredDate: Number = Date.now();
    items: Array<object> = [];
    fetcherID: Number = 0;
}

export class Warehouse {
    location: string = "";
    drivers: Array<Worker> = [];
    fetchers: Array<Worker> = [];
    shelves: Array<Shelf> = [];
    id: number = 0;
    allOrders: Array<WarehouseOrder> = [];
};