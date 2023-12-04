import { Elysia } from "elysia"
import { Mongoose } from "mongoose";

const server = new Elysia();
const mongoose = new Mongoose();
mongoose.connect(`mongodb+srv://${Bun.env.MONGOOSE_USERNAME}:${Bun.env.MONGOOSE_PASSWORD}@logistiksystem.lfygxwj.mongodb.net/?retryWrites=true&w=majority`).
    then(() => console.log("connected!"));

server.get("/", () => {
    return "This is the homepage!";
});

server.get("/getAll", () => {
    

});

server.get("/getStatus", () => {
    let status: string;
    switch (mongoose.connection.readyState) {
        case 0:
            status = "disconnected";
            break;
        case 1:
            status = "connected";
            break;
        case 2:
            status = "connecting";
            break;
        case 3:
            status = "disconnecting";
            break;

        case 99:
            status = "uninitialized";
            break;

        default:
            status = "error";
            break;
    }
    return "mongoose is currently: " + status;
});

server.listen(8080);

console.log("Hello via Bun!");

const myScheme = new mongoose.Schema({
    test: String
}, { collection: "tests" });

console.log(myScheme);

const mySchemes = mongoose.model("myScheme", myScheme);

const me = mySchemes.create({
    name: "myName"
}).then(() => console.log("saved"))
    .then(() => {
        console.log(me);
    })
