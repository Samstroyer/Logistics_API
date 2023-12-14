import mongoose, { Mixed, Schema, Types } from "mongoose";

export const workerSchema: Schema = new mongoose.Schema({
    name: String,
    occupation: String,
    warehouses: Array<Number>,
    schedule: Array<Mixed>,
    id: Number,
});

export const itemSchema: Schema = new mongoose.Schema({
    name: String,
    id: Number,
    shelf: { type: String, require: true },
    weight: Number,
    Price: Number,
});

export const shelfSchema: Schema = new mongoose.Schema({
    items: Array<Mixed>,
    id: Number,
    warehouseLocation: { type: String, require: true },
    warehouseID: Number,
});

export const warehouseSchema: Schema = new mongoose.Schema({
    location: String,
    drivers: Array<Mixed>,
    fetchers: Array<Mixed>,
    shelves: Array<Mixed>,
    id: Number,
    allOrders: Array<Mixed>,
});

export const orderSchema: Schema = new mongoose.Schema({
    warehouseID: Number,
    status: Number,
    id: Number,
    driverID: Number,
    fetcherID: Number,
    items: Array<Mixed>,
    timestamps: Array<Mixed>,
});