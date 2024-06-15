import PocketBase, {
  type ClientResponseError,
  RecordService,
} from "pocketbase";
import { error } from "@sveltejs/kit";
import type College from "$lib/models/College";
import type Course from "$lib/models/Course";
import type Post from "$lib/models/Post";
import type Step from "$lib/models/Step";
import type Question from "$lib/models/Question";
import type Quiz from "$lib/models/Quiz";
import type User from "$lib/models/User";

class Track {}

export default interface TypedPocketBase extends PocketBase {
  collection(idOrName: "colleges"): RecordService<College>;

  collection(idOrName: "courses"): RecordService<Course>;

  collection(idOrName: "posts"): RecordService<Post>;

  collection(idOrName: "questions"): RecordService<Question>;

  collection(idOrName: "quizzes"): RecordService<Quiz>;

  collection(idOrName: "steps"): RecordService<Step>;

  collection(idOrName: "stepsView"): RecordService<Step>;

  collection(idOrName: "tracks"): RecordService<Track>;

  collection(idOrName: "users"): RecordService<User>;
}

export function handleError(er: ClientResponseError) {
  const status = er.status >= 400 && er.status < 600 ? er.status : 500;
  error(
    status,
    `${JSON.stringify(er.response)}\n${JSON.stringify(er.originalError)}\n${er.originalError}`,
  );
}
