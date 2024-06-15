import type { PageServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const coursesRequest = locals.pb
    .collection("courses")
    .getList(1, 10, {
      expand: "college",
      fetch: fetch,
      cache: "force-cache",
      headers: {
        "Cache-Control": "max-age=3600",
      },
    })
    .catch(handleError);

  const postsRequest = locals.pb
    .collection("posts")
    .getList(1, 100, {
      expand: "tags",
      fetch: fetch,
      fields: "displayName,urlName,views,readTime",
      cache: "force-cache",
      headers: {
        "Cache-Control": "max-age=3600",
      },
    })
    .catch(handleError);

  const [courses, posts] = await Promise.all([coursesRequest, postsRequest]);

  return {
    posts,
    courses,
  };
};
