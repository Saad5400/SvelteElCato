import type { PageServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import type Post from "$lib/models/Post";
import type Course from "$lib/models/Course";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const coursesRequest = locals.pb
    .collection("courses")
    .getFullList({
      fetch: fetch,
      cache: "force-cache",
      sort: "order",
      headers: {
        "Cache-Control": "max-age=3600",
      },
    })
    .catch(handleError);

  const postsRequest = locals.pb
    .collection("posts")
    .getFullList({
      fetch: fetch,
      fields: "displayName,urlName,views,readTime",
      sort: "-views",
      cache: "force-cache",
      headers: {
        "Cache-Control": "max-age=3600",
      },
    })
    .catch(handleError);

  const [courses, posts] = await Promise.all([coursesRequest, postsRequest]);

  return {
    courses: courses as Course[],
    posts: posts as Post[],
  };
};
