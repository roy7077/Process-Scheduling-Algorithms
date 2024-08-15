import Queue from "../../helper/Queue.js";
import { sortBasedOnAt } from "../../helper/Sorting.js";

class FCFSNonPreemptive {
    constructor(readyQueue, TQ) {
        this.totalTAT = 0;  // Total Turnaround Time
        this.totalWT = 0;   // Total Waiting Time
        this.totalRT = 0;   // Total Response Time
        this.currentTime = 0; // Current time in the scheduling process
        this.TQ = TQ;        // Time Quantum (not typically used in FCFS, but kept for consistency)
        this.readyQueue = readyQueue; // Queue of processes to be scheduled

        // Initialize additional properties for each process in the ready queue
        for (let i = 0; i < this.readyQueue.length; i++) {
            this.readyQueue[i].PBT = this.readyQueue[i].BT; // Preserve the original burst time
            this.readyQueue[i].RT = -1; // Initialize response time to -1 (indicating it hasn't started)
        }

        // Run the scheduling process
        this.scheduleProcesses();
    }

    /**
     * Schedules the processes based on FCFS Non-Preemptive algorithm.
     */
    scheduleProcesses() {
        // Sort the ready queue based on arrival time
        sortBasedOnAt(this.readyQueue);

        // Initialize a simple queue to handle processes
        let q = new Queue();

        // Push all processes into the queue
        this.readyQueue.forEach(element => {
            q.push(element);
        });

        // Process each job in the queue
        while (!q.isEmpty()) {
            let currentJob = q.front(); // Get the process at the front of the queue
            q.pop(); // Remove the process from the queue

            // Update the current time to the maximum of current time or the arrival time of the current job
            this.currentTime = Math.max(this.currentTime, currentJob.AT);

            // Execute the job as it is non-preemptive (once it starts, it will finish)
            currentJob.TAT = (this.currentTime + currentJob.BT) - currentJob.AT; // Turnaround Time
            currentJob.WT = currentJob.TAT - currentJob.PBT; // Waiting Time

            // Calculate response time if the job hasn't started before
            if (currentJob.RT === -1) {
                currentJob.RT = this.currentTime - currentJob.AT; // Response Time
                this.totalRT += currentJob.RT;
            }

            // Accumulate total metrics
            this.totalWT += currentJob.WT;
            this.totalTAT += currentJob.TAT;

            // Update the current time to include the burst time of the current job
            this.currentTime += currentJob.BT;
        }
    }

    /**
     * Returns the average Turnaround Time (TAT) for all processes.
     * @returns {number} Average Turnaround Time.
     */
    getAverageTurnaroundTime() {
        return this.totalTAT / this.readyQueue.length;
    }

    /**
     * Returns the average Waiting Time (WT) for all processes.
     * @returns {number} Average Waiting Time.
     */
    getAverageWaitingTime() {
        return this.totalWT / this.readyQueue.length;
    }

    /**
     * Returns the average Response Time (RT) for all processes.
     * @returns {number} Average Response Time.
     */
    getAverageResponseTime() {
        return this.totalRT / this.readyQueue.length;
    }

    /**
     * Returns the Turnaround Time (TAT) for a specific process by its ID.
     * @param {string|number} processID - ID of the process.
     * @returns {number|null} Turnaround Time or null if not found.
     */
    getTurnaroundTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.TAT : null;
    }

    /**
     * Returns the Waiting Time (WT) for a specific process by its ID.
     * @param {string|number} processID - ID of the process.
     * @returns {number|null} Waiting Time or null if not found.
     */
    getWaitingTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.WT : null;
    }

    /**
     * Returns the Response Time (RT) for a specific process by its ID.
     * @param {string|number} processID - ID of the process.
     * @returns {number|null} Response Time or null if not found.
     */
    getResponseTimeByProcessId(processID) {
        const process = this.readyQueue.find(element => element.id === processID);
        return process ? process.RT : null;
    }
}

export default FCFSNonPreemptive;
