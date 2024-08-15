import PriorityQueueSJF from "../../helper/ProrityQueueSJF.js";
import { sortBasedOnAt } from "../../helper/Sorting.js";

class SJFNonPreemptive {
    constructor(readyQueue) {
        this.totalTAT = 0; // Total Turnaround Time
        this.totalWT = 0;  // Total Waiting Time
        this.totalRT = 0;  // Total Response Time
        this.currentTime = 0; // Current time in the scheduling process
        this.readyQueue = readyQueue; // The queue of processes to be scheduled

        // Run the scheduling process when the class is instantiated
        this.scheduleProcesses();
    }

    //Schedules the processes based on Shortest Job First (SJF) Non-Preemptive algorithm.
    scheduleProcesses() {
        // Sort the ready queue based on arrival time
        sortBasedOnAt(this.readyQueue);
        
        // Initialize the priority queue (min-heap based on burst time)
        const pq = new PriorityQueueSJF();
        pq.push(this.readyQueue[0]); // Push the first process into the priority queue

        let i = 1; // Index for iterating over the readyQueue

        while (i < this.readyQueue.length || !pq.isEmpty()) {
            // Get the process with the shortest burst time
            let currentJob = pq.pop();

            // Update the current time
            this.currentTime = Math.max(this.currentTime, currentJob.AT);

            // Calculate metrics for the current job
            currentJob.WT = this.currentTime - currentJob.AT; // Waiting Time
            currentJob.TAT = currentJob.WT + currentJob.BT;   // Turnaround Time
            currentJob.RT = currentJob.WT;                    // Response Time

            // Accumulate the total metrics
            this.totalWT += currentJob.WT;
            this.totalTAT += currentJob.TAT;
            this.totalRT += currentJob.RT;

            // Update current time to include the burst time of the current job
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

    //Returns the average turnaround time (TAT) for all processes.
    getAverageTurnaroundTime() {
        return this.totalTAT / this.readyQueue.length;
    }

    //Returns the average waiting time (WT) for all processes.
    getAverageWaitingTime() {
        return this.totalWT / this.readyQueue.length;
    }

    //Returns the average response time (RT) for all processes
    getAverageResponseTime() {
        return this.totalRT / this.readyQueue.length;
    }

    //Returns the Turnaround Time (TAT) for a specific process by its ID.
    getTurnaroundTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.TAT : null;
    }

    //Returns the Waiting Time (WT) for a specific process by its ID.
    getWaitingTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.WT : null;
    }

    //Returns the Response Time (RT) for a specific process by its ID.
    getResponseTimeByProcessId(processID) {
        const process = this.readyQueue.find(p => p.id === processID);
        return process ? process.RT : null;
    }
};

export default SJFNonPreemptive;
