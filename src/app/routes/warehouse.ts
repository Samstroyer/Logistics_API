import { Elysia } from "elysia";
import { itemModel, warehouseModel } from "../models/models";
import { Shelf, Warehouse } from "../../generator/classes";

export const warehouseRouter = new Elysia();

warehouseRouter.get("/items", async () => {
    const allItems = await itemModel.find().exec();
    return { items: allItems };
});

warehouseRouter.get("/items/:warehouse", async ({ params: { warehouse } }) => {
    let number = Number.isInteger(warehouse);

    // I totally missed that my data generated wrong. The location and ID are the same... just a string and number is the difference.
    // In the future / or that I generate more data / I can easily change it at least having this code.
    if (false) {
        return await warehouseModel.find({ id: warehouse }).exec();
    } else {
        let wantedHouse: Warehouse = (await warehouseModel.find({ location: warehouse }).exec() as unknown as Warehouse[])[0];
        return { shelves: wantedHouse.shelves, warehouse: wantedHouse.id };
    }
});