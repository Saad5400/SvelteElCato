import type { LayoutServerLoad } from "./$types";
import { handleError } from "$lib/models/TypedPocketBase";
import type Course from "$lib/models/Course";
import type Quiz from "$lib/models/Quiz";
import type Track from "$lib/models/Track";
import type Step from "$lib/models/Step";

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
        expand: "college,quizzes,tracks",
        cache: "force-cache",
        headers: {
          "Cache-Control": "max-age=600",
        },
      },
    )
    .catch(handleError)) as Course;

  async function requestSteps(track: Track) {
    return locals.pb.collection("stepsView").getFullList({
      filter: locals.pb.filter("{:id} ~ id", {
        id: track.steps.map((s) => s),
      }),
      cache: "force-cache",
      headers: {
        "Cache-Control": "max-age=3600",
      },
      requestKey: track.id,
    });
  }

  for (let i = 0; i < course.expand?.tracks.length; i += 6) {
    await Promise.all(
      course.expand?.tracks.slice(i, i + 6).map(async (track) => {
        track.expand = {
          ...track.expand,
          steps: await requestSteps(track),
        };
      }),
    );
  }

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
