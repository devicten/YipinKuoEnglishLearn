import { m as mongo } from '../runtime.mjs';

const findSQL = async (table, obj = {}) => {
  return new Promise(async (resolve, reject) => {
    const db = mongo.db();
    try {
      const response = await db.collection(table).find(obj).toArray();
      resolve(response);
      db.close();
    } catch (error) {
      reject(error);
    }
  });
};

export { findSQL as f };
//# sourceMappingURL=findSQL.mjs.map
