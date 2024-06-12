/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/users/exists", async (c) => {
  const data = $apis.requestInfo(c).data;
  const email = data.email;

  try {
    const user = $app.dao().findAuthRecordByEmail("users", email);
    return c.json(200, true);
  } catch (_) {
    return c.json(200, false);
  }
});
