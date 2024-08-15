class PriorityQueueSJF {
    constructor() {
        this.heap = [];
    }

    // Push an element into the min-priority queue
    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }

    // Remove and return the element with the smallest burst time (BT)
    pop() {
        if (this.isEmpty()) return null;

        const minValue = this.heap[0];
        const lastValue = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = lastValue;
            this._bubbleDown();
        }

        return minValue;
    }

    // Return the element with the smallest burst time without removing it
    top() {
        return this.isEmpty() ? null : this.heap[0];
    }

    // Check if the priority queue is empty
    isEmpty() {
        return this.heap.length === 0;
    }

    // Get the size of the priority queue
    getSize() {
        return this.heap.length;
    }

    // Helper method to maintain heap property when adding an element
    _bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex].BT <= this.heap[index].BT) break;

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    // Helper method to maintain heap property when removing an element
    _bubbleDown() {
        let index = 0;
        const length = this.heap.length;

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (leftChildIndex < length && this.heap[leftChildIndex].BT < this.heap[smallest].BT) {
                smallest = leftChildIndex;
            }

            if (rightChildIndex < length && this.heap[rightChildIndex].BT < this.heap[smallest].BT) {
                smallest = rightChildIndex;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

export default PriorityQueueSJF;
