import LinkedList from "./linked-list.mjs";
import { Node } from "./linked-list.mjs";

function HashMap() {
    

    const hash = (key) => {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
        }
     
        return hashCode;
      }
    
    const set = (key, value) => {
        let currentHashcode = hash(key);

        if (bucket[currentHashcode] === null) {
            bucket[currentHashcode] = LinkedList(key, value);    
        } else if (bucket[currentHashcode].containsKey(key)) {
            bucket[currentHashcode].updateValue(key, value);
        } else {
            bucket[currentHashcode].append(key, value);
        }
    }

    const get = (key) => {
        let currentHashcode = hash(key);

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
    
    const has = (key) => {
        let currentHashcode = hash(key);

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

    const remove = (key) => {
        let currentHashcode = hash(key);

        if (bucket[currentHashcode] === null) return false;

        if (!bucket[currentHashcode].containsKey(key)) {
            return false;
        } else {
            let currentNode = bucket[currentHashcode].head;

            while (currentNode != null) {
                if (currentNode.key === key) {
                    currentNode = currentNode.nextNode;
                }
            }
        }


    }

    const length = () => {
        let count = 0
        bucket.forEach((element) => {
            if (element != null) {
                count += element.size();
            }
        })
        return count;
    }

    const clear = () => {
        for (let i = 0; i < bucketSize; i++) {
            bucket[i] = null;
        }
    }

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

        return entriesArray;
    }

    let bucket = [];
    let bucketSize = 16;
    for (let i = 0; i < bucketSize; i++) {
        bucket.push(null);
    }
      
    return { 
        hash, bucket, set, get, has, remove, length, clear, keys, values, entries
    }
     
}

let hashmap = HashMap();
hashmap.set('yay', 'BUCKETS');
hashmap.set('yay', 'YAYAYAYYA');
hashmap.set('bam', 'kablooey');
console.log(hashmap.remove('bamf'));
// console.log(hashmap.append('yay', 'BUCKETS'));
// console.log(hashmap.bucket);

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
