import { Elysia } from "elysia"
import { workerRouter } from "./routes/workers";
import { connectionRouter } from "./mongoose";
import { aboutRouter } from "./routes/about";

const app = new Elysia();

app.get("/", () => {
    return JSON.stringify({ main_page: true, subpages: [workerRouter.prefix] });
});

app.group("workers", server => server
    .use(workerRouter));

app.group("about", server => server
    .use(aboutRouter));

app.group("atlas", server => server
    .use(connectionRouter));

app.listen(8080);
