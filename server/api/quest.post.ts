import { findSQL } from '~/curd/findSQL';
import { aggSQL } from '~/curd/aggSQL';
import { insertSQL } from '~/curd/insertSQL';
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
      const resultdata = await findSQL('collquest', { id: { "$in": questdata[0].questids } } ); 
      return { code: 200, message: '', result: { quest: resultdata, answer: questdata[0].answer } };
    }
    
    /*
    const resultdata = await aggSQL('collquest', [
      { $match: { "rank.level": level } },
      {$sample: { size: 20 } }
    ]);
    const questids = resultdata.map(function(item) { return item.id; });
    */
    const questids = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const resultdata = await findSQL('collquest', { id: { "$in": questids } } );
    var answer = [];
    for(var ii = 0; ii < questids.length; ii++)
      answer.push({ idx: questids[ii], status: 0, score: 100 });
      
    await insertSQL('quest', [{ account: account, status: 0, questids: questids, answer: answer }] )
    return { code: 200, message: '', result: { ...resultdata } };
  }
  catch(e)
  {
    console.log(e);
    return { code: 500, message: 'Service Error.', result: null, error: e };
  }
})
