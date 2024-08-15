class PriorityQueue {
    constructor() {
        this.arr = [];
        this.size = 0;
    }

    // Push element into a max priority queue
    push(val) {
        this.arr.push(val);
        this.size++;

        let childInd = this.size - 1;
        let parentInd = Math.floor((childInd - 1) / 2);

        // Bubble up the value to maintain max-heap property
        while (childInd > 0 && this.arr[parentInd].PR < this.arr[childInd].PR) {
            [this.arr[parentInd], this.arr[childInd]] = [this.arr[childInd], this.arr[parentInd]]; // Swap

            childInd = parentInd;
            parentInd = Math.floor((childInd - 1) / 2);
        }
    }

    // Deletion in max priority queue
    pop() {
        if (this.size === 0) return null; // Handle empty queue

        const maxValue = this.arr[0]; // Store the max value to return later

        // Replace the root with the last element
        this.arr[0] = this.arr[this.size - 1];
        this.arr.pop(); // Remove last element
        this.size--;

        let parentInd = 0;
        let childInd1 = 2 * parentInd + 1;
        let childInd2 = 2 * parentInd + 2;

        // Bubble down the root element to maintain max-heap property
        while (childInd1 < this.size) {
            let maxInd = parentInd;

            if (childInd1 < this.size && this.arr[childInd1].PR > this.arr[maxInd].PR) {
                maxInd = childInd1;
            }

            if (childInd2 < this.size && this.arr[childInd2].PR > this.arr[maxInd].PR) {
                maxInd = childInd2;
            }

            if (maxInd === parentInd) break; // No swap needed

            [this.arr[parentInd], this.arr[maxInd]] = [this.arr[maxInd], this.arr[parentInd]]; // Swap

            parentInd = maxInd;
            childInd1 = 2 * parentInd + 1;
            childInd2 = 2 * parentInd + 2;
        }

        return maxValue; // Return the max value
    }

    // Return max from this priority queue
    top() {
        if (this.size === 0) return null; // Handle empty queue
        return this.arr[0]; // Root element is the max in a max-heap
    }

    // Check if the priority queue is empty
    isEmpty() {
        return this.size === 0;
    }

    // Get the size of the priority queue
    getSize() {
        return this.size;
    }
}

export default PriorityQueue;
