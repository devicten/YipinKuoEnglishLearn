import { findSQL } from '~/curd/findSQL';
import { aggSQL } from '~/curd/aggSQL';
import { updateSQL } from '~/curd/updateSQL';
import { inject } from 'vue';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
  try
  {
    const ip = event.node.req.headers['x-forwarded-for'];
    const s1 = getCookie(event,'s1');
    const level = (s1 != undefined) ? s1.level : 1;
    const account = (s1 != undefined) ? s1.account : 'GUEST::' + ip;
    const body = await readBody(event);
    
    const questdata = await findSQL('quest', { account: account, status: 0  } );  
    if(questdata.length == 1)
    {
      var answer = questdata[0].answer;
      for(var ii = 0; ii < answer.length; ii++)
      {
        if(answer[ii].idx === body.idx)
        {
          answer[ii].idx = body.idx;
          answer[ii].status = 1;
          answer[ii].score = body.score;
          break;
        }
      }
      var status = (answer.filter((obj) => obj.status === 0).length == 0) ? 1 : 0;
      await updateSQL('quest', { _id: questdata[0]._id }, { status: status, answer: answer } );
      return { code: 200, message: '', result: null };
    }
    
    return { code: 500, message: 'Service Error.', result: null};
  }
  catch(e)
  {
    console.log(e);
    return { code: 500, message: 'Service Error.', result: null, error: e };
  }
})
