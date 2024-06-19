import { m as mongo, d as defineEventHandler, g as getCookie, r as readBody } from '../../runtime.mjs';
import { f as findSQL } from '../../_/findSQL.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongodb';
import 'console-log-colors';
import 'node:fs';
import 'node:url';

const updateSQL = async (table, obj1 = {}, obj2 = {}) => {
  return new Promise(async (resolve, reject) => {
    const db = mongo.db();
    try {
      const response = await db.collection(table).updateMany(
        obj1,
        { $set: obj2 }
      );
      resolve(response);
      db.close();
    } catch (error) {
      reject(error);
    }
  });
};

const quest_put = defineEventHandler(async (event) => {
  try {
    const ip = event.node.req.headers["x-forwarded-for"];
    const s1 = getCookie(event, "s1");
    const level = s1 != void 0 ? s1.level : 1;
    const account = s1 != void 0 ? s1.account : "GUEST::" + ip;
    const body = await readBody(event);
    const questdata = await findSQL("quest", { account, status: 0 });
    if (questdata.length == 1) {
      var answer = questdata[0].answer;
      for (var ii = 0; ii < answer.length; ii++) {
        if (answer[ii].idx === body.idx) {
          answer[ii].idx = body.idx;
          answer[ii].status = 1;
          answer[ii].score = body.score;
          break;
        }
      }
      var status = answer.filter((obj) => obj.status === 0).length == 0 ? 1 : 0;
      await updateSQL("quest", { _id: questdata[0]._id }, { status, answer });
      return { code: 200, message: "", result: null };
    }
    return { code: 500, message: "Service Error.", result: null };
  } catch (e) {
    console.log(e);
    return { code: 500, message: "Service Error.", result: null, error: e };
  }
});

export { quest_put as default };
//# sourceMappingURL=quest.put.mjs.map
