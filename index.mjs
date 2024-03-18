import LinkedList from "./linked-list.mjs";
import { Node } from "./linked-list.mjs";

function HashMap() {
    let bucket = [];
    let bucketSize = 16;
    for (let i = 0; i < bucketSize; i++) {
        bucket.push(null);
    }

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
        // console.log(currentHashcode);

        if (bucket[currentHashcode] === null) {
            bucket[currentHashcode] = LinkedList(key, value);    
        } else if (bucket[currentHashcode].containsKey(key)) {
            bucket[currentHashcode].updateValue(key, value);
        } else {
            bucket[currentHashcode].append(key, value);
        }
        // console.log(bucket[currentHashcode].head.key);

    }
      
    return { 
        hash, bucket, set
    }
     
}

let hashmap = HashMap();
hashmap.set('yay', 'BUCKETS');
hashmap.set('yay', 'YAYAYAYYA');
hashmap.set('bam', 'kablooey');
// console.log(hashmap.append('yay', 'BUCKETS'));
console.log(hashmap.bucket);

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
