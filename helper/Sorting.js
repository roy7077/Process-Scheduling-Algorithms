function mergeSort(readyQueue, s, e) {
    let arr = [];
    let mid = Math.floor((s + e) / 2);
    let i = s;
    let j = mid + 1;

    // Merging two sorted arrays
    while (i <= mid && j <= e) {
        if (readyQueue[i].AT <= readyQueue[j].AT) {
            arr.push(readyQueue[i]);
            i++;
        } else {
            arr.push(readyQueue[j]);
            j++;
        }
    }

    // If some jobs remaining in first part
    while (i <= mid) {
        arr.push(readyQueue[i]);
        i++;
    }

    // If some jobs remaining in second part
    while (j <= e) {
        arr.push(readyQueue[j]);
        j++;
    }

    // Push back jobs to main ready queue
    i=s;
    arr.forEach((ele)=>{
        readyQueue[i]=ele;
        i++;
    })
}

function sort(readyQueue, s, e) {
    // Base case
    if (s >= e) return;

    // Recursive calls
    const mid = Math.floor((s + e) / 2);
    sort(readyQueue, s, mid);
    sort(readyQueue, mid + 1, e);
    mergeSort(readyQueue, s, e);
}

export const sortBasedOnAt = (readyQueue) => {
    let s = 0;
    let e = readyQueue.length - 1;  // Corrected end index
    sort(readyQueue, s, e);
}
