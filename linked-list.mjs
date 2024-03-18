// Factory function for a list
export default function LinkedList(head, keyValue, ...moreValues) {

    const append = (key, value) => {
        // Set the head of node to a temp variable
        // Set current node to the next node if it is not null
        // If it is, set that node to the new value
        let currentNode = head;
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = Node(key, value);

    }
    // Set the head to the new value and next node to the head
    const prepend = (value) => {
        head.nextNode = Node(value, nextNode = head.nextNode);
        return head;
    }
    // Create a counter
    // Using temp variable, check if it has a value
    // Add to counter and move to the next node
    const size = () => {
        let count = 0;
        let currentNode = head;
        while (currentNode != null) {
            count++;
            currentNode = currentNode.nextNode;
        }

        return count;
    }
    // Return head node
    const getHead = () => {
        return head;
    }

    // Use same loop from append to go until last node and return
    const tail = () => {
        let currentNode = head;
        while (currentNode.nextNode != null) {
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }
    // Loop through head (temp variable) index amount of times and go to next node until it reaches the index
    const at = (index) => {
        let currentNode = head;
        for (let i = 0; i < index; i++) {
            if (currentNode == null) return null;
            currentNode = currentNode.nextNode;
        }

        return currentNode;
    }
    // Check if the node 2 nodes ahead is null
    // If not, move to the next
    // If it is, make the next node null
    const pop = () => {
        let currentNode = head;
        while (currentNode.nextNode.nextNode != null) {

            currentNode = currentNode.nextNode;
        }

        currentNode.nextNode = null;
    }
    // Use same format from append to iterate over objects
    // Check currentNode for null instead of nextNode to not skip over last object
    const containsValue = (value) => {
        let currentNode = head;
        while (currentNode != null) {

            if (currentNode.value == value) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;

    }

    const containsKey = (key) => {
        let currentNode = head;
        while (currentNode != null) {

            if (currentNode.key == key) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }

        return false;

    }

    const updateValue = (key, value) => {
        let currentNode = head;

        while (currentNode != null) {

            if (currentNode.key == key) {
                currentNode.value = value;
            } 
            currentNode = currentNode.nextNode;
        }
    }

    // Declare index variable
    // Create temp variable for head
    // Create loop that checks the value of currentNode as long as it's not null then move to next node
    const find = (value) => {
        let index = 0;
        let currentNode = head;
        while (currentNode != null) {
            if (currentNode.value == value) {
                return `The index of ${value} is ${index}`;
            }
            index++;
            currentNode = currentNode.nextNode;
        }

        return null;
    }
    // Loop through list and add currentNode value to string as long as currentNode is not null
    const toString = () => {
        let currentNode = head;
        let listString = '';
        while (currentNode != null) {
            listString += `(${currentNode.value}) -> `
            currentNode = currentNode.nextNode;
        }

        return listString + null;
    }

    if (head !== undefined) {
        head = Node(head, keyValue);
    } else {
        head = null;
    }

    // Loop over additional value parameters and call the append method on them
    moreValues.forEach((value) => append(value));


    return { head, keyValue, append, prepend, getHead, tail, size, containsValue, containsKey, updateValue, at, pop, find, toString }
}

// Factory function for a node that returns a value and nextNode which are null by default
export function Node(key = null, value = null, nextNode = null) {
    return { key, value, nextNode }
}

// let myList = LinkedList('something', 'something else');
// myList = null;
// console.log(myList);