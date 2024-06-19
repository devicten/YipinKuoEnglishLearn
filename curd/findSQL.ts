import { mongo } from '#nuxt-mongodb'

/**
 * 数据库查询方法
 * @param table 数据集合
 * @param obj 查询对象
 * @returns 返回查询结果
 * @example 
 * findSQL("myTestCollection",{"age": 21})
 */
export const findSQL = async (table: string, obj: object = {}) => {
    return new Promise(async (resolve, reject) => {
        const db = mongo.db()
        try {
            const response = await db.collection(table).find(obj).toArray()  
            resolve(response)
            db.close();
        } catch (error) {
            reject(error)
        }
    })
}