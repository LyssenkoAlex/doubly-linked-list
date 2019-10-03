const Node = require('./node');

class LinkedList {
     constructor() {
        this.start_elem = null;
        this.end_elm = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data);
        if (this.start_elem === null) {
            this.start_elem = node;
            this.end_elm = node;
        } else {
            node.prev = this.end_elm;
            this.end_elm.next = node;
            this.end_elm = node;
        }
        this.length++;
        return this;
    }

    head() {
        return this.start_elem === null ? this.start_elem : this.start_elem.data;
    }

    tail() {
        return this.end_elm === null ? this.end_elm : this.end_elm.data;
    }


    at(index) {
        let current = this.start_elem;
        let counter = -1;
        while (current) {
            counter++;
            if (counter === index) return current.data;
            current = current.next;
        }
    }

    insertAt(index, data) {
        const node = new Node(data);
        let counter = -1;
        let current = this.start_elem;
        if (index === 0) {
            node.next = current;
            node.prev = null;
            this.start_elem = node;
            return;
        }
        while (current) {
            counter++;
            if (counter === index) {
                node.prev = current.prev;
                node.next = current;
                current.prev.next = node;
                current.prev = node;
                this.length++;
            }
            current = current.next;
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        while (this.length) {
            this.deleteAt(0)
        }
        return this;
    }

    deleteAt(index) {
        let current = this.start_elem;
        if (this.length === 1) {
            this.start_elem = null;
            this.end_elm = null;
            this.length = 0;
            return this;
        }
        if (index === 0) {
            this.start_elem = this.start_elem.next;
            this.start_elem.prev = null;
            this.length--;
            return this;
        }
        let counter = -1;
        while (current) {
            counter++;
            if (counter === index && current !== this.end_elm) {
                let prevNode = current.prev;
                let nextNode = current.next;
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
            } else if (counter === index && current === this.end_elm) {
                this.end_elm = this.end_elm.prev;
                this.end_elm.next = null;
            }
            current = current.next;
        }
        this.length--;
        return this;
    }

    reverse() {
        let current = this.start_elem;
        let prev = null;
        while (current) {
            let next = current.next;
            current.next = prev;
            current.prev = next;
            prev = current;
            current = next;
        }
        this.end_elm = this.start_elem;
        this.start_elem = prev;
        return this;
    }

    indexOf(data) {
        let curernt = this.start_elem;
        let counter = -1;
        while (curernt) {
            counter++;
            if (curernt.data === data) return counter;
            curernt = curernt.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
