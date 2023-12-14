import mongoose, { Model, Mongoose } from "mongoose"
import * as schemas from "./schemas.ts"

export const workerModel: mongoose.Model<object> = mongoose.model("Worker", schemas.workerSchema);
export const itemModel: mongoose.Model<object> = mongoose.model("Item", schemas.itemSchema);
export const shelfModel: mongoose.Model<object> = mongoose.model("Shelf", schemas.shelfSchema);
export const warehouseModel: mongoose.Model<object> = mongoose.model("Warehouse", schemas.warehouseSchema);
export const orderModel: mongoose.Model<object> = mongoose.model("Order", schemas.orderSchema);