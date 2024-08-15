# Process Scheduling Algorithms

This package provides implementations of various process scheduling algorithms. It includes both preemptive and non-preemptive versions of the following algorithms:

- First Come First Serve (FCFS)
- Priority-Based Scheduling
- Shortest Job First (SJF)

## Installation

You can install this package via npm. Make sure you have Node.js and npm installed on your machine.

```bash
npm install your-package-name

Replace your-package-name with the actual name of your package.

Usage
-----

### Importing the Algorithms

You can import the algorithms into your project using ES module syntax. Here's how you can do it:
import { FCFSPreemptive, FCFSNonPreemptive, PriorityPreemptive, PriorityNonPreemptive, SJFPreemptive, SJFNonPreemptive } from 'your-package-name';
```

### Example Usage

Here's a brief example of how to use each scheduling algorithm.

#### 1\. **First Come First Serve (FCFS)**

**Preemptive Version**
```
import { FCFSPreemptive } from 'your-package-name';

let readyQueue1 = [
    { id: 1, AT: 0, BT: 10 },
    { id: 2, AT: 0, BT: 5 },
    { id: 3, AT: 0, BT: 8 }
];

let fcfsPreemptive = new FCFSPreemptive(readyQueue1);
console.log('Average Turnaround Time:', fcfsPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', fcfsPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', fcfsPreemptive.getAverageResponseTime());
```
**Non-Preemptive Version**

```
import { FCFSNonPreemptive } from 'your-package-name';

let readyQueue2 = [
    { id: 1, AT: 0, BT: 10 },
    { id: 2, AT: 0, BT: 5 },
    { id: 3, AT: 0, BT: 8 }
];

let fcfsNonPreemptive = new FCFSNonPreemptive(readyQueue2);
console.log('Average Turnaround Time:', fcfsNonPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', fcfsNonPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', fcfsNonPreemptive.getAverageResponseTime());
```

#### 2\. **Priority-Based Scheduling**

**Preemptive Version**
```
import { PriorityPreemptive } from 'your-package-name';

let readyQueue3 = [
    { id: 1, AT: 0, BT: 10, priority: 2 },
    { id: 2, AT: 0, BT: 5, priority: 1 },
    { id: 3, AT: 0, BT: 8, priority: 3 }
];

let priorityPreemptive = new PriorityPreemptive(readyQueue3);
console.log('Average Turnaround Time:', priorityPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', priorityPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', priorityPreemptive.getAverageResponseTime());
```
**Non-Preemptive Version**
```
import { PriorityNonPreemptive } from 'your-package-name';

let readyQueue4 = [
    { id: 1, AT: 0, BT: 10, priority: 2 },
    { id: 2, AT: 0, BT: 5, priority: 1 },
    { id: 3, AT: 0, BT: 8, priority: 3 }
];

let priorityNonPreemptive = new PriorityNonPreemptive(readyQueue4);
console.log('Average Turnaround Time:', priorityNonPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', priorityNonPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', priorityNonPreemptive.getAverageResponseTime());
```
#### 3\. **Shortest Job First (SJF)**

**Preemptive Version**

```
import { SJFPreemptive } from 'your-package-name';

let readyQueue5 = [
    { id: 1, AT: 0, BT: 10 },
    { id: 2, AT: 0, BT: 5 },
    { id: 3, AT: 0, BT: 8 }
];

let sjfPreemptive = new SJFPreemptive(readyQueue5, 4); // Time quantum set to 4 for example
console.log('Average Turnaround Time:', sjfPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', sjfPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', sjfPreemptive.getAverageResponseTime());
```
**Non-Preemptive Version**

```
import { SJFNonPreemptive } from 'your-package-name';

let readyQueue6 = [
    { id: 1, AT: 0, BT: 10 },
    { id: 2, AT: 0, BT: 5 },
    { id: 3, AT: 0, BT: 8 }
];

let sjfNonPreemptive = new SJFNonPreemptive(readyQueue6);
console.log('Average Turnaround Time:', sjfNonPreemptive.getAverageTurnaroundTime());
console.log('Average Waiting Time:', sjfNonPreemptive.getAverageWaitingTime());
console.log('Average Response Time:', sjfNonPreemptive.getAverageResponseTime());
```
Contributing
------------

Feel free to contribute to this project by submitting issues or pull requests. Please ensure that your code adheres to the existing style and is well-tested.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
