# Run the app 
Be in the root folder\
To run this project: 
```bash
bun run ./src/app/index.ts
```
It should say 'connected' if the Atlas connection worked!\
(You can also go to */v1/atlas/status page to see the status).

# About
This is a school project where the assignment wants you to query data from a database.\
I use Bun, Elysia (and Elysia html) and mongoose in this project.\ 

# "Logics"
When creating the data and endpoints I have thought about it in this way:\
All the data is from "year x", (2023 in code), and the year has already finished.\
That means that when you do /now on an endpoint, you get the data as if you were in "year x" and the current date. - If you do this in 2024, you will get set back to 2023 and get the data as if it was 2023 but the same month and day (Can cause bugs and different non-wanted side effects).\
If you do /now on December 29'th, you will be "teleported" to 2023/12/29.\
This makes it so that you can see a "real time" feed of what is happening in the company, at least it is supposed to.\
Some endpoints makes it so that you can specify year, month, day and or time.

# How to use 
This API serves my imaginary workers, warehouses, orders and items.\
Below are all the endpoints:

### Workers:
|Base|Params|Description|
|:---|:-----|:----------|
|*/v1/workers|/|Gives all the workers| 
|*/v1/workers|/all|Gives all the workers| 
|*/v1/workers|/:name|Gives all the workers with that name| 
|*/v1/workers|/:name/schedule|Gives the schedule for all workers with that name| 
|*/v1/workers|/occupation/:type|Gives all the workers with that occupation - Driver or Fetcher| 
|*/v1/workers|/available/now|Shows available workers now| 
|*/v1/workers|/available/days|Gives an object with all days that has a list of workers available that day| 
|*/v1/workers|/available/day/:day|Gives an object with available workers that specified day| 
|*/v1/workers|/available/quarters|Gives the available workers for specified quarter: 1-4| 

### Orders:


### Warehouses:
* To be implemented!

### Items:
To be implemented!

# Credits
Developer: [Samuel Palmer](https://github.com/Samstroyer/)\
This project was created using `bun init` in bun v1.0.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.