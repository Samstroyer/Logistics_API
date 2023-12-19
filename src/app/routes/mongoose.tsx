import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import mongoose, { Mongoose } from "mongoose";

// Connect to the atlas database
mongoose.connect(`mongodb+srv://${Bun.env.MONGOOSE_USERNAME}:${Bun.env.MONGOOSE_PASSWORD}@logistiksystem.lfygxwj.mongodb.net/My_Company?retryWrites=true&w=majority`).
    then(() => console.log("connected!"));

const state_info = {
    0: ["disconnected", "gray"],
    1: ["connected", "green"],
    2: ["connecting", "yellow"],
    3: ["disconnecting", "red"],
    99: ["something went wrong!", "black"],
};
export const connectionRouter = new Elysia();

connectionRouter.use(html());

connectionRouter.get("/", () => (
    <html>
        <head></head>
        <h2> I use Mongodb Atlas! </h2>
    </html>
));

connectionRouter.get("/status", () => {
    const status = mongoose.connection.readyState;
    return (
        <html>
            <head>
            </head>
            <body>
                <h2>
                    <b>Mongoose connection status:</b>
                </h2>
                <h3 style={{ color: state_info[status][1] }}>
                    <u>{state_info[status][0]}</u>
                </h3>
            </body>
        </html >
    )
});

connectionRouter.get("/push_data", async () => {
    // This should only be done once, but I want access to this endpoint
    return "Data should already be pushed!";

    const data = {
        items: await Bun.file("resources/items.json").json(),
        orders: await Bun.file("resources/orders.json").json(),
        warehouses: await Bun.file("resources/warehouses.json").json(),
        workers: await Bun.file("resources/workers.json").json(),
    }

    // This is commented out becase we do not want to push data all the time :D
    // itemModel.insertMany(data.items);
    // orderModel.insertMany(data.orders);
    // warehouseModel.insertMany(data.warehouses);
    // workerModel.insertMany(data.workers);

    return data;
});