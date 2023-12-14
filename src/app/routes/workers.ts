import { Elysia } from "elysia"
import { Worker } from "../../generator/classes";

const workerFile = Bun.file("./resources/workers.json");
const workers: Array<Worker> = await workerFile.json();

export const workerRouter = new Elysia();

workerRouter.get("/", () => workers)
workerRouter.get("/all", () => workers);

// To query by params
workerRouter.get("/query", ({ query }) => {
    if (Object.entries(query).length === 0) {
        return "No parameter given!\nGo to /workers/useableParams for info!"
    }

    // Filter by all the queries
    let ret: Array<Worker> = JSON.parse(JSON.stringify(workers));
    for (let q in query) {
        switch (q) {
            case "name":
                ret = ret.filter(worker => worker.name == query[q]);
                break;
            case "occupation":
                ret = ret.filter(worker => worker.occupation == query[q]);
                break;
            case "warehouseConnections":
                ret = ret.filter(worker => worker.warehouseConnections == Number(query[q]));
                break;
            case "id":
                ret = ret.filter(worker => worker.id == Number(query[q]));
                break;
        }
    }

    // Checks if we have invalid queries
    if (Object.keys(query).includes("warehouses")) {
        return "Filtering by warehouse IDs not implemented yet!";
    } else if (Object.keys(query).includes("schedule")) {
        return "Filtering by schedule not implemented yet!";
    } else if (Object.keys(query).includes("isBusy")) {
        return "Filtering by availability not implemented yet!";
    }

    // Passed all checks
    return ret;
});
