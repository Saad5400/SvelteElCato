import type { LayoutLoad } from "./$types";
import Course from "$lib/models/Course";

export const load: LayoutLoad = async ({ data }) => {
  return {
    course: new Course(data.course!),
  };
};
