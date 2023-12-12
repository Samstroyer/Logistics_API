export class Worker {
    name: string = "";
    occupation: string = "";
    warehouseConnections: number = 0;
    warehouses: Array<number> = [];
    schedule: Array<Object> = [];
    id: number = 0;
    isBusy: boolean = false;
};

export class Item {
    name: string = "";
    id: number = 0;
    parentShelf: number = 0;
    weight: number = 0;
    price: number = 0;
};

export class Shelf {
    items: Array<object> = [];
    id: number = 0;
    warehouseLocation: string = "";
};

export class Warehouse {
    location: string = "";  //  = String;
    workers: Array<object> = [];  //  = Types.Array;
    shelves: Array<object> = [];  //  = Types.Array;
    id: number = 0;  //  = Number;
};