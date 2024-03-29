import LinkedList from "./linked-list.mjs";
import { Node } from "./linked-list.mjs";

// Hashmap factory with default bucket size of 16
function HashMap(bucketSize = 16) {
    // Hash function that uses bucket size as modulo to stay within array size
    const hash = (key) => {
        let hashCode = 0;
            
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketSize;
        }
        
        return hashCode;
    }
    
    // Set function takes in key value pair
    // Checks if bucket needs to grow then hashes the key
    // Uses hashcode to add node to array index if empty or collision, updates value if same key
     const set = (key, value) => {
        growBucket();

        let currentHashcode = hash(key);

        checkValidIndex(currentHashcode);

        if (bucket[currentHashcode] === null) {
            bucket[currentHashcode] = LinkedList(key, value);
            capacity++;
        } else if (bucket[currentHashcode].containsKey(key)) {
            bucket[currentHashcode].updateValue(key, value);
        } else {
            bucket[currentHashcode].append(key, value);
            capacity++;
        }
    }

    // Finds the key in the hashmap and returns value
    const get = (key) => {
        let currentHashcode = hash(key);
        checkValidIndex(currentHashcode);

        if (bucket[currentHashcode] === null) return null;

        let currentNode = bucket[currentHashcode].head;

        while (currentNode != null) {
            if (currentNode.key == key) {
                return currentNode.value;
            }
            currentNode = currentNode.nextNode;
        }
        
        return null;
    }
    
    // Returns true/false if key exists in the hashmap
    const has = (key) => {
        let currentHashcode = hash(key);
        checkValidIndex(currentHashcode);

        if (bucket[currentHashcode] === null) return false;

        let currentNode = bucket[currentHashcode].head;

        while (currentNode != null) {
            if (currentNode.key == key) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        
        return false;
    }

    // Removes key by changing previous pointer of target key to the next node of target
    const remove = (key) => {
        let currentHashcode = hash(key);
        checkValidIndex(currentHashcode);

        if (bucket[currentHashcode] === null) return false;

        if (!bucket[currentHashcode].containsKey(key)) {
            return false;
        } else {
            let currentNode = bucket[currentHashcode].head;
            
            if (currentNode.key === key) {
                bucket[currentHashcode].head = currentNode.nextNode;
                return true;
            } else {
                while (currentNode != null) {
                    if (currentNode.nextNode.key === key) {
                        // Uses next node as current node is only a reference
                        currentNode.nextNode = currentNode.nextNode.nextNode;
                        capacity--;
                        return;
                    }
                    currentNode = currentNode.nextNode;
                }
            }
        }
    }

    // Count of all the nodes in hashmap
    const length = () => {
        let count = 0
        bucket.forEach((element) => {
            if (element != null) {
                count += element.size();
            }
        })
        return count;
    }

    // Sets every index to null
    const clear = () => {
        for (let i = 0; i < bucketSize; i++) {
            bucket[i] = null;
        }
        capacity = 0;
    }

    // Returns array of all keys in hashmap
    const keys = () => {
        let keysArray = [];

        bucket.forEach((element) => {
            if (element != null) {
                let currentNode = element.head;
    
                while (currentNode != null) {
                    keysArray.push(currentNode.key);
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return keysArray;
    }

    // Returns array of all values in hashmap
    const values = () => {
        let valuesArray = [];

        bucket.forEach((element) => {
            if (element != null) {
                let currentNode = element.head;
    
                while (currentNode != null) {
                    valuesArray.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            }
        })

        return valuesArray;
    }

    // Returns array of all key value pairs in hashmap
    const entries = () => {
        let entriesArray = [];

        bucket.forEach((element) => {
            if (element != null) {
                let currentNode = element.head;
                
                while (currentNode != null) {
                    let keyValueArray = [];
                    keyValueArray.push(currentNode.key, currentNode.value);
                    entriesArray.push(keyValueArray);
                    currentNode = currentNode.nextNode;
                }
            }
        })
        // console.log(capacity);
        return entriesArray;
    }

    // Checks if capacity is past the load factor
    // Sets capacity to 0 and stores main bucket in a temporary variable
    // Doubles the size of main bucket
    // Loops through the temp bucket as it holds all the data
    // Adds each non empty element to the bigger bucket
    const growBucket = () => {
        if ((capacity / bucketSize) > loadFactor) {
            capacity = 0
            let tempBucket = bucket;
            bucket = [];
    
            bucketSize *= 2;
    
            for (let i = 0; i < bucketSize; i++) {
                bucket.push(null);
            }
    
            tempBucket.forEach((element) => {
                if (element != null) {
                    let currentNode = element.head;
    
                    while (currentNode != null) {
                        set(currentNode.key, currentNode.value);
                        currentNode = currentNode.nextNode;
                    }
                }
            })
        }
    }

    const checkValidIndex = (index) => {
        if (index < 0 || index >= bucket.length) {
            throw new Error("Trying to access index out of bound");
        }
    }

    let bucket = [];
    let capacity = 0;
    let loadFactor = 0.8;
    // Creates initial bucket
    for (let i = 0; i < bucketSize; i++) {
        bucket.push(null);
    }
      
    return { 
        hash, bucket, set, get, has, remove, length, clear, keys, values, entries,
    }
     
}

let hashmap = HashMap();
hashmap.set('yay', 'BUCKETS');
hashmap.set('yay', 'YAYAYAYYA');
hashmap.set('dgsagg', 'SOMETHING ELSE');
hashmap.set('a', 'ANOTHER THING');
hashmap.set('bam', 'kablooey');
hashmap.set('foo', 'bar');
hashmap.set('hello', 'world');
hashmap.set('apple', 'orange');
hashmap.set('cat', 'dog');
hashmap.set('sun', 'moon');
hashmap.set('cookie', 'monster');
hashmap.set('pizza', 'cheese');
hashmap.set('banana', 'split');
hashmap.set('coffee', 'mug');
hashmap.set('rain', 'umbrella');
hashmap.set('book', 'pages');
hashmap.set('tree', 'leaves');
hashmap.set('ocean', 'waves');
// hashmap.set('mountain', 'peak');
// hashmap.set('guitar', 'strings');
// newHashmap.set('asdg', 'agdah');
console.log(hashmap.length());
// console.log(hashmap.clear());
console.log(hashmap.entries());


/*
Hash table
- Create an array
- Take key and use hash function on it
- Insert key at hashed index of array as a node
- If same hash value, check index and add to node

HASH CODE is used to access the bucket not the key
*/

/*
- Hash function
    - takes in a key (string)
    - hashes each character
    - returns hash code

- Set function
    - Take in a key and value
    - Run hash function on key
    - Check array index if it holds the same key
        - If it does, overwrite value to new one
    - If it's a different key on the same index
        - Add as a node to existing key

- Get function
    - Take in a key
    - Run hash function using key
    - Go to hash index of array
    - If empty, return null
    - Else, loop through nodes
    - If found return value, if not return null

*/
