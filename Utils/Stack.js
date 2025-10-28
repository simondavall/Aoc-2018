class Stack {
  constructor(arr) {
    this.items = arr === undefined ? [] : arr;
  }

  // Push operation
  push(element) {
    this.items.push(element);
  }

  // Pop operation
  pop() {
    return this.isEmpty() ? "Stack is empty" : this.items.pop();
  }

  // Peek operation
  peek() {
    return this.isEmpty() ? "Stack is empty" : this.items[this.items.length - 1];
  }

  // isEmpty operation
  isEmpty() {
    return this.items.length === 0;
  }

  // Size operation
  size() {
    return this.items.length;
  }

  // Print the stack
  print() {
    console.log(this.items);
  }
}

export { Stack };
