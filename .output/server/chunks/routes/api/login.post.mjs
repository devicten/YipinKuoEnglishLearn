import { d as defineEventHandler, r as readBody, s as setCookie, u as useRuntimeConfig } from '../../runtime.mjs';
import { f as findSQL } from '../../_/findSQL.mjs';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongodb';
import 'console-log-colors';
import 'node:fs';
import 'node:url';

const rtcfg = useRuntimeConfig();
const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const encryptpassword = CryptoJS.HmacSHA512(
    body.password,
    rtcfg.pwdKey
  ).toString();
  const userdata = await findSQL("user", {
    account: body.account,
    password: encryptpassword
  });
  if (userdata.length == 1) {
    delete userdata[0].password;
    const maxAge = 60 * 60 * 24 * 7;
    const expires = Math.floor(Date.now() / 1e3) + maxAge;
    const s0 = jwt.sign(
      {
        exp: expires,
        data: JSON.stringify(userdata[0])
      },
      rtcfg.jwtSignSecret
    );
    userdata[0].token = s0;
    userdata[0].exp = expires;
    setCookie(event, "s0", s0, {
      maxAge,
      expires: new Date(expires * 1e3),
      secure: true,
      httpOnly: true,
      path: "/"
    });
    setCookie(event, "s1", JSON.stringify(userdata[0]), {
      maxAge,
      expires: new Date(expires * 1e3),
      secure: true,
      httpOnly: true,
      path: "/"
    });
    return { code: 200, message: "", result: { ...userdata[0] } };
  }
  return { code: 500, message: "Service Error.", result: null };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
