const swap = (arr, x, y) => {
  [arr[x], arr[y]] = [arr[y], arr[x]];
}

const partition = (arr, left, right) => {
  const pivot = right--;
  while (left <= right) {
    while (arr[left] < arr[pivot]) {
      left++;
    }
    while (arr[right] > arr[pivot]) {
      right--;
    }
    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }
  swap(arr, left, pivot);
  return left;
}

// In-place method (more traditional quicksort using same memory)
const quickSort1 = (arr, left = 0, right = arr.length - 1) => {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}


// new array method (I assume this uses more memory)
const quickSort2 = (arr) => {
  if (arr.length <= 1) return arr;
  const p = arr.pop();
  const leftArr = [];
  const rightArr = [];
  for (const item of arr) {
    if (item <= p) {
      leftArr.push(item);
    } else {
      rightArr.push(item);
    }
  }
  return [...quickSort(leftArr), p, ...quickSort(rightArr)];
}
