
const getWorkersButton = document.querySelector(".get-workers-btn");

getWorkersButton.addEventListener("click", async () => {
    let workers;
    try {
        let response = await fetch("../v1/workers/all");
        workers = await response.json();
    } catch (error) {
        console.log(error.message);
        return;
    }

    workers.workers?.forEach((worker) => {
        let newEl = document.createElement("li");
        newEl.innerHTML = worker.name;
        document.body.prepend(newEl);
    });
});