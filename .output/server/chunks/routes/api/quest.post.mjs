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

const insertSQL = async (table, obj = []) => {
  return new Promise(async (resolve, reject) => {
    const db = mongo.db();
    try {
      const response = await db.collection(table).insertMany(
        obj
      );
      resolve(response);
      db.close();
    } catch (error) {
      reject(error);
    }
  });
};

const quest_post = defineEventHandler(async (event) => {
  try {
    const ip = event.node.req.headers["x-forwarded-for"];
    const s1 = getCookie(event, "s1");
    const level = s1 != void 0 ? JSON.parse(s1).level : 1;
    const account = s1 != void 0 ? JSON.parse(s1).account : "GUEST::" + ip;
    const body = await readBody(event);
    const questdata = await findSQL("quest", {
      account,
      status: 0
    });
    if (questdata.length == 1) {
      const resultdata2 = await findSQL("collquest", {
        id: { $in: questdata[0].questids }
      });
      return {
        code: 200,
        message: "",
        result: { quest: resultdata2, answer: questdata[0].answer }
      };
    }
    const questids = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ];
    const resultdata = await findSQL("collquest", { id: { $in: questids } });
    var answer = [];
    for (var ii = 0; ii < questids.length; ii++)
      answer.push({ idx: questids[ii], status: 0, score: 100 });
    await insertSQL("quest", [
      { account, status: 0, questids, answer }
    ]);
    return { code: 200, message: "", result: resultdata };
  } catch (e) {
    console.log(e);
    return { code: 500, message: "Service Error.", result: null, error: e };
  }
});

export { quest_post as default };
//# sourceMappingURL=quest.post.mjs.map
