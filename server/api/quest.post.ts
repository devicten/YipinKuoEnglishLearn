import { findSQL } from "~/curd/findSQL";
import { insertSQL } from "~/curd/insertSQL";

export default defineEventHandler(async (event) => {
  try {
    const ip = event.node.req.headers["x-forwarded-for"];
    const s1 = getCookie(event, "s1");
    const level = s1 != undefined ? JSON.parse(s1).level : 1;
    const account = s1 != undefined ? JSON.parse(s1).account : "GUEST::" + ip;
    const body = await readBody(event);

    const questdata = (await findSQL("quest", {
      account: account,
      status: 0,
    })) as {
      id: number;
      account: string;
      status: number;
      questids: number[];
      answer: any;
    }[];
    if (questdata.length == 1) {
      const resultdata = await findSQL("collquest", {
        id: { $in: questdata[0].questids },
      });
      return {
        code: 200,
        message: "",
        result: { quest: resultdata, answer: questdata[0].answer },
      };
    }

    const questids = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const resultdata = await findSQL("collquest", { id: { $in: questids } });
    var answer = [];
    for (var ii = 0; ii < questids.length; ii++) {
      answer.push({ idx: questids[ii], status: 0, score: 100 });
    }

    await insertSQL("quest", [
      { account: account, status: 0, questids: questids, answer: answer },
    ]);
    return { code: 200, message: "", result: resultdata };
  } catch (e) {
    console.log(e);
    return { code: 500, message: "Service Error.", result: null, error: e };
  }
});
