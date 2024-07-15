import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY : "",
});

const promptBuidQuests =
  '下列有單字與句子，請把每一列的句子，將每一列指定的單字替換成/-/，完成後請用json array { "word": "", "quest":""} 回應我，一列就是一個array value，單字幫我放到該的array的value中的word屬性內，替換完的字串放到該array value的quest屬性內 \r\n';

export class iBuildQuests {
  public id: number = -1;
  public word: string = "";
  public sentence: string = "";
}

export const buidQuests = async (qs: iBuildQuests[]) => {
  return new Promise(async (resolve, reject) => {
    try {
      var prompt = promptBuidQuests;
      for (var i = 0; i < qs.length; i++) {
        prompt += "單字:" + qs[i].word + ", 句子: " + +"  \r\n";
      }
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "text-davinci-003",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
