export default defineEventHandler(async event => {
  const body = await readBody(event);
  const s0 = getCookie(event,'s0');
  if(s0 != undefined)
  {
    deleteCookie(event, 's0');
    deleteCookie(event, 's1');
    return { code: 200, message: '', result: null };
  }
  return { code: 500, message: 'Service Error.', postdata: { ...body }, result: null };
});

