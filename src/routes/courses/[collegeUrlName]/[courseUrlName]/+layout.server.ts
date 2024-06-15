import type { LayoutServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import type Course from "$lib/models/Course";

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const course = await locals.pb
    .collection("courses")
    .getFirstListItem(
      locals.pb.filter(
        "urlName = {:courseUrlName} && college.urlName = {:collegeUrlName}",
        {
          courseUrlName: params.courseUrlName,
          collegeUrlName: params.collegeUrlName,
        },
      ),
      {
        expand: "college,tracks,quizzes",
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=600",
        },
      },
    )
    .catch(handleError);

  return {
    course: course!,
  };
};
