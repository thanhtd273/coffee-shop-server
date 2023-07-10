import mongoose, { Query, Document } from 'mongoose';
import { createClient } from 'redis';

// export interface CacheOption {
//   key?: string;
// }
declare module 'mongoose' {
  interface Query<
    ResultType,
    DocType,
    THelpers = {},
    RawDocType = DocType,
    QueryOp = 'find',
  > {
    cache(): Query<any, any, any, any>;
  }
}

const exec = mongoose.Query.prototype.exec;

const client = createClient({
  url: process.env.CACHE_URL,
});

client.on('error', (err) => {
  throw new Error('Cannot connect to Redis server!');
});
client.connect();

mongoose.Query.prototype.cache = function () {
  this.useCache = true;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) return exec.apply(this, arguments);
  try {
    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      }),
    );

    const cacheValue = await client.get(key);
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);
      return Array.isArray(doc)
        ? doc.map((item: any) => this.model(item))
        : this.model(doc);
    }

    const result = await exec.apply(this, arguments);
    await client.set(key, JSON.stringify(result), { EX: 60 });
    return result;
  } catch (error) {
    console.log(error);
  }
};
// console.log(process.env.DATABASE);
// export const databseUrl = process.env.DATABASE;
