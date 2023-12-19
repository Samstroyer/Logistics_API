# Run the app 
Be in the root folder\
To run this project: 
```bash
bun run ./src/app/index.ts
```
It should say log 'connected' if the Atlas connection worked!\
(You can also go to */atlas/status page to see the status).

# About
This is a school project where the assignment wants you to query data from a database.\
I use Bun, Elysia (and Elysia html) and mongoose in this project.\ 

# How to use 
This API serves my imaginary workers, warehouses, orders and items.\
There are specific endpoints for everything, for example: to see all workers you go to */workers.\
If you then want to query the worker list you can go to /workers/query and enter queries with '?'.\

Here are all possible things you can query:\
#### Workers:
* name - Filters the name. Example ?name=Josie
* occupation - Filters drivers or fetchers. Example ?occupation=Driver
* schedule - To be implemented
* id - Filters unique ID of the worker. Example ?id=5

#### Orders:
* To be implemented!

#### Warehouses:
* To be implemented!

#### Items:
To be implemented!

# Credits
Developer: [Samuel Palmer](https://github.com/Samstroyer/)\
This project was created using `bun init` in bun v1.0.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.