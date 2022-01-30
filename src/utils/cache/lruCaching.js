const RedisClient = require('../../../config/redis');
const { redis } = require('../../../config/vars');
const limit = redis.cache.limit
class Node {
    constructor(key, value, next = null, prev = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class LRU {
    constructor() {
        this.size = 0;
        this.limit = limit;
        this.head = null;
        this.tail = null;
        this.cacheMap = {};
    }

    write(key, value) {
        const existingNode = this.cacheMap[key];
        if (existingNode) {
        this.detach(existingNode);
        this.size--;
        } else if (this.size === this.limit) {
        delete this.cacheMap[this.tail.key];
        this.detach(this.tail);
        this.size--;
        }

        if (!this.head) {
        this.head = this.tail = new Node(key, value);
        } else {
        const node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
        }

        this.cacheMap[key] = this.head;
        this.size++;
    }

    read(key) {
        const existingNode = this.cacheMap[key];
        if (existingNode) {
        const value = existingNode.value;
        if (this.head !== existingNode) {
            this.write(key, value);
        }
        return value;
        }
        console.log(`Item not available in cache for key ${key}`);
    }

    detach(node) {
        if (node.prev !== null) {
        node.prev.next = node.next;
        } else {
        this.head = node.next;
        }

        if (node.next !== null) {
        node.next.prev = node.prev;
        } else {
        this.tail = node.prev;
        }
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.cacheMap = {};
    }

    forEach(fn) {
        let node = this.head;
        let counter = 0;
        while (node) {
        fn(node, counter);
        node = node.next;
        counter++;
        }
    }

    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
        yield node;
        node = node.next;
        }
    }
}

const updateCache = () => {
    let cacheData = {}
    let currentNode = lruCache.head

    while(currentNode != null) {
        cacheData[currentNode.key] = currentNode.value
        currentNode = currentNode.next
    }
    cacheData = JSON.stringify(cacheData)
    RedisClient.set(redis.cache.LRU, cacheData)
}

const lruCache = new LRU();
updateCache()

exports.fetchLRUCache = async() => {
    let responseObject = await RedisClient.get(redis.cache.LRU);
    console.log(responseObject);
    responseObject = JSON.parse(responseObject);
    return responseObject
}

exports.fetchKey = async (key) => lruCache.read(key)

exports.setKey = async(key, value) => {
    lruCache.write(key, value)
    updateCache()
}
