import { Model } from "mongoose"
import * as schemes from "./schemas.ts"

export const workerModel = new Model("worker", schemes.workerSchema);
export const itemModel = new Model("item", schemes.itemScheme);
export const shelfModel = new Model("shelf", schemes.shelfSchema);
export const warehouseModel = new Model("warehouse", schemes.warehouseSchema);