import type { PageLoad } from "./$types";
import Course from "$lib/models/Course";

export const load: PageLoad = async ({ data }) => {
  return {
    courses: Course.toClassList(data.courses!),
  };
};
