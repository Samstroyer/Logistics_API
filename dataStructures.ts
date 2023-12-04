import { Mongoose } from "mongoose";

const mongoose = new Mongoose();

enum orderStatusE {
    ACQUIRED,
    FETHING,
    SENT,
    ARRIVED,
};

const orderSchema = new mongoose.Schema({
    status: [{
        stage: orderStatusE,
        date: { type: Date, default: () => Date.now() }
    }],
    driverID: mongoose.Types.ObjectId,
    fetherID: mongoose.Types.ObjectId,
    completed: Boolean,
});

const itemSchema = new mongoose.Schema({
    shelf: Number,
    amount: Number,
    price: Number,
    weight: Number,
    itemID: Number,
});

enum trailerTypesE {
    oneTrailer,
    twoTrailer
}

const vehicleSchema = new mongoose.Schema({
    vehicleID: Number,
    trailerType: trailerTypesE,
    maxWeight: Number,
    orderIDS: [mongoose.Types.ObjectId],
});

enum occupationE {
    fetcher,
    driver,
}

enum daysE {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
}

const workerSchema = new mongoose.Schema({
    occupation: occupationE,
    warehouseConnections: [mongoose.Types.ObjectId],
    schedule: [{
        day: daysE,
        startTime: Date,
        endTime: Date,
        totalHours: Number,
    }],
    workerID: Number,
    isBusy: Boolean,
});

const warehouseSchema = new mongoose.Schema({
    itemIDS: [mongoose.Types.ObjectId],
    workerIDS: [mongoose.Types.ObjectId],
    vehicleIDS: [mongoose.Types.ObjectId],
});