import { Elysia } from "elysia"
import { workerModel } from "../models/models";
import { Html, html } from "@elysiajs/html";
import { ObjectId } from "mongoose";

export const workerRouter = new Elysia();

const ToDays: any = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
};

type Schedule = {
    day: number;
    startTime: string;
    endTime: string;
    workingTime: number;
};

type Worker = {
    id: number;
    name: string;
    occupation: string;
    schedule: Schedule[];
    _id?: ObjectId;
};

type CurrentDay = {
    schedule: Schedule;
    employee?: ObjectId;
};

type TimeObject = {
    hour: string;
    minute: string;
};

type WorkingHours = {
    startTime: TimeObject;
    endTime: TimeObject;
    employee?: ObjectId;
};

type WorkersByDay = {
    Monday: CurrentDay[];
    Tuesday: CurrentDay[];
    Wednesday: CurrentDay[];
    Thursday: CurrentDay[];
    Friday: CurrentDay[];
};

type Quarter = Worker[];

type Quarters = {
    1: Quarter;
    2: Quarter;
    3: Quarter;
    4: Quarter;
}

workerRouter.use(html());

workerRouter.get("/", async () => {
    return { workers: await workerModel.find({}).exec() };
});

workerRouter.get("/all", async () => {
    return { workers: await workerModel.find({}).exec() };
});

workerRouter.get("/:name/", async ({ params: { name: wantedName } }) => {
    return { workers: await workerModel.find({ name: wantedName }).exec() };
});

workerRouter.get("/:name/schedule", async ({ params: { name: wantedName } }) => {
    const result = {
        schedules: (await workerModel.find({ name: wantedName }).exec()).
            map((worker) => {
                let w: Worker = worker as unknown as Worker;
                return { workerID: w.id, schedule: w.schedule }
            })
    };
    return result;
});

type WorkerOneDay = {
    id: number;
    name: string;
    occupation: string;
    schedule: Schedule;
    _id?: ObjectId;
}

workerRouter.get("/occupation/:type", async ({ params: { type } }) => {
    return workerModel.find({ occupation: type }).exec();
})

workerRouter.get("/available/:time", async ({ params: { time: wantedTime }, query: { day: dayOverload }, set }) => {
    const myDate = new Date();
    let dayToday: number;
    if (!dayOverload) {
        dayToday = myDate.getDay()
    } else {
        dayToday = Number(dayOverload) + 1;
    }

    if (!wantedTime || wantedTime.toLowerCase() == "now") {
        wantedTime = myDate.getHours() + ":" + myDate.getMinutes();
    }

    if (dayToday <= 0 || dayToday > 5) {
        return {};
    }

    // Get all workers schedule, so array of schedules for selected day
    const allWorkersSchedule: CurrentDay[] = (await workerModel.find({}).exec()).map(w => {
        let worker: Worker = w as unknown as Worker;
        return { schedule: worker.schedule[dayToday - 1], employee: worker._id };
    });

    // Get array of working hours for that day
    let currentTime: WorkingHours[] = allWorkersSchedule.map(sched => {
        let start: TimeObject = { hour: sched.schedule.startTime.split(":")[0], minute: sched.schedule.startTime.split(":")[1] };
        let end: TimeObject = { hour: sched.schedule.endTime.split(":")[0], minute: sched.schedule.endTime.split(":")[1] };
        return { startTime: start, endTime: end, employee: sched.employee }
    });

    let availableWorkersObjIds: ObjectId[] = [];

    myDate.setHours(Number(wantedTime.split(":")[0]));
    myDate.setMinutes(Number(wantedTime.split(":")[1]));

    let currentMS: number = myDate.getTime();
    console.log(currentMS)
    currentTime.forEach(worker => {
        let startMS: number = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), Number(worker.startTime.hour), Number(worker.startTime.minute)).getTime()
        let endMS: number = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), Number(worker.endTime.hour), Number(worker.endTime.minute)).getTime();

        if (startMS < currentMS && currentMS < endMS) {
            availableWorkersObjIds.push(worker.employee as unknown as ObjectId)
        };
    });

    let workers: WorkerOneDay[] = (await workerModel.find({ _id: [...availableWorkersObjIds] }).exec()).map((w) => {
        let ww: Worker = w as unknown as Worker;
        return { id: ww.id, _id: ww._id, name: ww.name, occupation: ww.occupation, schedule: ww.schedule[dayToday - 1] }
    });

    return workers;
});

workerRouter.get("/available/days/", async () => {
    const allWorkers: Worker[] = (await workerModel.find({}).exec()).map(w => w as unknown as Worker);

    let retObj: WorkersByDay = { Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [] };

    allWorkers.map(worker => worker.schedule.forEach(daySchedule => {
        switch (Number(daySchedule.day)) {
            case 0: retObj.Monday.push({ schedule: daySchedule, employee: worker._id });
                break;
            case 1: retObj.Tuesday.push({ schedule: daySchedule, employee: worker._id });
                break;
            case 2: retObj.Wednesday.push({ schedule: daySchedule, employee: worker._id });
                break;
            case 3: retObj.Thursday.push({ schedule: daySchedule, employee: worker._id });
                break;
            case 4: retObj.Friday.push({ schedule: daySchedule, employee: worker._id });
                break;
        }
    }));

    return retObj;
});

workerRouter.get("/available/day/:day", async ({ params: { day } }) => {
    const allWorkers: Worker[] = (await workerModel.find({}).exec()).map(w => w as unknown as Worker);

    let retObj: CurrentDay[] = [];
    let wantedDay = ToDays[day];

    allWorkers.map(worker => worker.schedule.forEach(daySchedule => {
        if (Number(daySchedule.day) == Number(wantedDay)) {
            retObj.push({ schedule: daySchedule, employee: worker._id });
        }
    }));

    return retObj;
});

workerRouter.get("/available/quarters", async () => {
    const allWorkers: Worker[] = (await workerModel.find({}).exec()).map(w => w as unknown as Worker);

    const quarters = { 1: allWorkers, 2: allWorkers, 3: allWorkers, 4: allWorkers }; // Very cheap and bad :D

    return quarters;
});


workerRouter.get("/available/quarter/:quarter", async ({ params: { quarter: wantedQuarter } }) => {
    const allWorkers: Worker[] = (await workerModel.find({}).exec()).map(w => w as unknown as Worker);

    const quarters: Quarters = { 1: allWorkers, 2: allWorkers, 3: allWorkers, 4: allWorkers }; // Very cheap and bad :D

    const quarter: Quarter = Object.values(quarters)[Number(wantedQuarter) - 1];

    return quarter;
});