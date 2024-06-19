import { mongo } from '#nuxt-mongodb'

export const aggSQL = async (table: string, obj: object = {}) => {
    return new Promise(async (resolve, reject) => {
        const db = mongo.db()
        try {
            const response = await db.collection(table).aggregate(obj).toArray()  
            resolve(response)
            db.close();
        } catch (error) {
            reject(error)
        }
    })
}