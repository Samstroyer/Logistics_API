import { Schema, Types } from "mongoose";

export const workerSchema = new Schema({
    name: String,
    occupation: String,
    warehouseConnections: Number,
    warehouses: [Types.ObjectId],
    schedule: [
        {
            type: {
                day: String,
                startTime: Date,
                endTime: Date
            },
            require: false,
        }
    ],
    id: Number,
    isBusy: { type: Boolean, default: false },
});

export const itemSchema = new Schema({
    name: String,
    id: Number,
    parentShelf: { type: Types.ObjectId, require: true },
});

export const shelfSchema = new Schema({
    warehouseLocation: { type: String, require: true },
    id: Number,
    items: [Types.ObjectId],
});

export const warehouseSchema = new Schema({
    location: String,
    id: Number,
    workers: [Types.ObjectId],
    shelves: [Types.ObjectId],
});