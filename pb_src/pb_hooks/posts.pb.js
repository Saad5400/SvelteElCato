/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/api/posts/views/:id", async (c) => {
    const id = c.pathParam("id");
    const post = $app.dao().findRecordById("posts", id);
    post.set("views", post.get("views") + 1);
    $app.dao().saveRecord(post);
    return c.json(200, null);
});

onModelBeforeUpdate((e) => {
    const readTime = e.model.get("readTime");
    if (!readTime || readTime == 0) {
        const htmlContent = e.model.get("content");
        const textContent = htmlContent.replace(/<[^>]*>/g, "");
        const wordCount = textContent.trim().split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / 200);
        e.model.set("readTime", readTimeMinutes);
    }
}, "posts");