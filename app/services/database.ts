import NodeCache from 'node-cache';

class Database {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({ stdTTL: 3600 }); // Set TTL to 1 hour
  }

  set(key: string, value: any): boolean {
    return this.cache.set(key, value);
  }

  get(key: string): any {
    return this.cache.get(key);
  }

  delete(key: string): number {
    return this.cache.del(key);
  }
}

const db = new Database();
export default db;