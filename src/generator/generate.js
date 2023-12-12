import { Types } from "mongoose"
import * as names from "./Names"
import * as classes from "./classes"

const info = {
    drivers: {
        min: 1,
        max: 3,
    },
    fetchers: {
        min: 2,
        max: 5,
    },
    warehouse: {
        amount: 100,
    },
    shelvesPerHouse: {
        min: 10,
        max: 20,
    },
    itemsPerShelf: {
        min: 2,
        max: 8,
    },
    vehicles: {
        min: 2,
        max: 10,
    },
    items: {
        amount: 200,
    }
};

let warehouses = [];
let shelves = [];
let workers = [];

let items = [];
let vehicles = [];

// Generate items
for (let i = 0; i < names.Products.length; i++) {
    const currItem = new classes.Item();

    currItem.name = names.Products[i];

    currItem.id = i;
    currItem.price = Math.round(20 + (Math.random() * 500));
    currItem.weight = Math.round(1 + (Math.random() * 300));

    items.push(currItem);
};

// Generate warehouses
let workerTotal = 0;
for (let i = 0; i < info.warehouse.amount; i++) {
    const currHouse = new classes.Warehouse();

    currHouse.id = i;

    currHouse.location = names.Locations[Math.floor(Math.random() * names.Locations.length)];
    currHouse.shelves = [];
    let shelfesAmount = Math.round(info.shelvesPerHouse.min + (Math.random() * (info.shelvesPerHouse.max - info.shelvesPerHouse.min)));

    for (let sh = 0; sh < shelfesAmount; sh++) {
        const currShelf = new classes.Shelf();

        currShelf.id = sh;
        currShelf.warehouseLocation = currHouse.location;
        currShelf.items = [];

        let itemsAmount = Math.round(info.itemsPerShelf.min + (Math.random() * (info.itemsPerShelf.max - info.itemsPerShelf.min)));

        const itemsCopy = [...items];
        for (let itm = 0; itm < itemsAmount; itm++) {
            let currItem = itemsCopy.splice(Math.random() * (itemsCopy.length - 1), 1);

            currItem.parentShelf = currShelf.id;
            currShelf.items.push(currItem);
        }

        currHouse.shelves.push(currShelf);
        shelves.push(currShelf);
    }

    let driverAmount = info.drivers.min + (Math.random() * (info.drivers.max - info.drivers.min));
    for (let d = 0; d < driverAmount; d++) {
        const currDriver = new classes.Worker();
        currDriver.id = d;
        currDriver.isBusy = false;
        currDriver.name = names.Names[Math.round(Math.random() * (names.Names.length - 1))];
        currDriver.occupation = "driver";

        currDriver.schedule = [];
        currDriver.warehouseConnections = 1;
        currDriver.warehouses = [currHouse.id];

        const daysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        for (let days = 0; days < 5; days++) {
            const Day = { day: daysNames[days], startTime: "08:00", endTime: "16:00" };
            currDriver.schedule.push(Day);
        }

        workers.push(currDriver);
    }

    let fetcherAmount = info.fetchers.min + (Math.random() * (info.fetchers.max - info.fetchers.min));
    for (let f = 0; f < fetcherAmount; f++) {
        const currFetcher = new classes.Worker();
        currFetcher.id = f;
        currFetcher.isBusy = false;
        currFetcher.name = names.Names[Math.round(Math.random() * (names.Names.length - 1))];
        currFetcher.occupation = "fetcher";

        currFetcher.schedule = [];
        currFetcher.warehouseConnections = 1;
        currFetcher.warehouses = [currHouse.id];

        const daysNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        for (let days = 0; days < 5; days++) {
            const Day = { day: daysNames[days], startTime: "08:00", endTime: "16:00" };
            currFetcher.schedule.push(Day);
        }

        workers.push(currFetcher);
    }

    currHouse.workers = workers;
    warehouses.push(currHouse);
}

let uniqueHouses = [];
warehouses.forEach(house => {
    if (!uniqueHouses.includes(house)) {
        uniqueHouses.push(house);
    }
});

let uniqueShelves = [];
uniqueHouses.forEach(u_house => {
    u_house.shelves.forEach(shelf => {
        if (!uniqueShelves.includes(shelf)) {
            uniqueShelves.push(shelf);
        }
    });
});

let uniqueWorkers = [];
uniqueHouses.forEach(u_house => {
    u_house.workers.forEach(worker => {
        if (!uniqueWorkers.includes(worker)) {
            uniqueWorkers.push(worker);
        }
    });
});

Bun.write("./resources/warehouses.json", JSON.stringify(uniqueHouses, null, 1));
Bun.write("./resources/shelves.json", JSON.stringify(uniqueShelves, null, 1));
Bun.write("./resources/workers.json", JSON.stringify(workers, null, 1));
Bun.write("./resources/items.json", JSON.stringify(items, null, 1));