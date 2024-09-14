import type { BaseModel } from "pocketbase";
import type Course from "$lib/models/Course";
import type Question from "$lib/models/Question";
import type Payment from "./Payment";
import type Step from "$lib/models/Step";

export default interface User extends BaseModel {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
  registeredCourses: string[];
  markedQuestions: string[];
  solvedQuestions: string[];
  completedSteps: string[];
  payments: string[];
  name: string;
  clientAddress: string;
  expand: {
    registeredCourses: Course[];
    markedQuestions: Question[];
    solvedQuestions: Question[];
    completedSteps: Step[];
    payments: Payment[];
  };
}
