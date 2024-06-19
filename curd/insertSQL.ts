import { mongo } from '#nuxt-mongodb'

export const insertSQL = async (table: string, obj: object = []) => {
    return new Promise(async (resolve, reject) => {
        const db = mongo.db()
        try {
            const response = await db.collection(table).insertMany(
              obj
            );  
            resolve(response)
            db.close();
        } catch (error) {
            reject(error)
        }
    })
}