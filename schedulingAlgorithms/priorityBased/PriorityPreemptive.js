import PriorityQueue from "../../helper/PriorityQueue.js";
import { sortBasedOnAt } from "../../helper/Sorting.js";

class PriorityPreemptive {
    constructor(readyQueue, TQ) {
        this.totalTAT = 0; // Total Turnaround Time
        this.totalWT = 0;  // Total Waiting Time
        this.totalRT = 0;  // Total Response Time
        this.currentTime = 0; // Current time in the scheduling process
        this.TQ = TQ; // Time Quantum for the scheduler
        this.readyQueue = readyQueue; // The queue of processes to be scheduled

        // Initialize additional properties for each process in the ready queue
        for (let i = 0; i < this.readyQueue.length; i++) {
            this.readyQueue[i].PBT = this.readyQueue[i].BT; // Preserve the original burst time
            this.readyQueue[i].RT = -1; // Initialize response time to -1 (indicating it hasn't started)
        }

        // Initiate the scheduling process
        this.scheduleProcesses();
    }

    /**
     * Schedules the processes based on a Priority Preemptive algorithm.
     * This method sorts the ready queue based on arrival time and processes
     * each job according to its priority, preempting the current job if needed.
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
            let currentJob = pq.top();
            pq.pop();

            // Update the current time to either the current job's arrival time or the existing time
            this.currentTime = Math.max(this.currentTime, currentJob.AT);

            // Check if the time quantum is sufficient to complete the current job
            if (this.TQ >= currentJob.BT) {
                // Calculate turnaround time and waiting time
                currentJob.TAT = (this.currentTime + currentJob.BT) - currentJob.AT;   // Turnaround Time
                currentJob.WT = currentJob.TAT - currentJob.PBT; // Waiting Time

                // If the process hasn't started yet, calculate the response time
                if (currentJob.RT === -1) {
                    currentJob.RT = this.currentTime - currentJob.AT; // Response Time
                    this.totalRT += currentJob.RT;
                }

                // Accumulate the total metrics
                this.totalWT += currentJob.WT;
                this.totalTAT += currentJob.TAT;

                // Update the current time to include the burst time of the current job
                this.currentTime += currentJob.BT;
            } else {
                // If the time quantum isn't sufficient, partially execute the job and push it back
                currentJob.BT -= this.TQ;

                // If the process hasn't started yet, calculate the response time
                if (currentJob.RT === -1) {
                    currentJob.RT = this.currentTime - currentJob.AT; // Response Time
                    this.totalRT += currentJob.RT;
                }

                // Push the partially executed job back into the priority queue
                pq.push(currentJob);

                // Update the current time to include the time quantum
                this.currentTime += this.TQ;
            }

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

export default PriorityPreemptive;
