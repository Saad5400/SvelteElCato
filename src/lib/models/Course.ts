import type BaseModel from "$lib/models/BaseModel";
import type College from "$lib/models/College";
import type Track from "$lib/models/Track";
import type Quiz from "$lib/models/Quiz";

export default interface Course extends BaseModel {
  displayName: string;
  urlName: string;
  order: number;
  description: string;
  hidden: boolean;
  college: string;
  tracks: string[];
  quizzes: string[];
  expand: {
    college: College;
    tracks: Track[];
    quizzes: Quiz[];
  };
}
