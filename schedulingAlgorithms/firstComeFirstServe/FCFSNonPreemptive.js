import { sortBasedOnAt } from "../../helper/Sorting.js";

class FCFSPreemptive {
    constructor(readyQueue) {
        this.totalTAT = 0;
        this.totalWT = 0;
        this.totalRT = 0;
        this.time = 0;
        this.readyQueue = readyQueue;

        this.scheduleProcesses(); // Use the descriptive function name
    }

    // Scheduling of processes
    scheduleProcesses() {
        sortBasedOnAt(this.readyQueue);

        for (let i = 0; i < this.readyQueue.length; i++) {
            const currentProcess = this.readyQueue[i];

            currentProcess.TAT = (this.time + currentProcess.BT) - currentProcess.AT;
            currentProcess.WT = this.time - currentProcess.AT;
            currentProcess.RT = this.time - currentProcess.AT;

            this.totalWT += currentProcess.WT;
            this.totalRT += currentProcess.RT;
            this.totalTAT += currentProcess.TAT;

            this.time += currentProcess.BT;
        }
    }

    // Return average Turnaround Time (TAT)
    getAverageTurnaroundTime() {
        return this.totalTAT / this.readyQueue.length;
    }

    // Return average Waiting Time (WT)
    getAverageWaitingTime() {
        return this.totalWT / this.readyQueue.length;
    }

    // Return average Response Time (RT)
    getAverageResponseTime() {
        return this.totalRT / this.readyQueue.length;
    }

    // Return TAT for a specific process
    getTurnaroundTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.TAT : null;
    }

    // Return WT for a specific process
    getWaitingTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.WT : null;
    }

    // Return RT for a specific process
    getResponseTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.RT : null;
    }
}

export default FCFSPreemptive;
