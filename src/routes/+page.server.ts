import type { PageServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageServerLoad = async ({ locals }) => {

  const [courses, posts] = await Promise.all([
    locals.pb
      .collection("courses")
      .getFullList({
        // cache: "force-cache",
        // headers: {
        //   "Cache-Control": "max-age=3600"
        // },
        sort: "order",
      })
      .catch(handleError),
    locals.pb
      .collection("posts")
      .getFullList({
        fields: "displayName,urlName,views,readTime",
        sort: "-views",
        // cache: "force-cache",
        // headers: {
        //   "Cache-Control": "max-age=3600"
        // }
      })
      .catch(handleError)
  ]);

  return {
    courses: courses!,
    posts: posts!
  };
};
