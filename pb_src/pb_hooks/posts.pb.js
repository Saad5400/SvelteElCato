/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/posts/views/:id", async (c) => {
    const id = c.pathParam("id");
    const post = $app.dao().findRecordById("posts", id);
    post.set("views", post.get("views") + 1);
    $app.dao().saveRecord(post);
    return c.json(200, null);
});