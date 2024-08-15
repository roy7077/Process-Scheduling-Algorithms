class Queue {
    constructor() {
        this.arr = [];  // Array to hold queue elements
        this.s = -1;    // Start index (points to the front of the queue)
    }

    /**
     * Adds an element to the end of the queue.
     * @param {any} val - The value to be added to the queue.
     */
    push(val) {
        this.arr.push(val);

        // If this is the first element being added, update the start index
        if (this.s === -1) {
            this.s++;
        }
    }

    /**
     * Returns the front element of the queue without removing it.
     * @returns {any|null} The front element of the queue, or null if the queue is empty.
     */
    front() {
        if (this.isEmpty()) {
            return null;  // If the queue is empty, return null
        }

        return this.arr[this.s];  // Return the element at the front
    }

    /**
     * Removes the front element of the queue.
     */
    pop() {
        if (this.isEmpty()) {
            return;  // If the queue is empty, do nothing
        }

        this.s++;  // Move the start index to the next element
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, false otherwise.
     */
    isEmpty() {
        return this.s === this.arr.length;  // The queue is empty when the start index equals the array length
    }

    /**
     * Returns the size of the queue.
     * @returns {number} The number of elements in the queue.
     */
    size() {
        return this.arr.length - this.s;  // The size is the difference between the array length and the start index
    }
}

export default Queue;
