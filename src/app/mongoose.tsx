import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { ConnectionStates, Mongoose } from "mongoose";

// Create the Mongoose
const mongoose = new Mongoose();

// Connect to the atlas database
// mongoose.connect(`mongodb+srv://${Bun.env.MONGOOSE_USERNAME}:${Bun.env.MONGOOSE_PASSWORD}@logistiksystem.lfygxwj.mongodb.net/My_Company?retryWrites=true&w=majority`).
//     then(() => console.log("connected!"));

const state_info = {
    0: ["disconnected", "gray"],
    1: ["connected", "green"],
    2: ["connecting", "yellow"],
    3: ["disconnecting", "red"],
    99: ["something went wrong!", "black"],
};

function getStyle(state: ConnectionStates) {
    return `h3 { color: ${state_info[state][1]} }`;
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
            <style>{getStyle(mongoose.connection.readyState)}</style>
        </head>
        <body>
            <h2>
                <b>Mongoose connection status:</b>
            </h2>
            <h3>
                <u>{state_info[mongoose.connection.readyState][0]}</u>
            </h3>
        </body>
    </html>
));
