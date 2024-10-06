import type { PageServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import type Post from "$lib/models/Post";
import type Course from "$lib/models/Course";

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const courses = await locals.pb
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

  const posts = await locals.pb
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

  return {
    courses: courses!,
    posts: posts!,
  };
};
