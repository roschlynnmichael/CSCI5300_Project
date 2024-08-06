// LinkedList.js
class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    // Add a node to the end of the list
    add(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }
  
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  
    // Remove a node from the list
    remove(data) {
      if (!this.head) {
        return null;
      }
  
      if (this.head.data === data) {
        this.head = this.head.next;
        return;
      }
  
      let current = this.head;
      while (current.next && current.next.data !== data) {
        current = current.next;
      }
  
      if (current.next) {
        current.next = current.next.next;
      }
    }
  
    // Find a node in the list
    find(data) {
      let current = this.head;
      while (current && current.data !== data) {
        current = current.next;
      }
      return current;
    }
  
    // Convert linked list to array for easy viewing
    toArray() {
      const result = [];
      let current = this.head;
      while (current) {
        result.push(current.data);
        current = current.next;
      }
      return result;
    }
  
    // Convert linked list to JSON for storage
    toJSON() {
      return JSON.stringify(this.toArray());
    }
  
    // Create linked list from JSON
    static fromJSON(json) {
      const array = JSON.parse(json);
      const linkedList = new LinkedList();
      array.forEach(data => linkedList.add(data));
      return linkedList;
    }
  }
  
  module.exports = LinkedList;
  