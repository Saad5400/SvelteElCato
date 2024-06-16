import type { LayoutServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import type Course from "$lib/models/Course";
import type Quiz from "$lib/models/Quiz";

export const load: LayoutServerLoad = async ({ locals, params }) => {
  const course = (await locals.pb
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
        expand: "college,quizzes,tracks,tracks.steps",
        fields: "*,expand.*,expand.tracks.*,expand.tracks.expand.steps.isFree",
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=600",
        },
      },
    )
    .catch(handleError)) as Course;

  const allQuestions = course.expand?.quizzes?.flatMap((q: Quiz) => {
    if (
      q.isFree ||
      (locals.user && locals.user.registeredCourses.includes(course.id))
    )
      return q.questions;
    return [];
  });

  return {
    course,
    allQuestions,
  };
};
