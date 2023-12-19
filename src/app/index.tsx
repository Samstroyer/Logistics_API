import { Elysia } from "elysia"
import { workerRouter } from "./routes/workers";
import { connectionRouter } from "./routes/mongoose";
import { html } from "@elysiajs/html";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia();

app.use(cors());
app.use(staticPlugin());
app.use(html());

app.group("v1", server =>
    server.get("/", () => {
        return (
            <html>
                <head>
                    <title>S.P warehouse-r queror</title>
                </head>
                <body>
                    <h1>Welcome to the landing page of this site!</h1>
                    <p style="font-size:x-large">Read this projects <a href="https://github.com/Samstroyer/Logistics_API/blob/master/README.md">README</a> file on my <a href="https://github.com/Samstroyer/">GitHub</a> to see how to use this site</p>

                    <br /><br />

                    <h2>Creator: Samuel Palmér T4</h2>
                </body>
            </html>
        )

    })
        .group("workers", wRoute => wRoute
            .use(workerRouter))
        .group("atlas", aRoute => aRoute
            .use(connectionRouter))
)

app.listen(8080);
