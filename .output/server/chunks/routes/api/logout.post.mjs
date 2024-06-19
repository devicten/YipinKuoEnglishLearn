import { d as defineEventHandler, r as readBody, g as getCookie, a as deleteCookie } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'mongodb';
import 'console-log-colors';
import 'node:fs';
import 'node:url';

const logout_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const s0 = getCookie(event, "s0");
  if (s0 != void 0) {
    deleteCookie(event, "s0");
    deleteCookie(event, "s1");
    return { code: 200, message: "", result: null };
  }
  return { code: 500, message: "Service Error.", postdata: { ...body }, result: null };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
