import { mongo } from '#nuxt-mongodb'

export const updateSQL = async (table: string, obj1: object = {}, obj2: object = {}) => {
    return new Promise(async (resolve, reject) => {
        const db = mongo.db()
        try {
            const response = await db.collection(table).updateMany(
              obj1,
              { $set: obj2 }
            );  
            resolve(response)
            db.close();
        } catch (error) {
            reject(error)
        }
    })
}