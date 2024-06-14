import type { PageLoad } from "./$types";
import { pb } from "$lib/pocketbase";
import Course from "$lib/models/Course";
import { handleError } from "$lib/models/TypedPocketBase";

export const load: PageLoad = async ({ fetch, data }) => {
  const courses = Course.toClassList(
    await pb
      .collection("courses")
      .getList(1, 100, {
        filter: pb.filter("{:registeredCourses} ~ id", {
          registeredCourses: data.user?.registeredCourses,
        }),
        expand: 'college',
      })
      .catch(handleError),
  );

  return {
    courses,
  };
};
