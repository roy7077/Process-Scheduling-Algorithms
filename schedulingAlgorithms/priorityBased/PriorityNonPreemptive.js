import PriorityQueue from "../../helper/PriorityQueue.js";
import { sortBasedOnAt } from "../../helper/Sorting.js";

class PriorityNonPreemptive {
    constructor(readyQueue) {
        this.totalTAT = 0; // Total Turnaround Time
        this.totalWT = 0;  // Total Waiting Time
        this.totalRT = 0;  // Total Response Time
        this.currentTime = 0; // Current time in the scheduling process
        this.readyQueue = readyQueue; // The queue of processes to be scheduled

        // Initiate the scheduling process
        this.scheduleProcesses();
    }

    /**
     * Schedules the processes based on a Priority Non-Preemptive algorithm.
     * This method sorts the ready queue based on arrival time and processes
     * each job according to its priority, ensuring the highest priority job
     * is executed first.
     */
    scheduleProcesses() {
        // Sort the ready queue based on arrival time
        sortBasedOnAt(this.readyQueue);
        
        // Initialize the priority queue (min-heap based on priority)
        const pq = new PriorityQueue();
        pq.push(this.readyQueue[0]); // Push the first process into the priority queue

        let i = 1; // Index for iterating over the readyQueue

        while (i < this.readyQueue.length || !pq.isEmpty()) {
            // Get the process with the highest priority (smallest priority value)
            let currentJob = pq.pop();

            // Update the current time to either the current job's arrival time or the existing time
            this.currentTime = Math.max(this.currentTime, currentJob.AT);

            // Calculate the metrics for the current job
            currentJob.WT = this.currentTime - currentJob.AT; // Waiting Time
            currentJob.TAT = currentJob.WT + currentJob.BT;   // Turnaround Time
            currentJob.RT = currentJob.WT;                    // Response Time

            // Accumulate the total metrics
            this.totalWT += currentJob.WT;
            this.totalTAT += currentJob.TAT;
            this.totalRT += currentJob.RT;

            // Update the current time to include the burst time of the current job
            this.currentTime += currentJob.BT;

            // Add processes to the priority queue that have arrived by the current time
            while (i < this.readyQueue.length && this.readyQueue[i].AT <= this.currentTime) {
                pq.push(this.readyQueue[i++]);
            }

            // If the priority queue is empty but there are still processes left, push the next one
            if (pq.isEmpty() && i < this.readyQueue.length) {
                pq.push(this.readyQueue[i++]);
            }
        }
    }

    /**
     * Returns the average turnaround time (TAT) for all processes.
     * @returns {number} Average turnaround time.
     */
    getAverageTurnaroundTime() {
        console.log("tut -> ",this.totalTAT)
        return this.totalTAT / this.readyQueue.length;
    }

    /**
     * Returns the average waiting time (WT) for all processes.
     * @returns {number} Average waiting time.
     */
    getAverageWaitingTime() {
        return this.totalWT / this.readyQueue.length;
    }

    /**
     * Returns the average response time (RT) for all processes.
     * @returns {number} Average response time.
     */
    getAverageResponseTime() {
        return this.totalRT / this.readyQueue.length;
    }

    /**
     * Returns the Turnaround Time (TAT) for a specific process by its ID.
     * @param {number} processID - The ID of the process.
     * @returns {number|null} Turnaround time for the specific process or null if not found.
     */
    getTurnaroundTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.TAT : null;
    }

    /**
     * Returns the Waiting Time (WT) for a specific process by its ID.
     * @param {number} processID - The ID of the process.
     * @returns {number|null} Waiting time for the specific process or null if not found.
     */
    getWaitingTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.WT : null;
    }

    /**
     * Returns the Response Time (RT) for a specific process by its ID.
     * @param {number} processID - The ID of the process.
     * @returns {number|null} Response time for the specific process or null if not found.
     */
    getResponseTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.RT : null;
    }
}

export default PriorityNonPreemptive;
