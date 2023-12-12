import Elysia from "elysia";
import { html } from "@elysiajs/html"

export const aboutRouter = new Elysia();

aboutRouter.use(html());

aboutRouter.get("/", () => (
    <html>
        <head>
            <title> About us </title>
        </head>
        <body>
            <h1> We are the {Bun.env.COMPANY_NAME} corporation! </h1>
            <h1> We are happy to query our data with your parameters! </h1>
        </body>
    </html>
));