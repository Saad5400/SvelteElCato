import type { BaseModel } from "pocketbase";
import type Course from "$lib/models/Course";
import type Question from "$lib/models/Question";
import type Payment from "./Payment";

export default interface User extends BaseModel {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
  registeredCourses: string[];
  markedQuestions: string[];
  solvedQuestions: string[];
  name: string;
  expand: {
    registeredCourses: Course[];
    markedQuestions: Question[];
    solvedQuestions: Question[];
  };
}
