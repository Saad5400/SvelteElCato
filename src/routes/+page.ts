import type { PageLoad } from "./$types";
import Post from "$lib/models/Post";
import Course from "$lib/models/Course";

export const load: PageLoad = async ({ data }) => {
  return {
    posts: Post.toClassList(data.posts!),
    courses: Course.toClassList(data.courses!),
  };
};
