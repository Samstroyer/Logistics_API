import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { ConnectionStates, Mongoose } from "mongoose";
import { itemSchema, shelfSchema, warehouseSchema, workerSchema } from "./models/schemas";

// Create the Mongoose
const mongoose = new Mongoose();

// Connect to the atlas database
mongoose.connect(`mongodb+srv://${Bun.env.MONGOOSE_USERNAME}:${Bun.env.MONGOOSE_PASSWORD}@logistiksystem.lfygxwj.mongodb.net/My_Company?retryWrites=true&w=majority`).
    then(() => console.log("connected!")).
    then(() => {
        mongoose.model("Worker", workerSchema);
        mongoose.model("Item", itemSchema);
        mongoose.model("Shelf", shelfSchema);
        mongoose.model("Warehouse", warehouseSchema);
    }).
    then(() => console.log("Created all schemas to models!"));


const state_info = {
    0: ["disconnected", "gray"],
    1: ["connected", "green"],
    2: ["connecting", "yellow"],
    3: ["disconnecting", "red"],
    99: ["something went wrong!", "black"],
};

function getStyle(state: ConnectionStates) {
    return ``;
}

export const connectionRouter = new Elysia();

connectionRouter.use(html());

connectionRouter.get("/", () => (
    <html>
        <head></head>
        <h2> I use Mongoose! </h2>
        <h3>
            To connect to the database, me: Samuel, uses Mongoose. <br /> <br />...As the rest of the class does.
        </h3>
    </html>
));

connectionRouter.get("/status", () => (
    <html>
        <head>
        </head>
        <body>
            <h2>
                <b>Mongoose connection status:</b>
            </h2>
            <h3 style={{
                color: state_info[mongoose.connection.readyState][1],
            }}>
                <u>{state_info[mongoose.connection.readyState][0]}</u>
            </h3>
        </body>
    </html >
));

connectionRouter.get("/push_data", () => {
    // Push all the data
});