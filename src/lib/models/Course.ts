import type BaseModel from "$lib/models/BaseModel";
import type Track from "$lib/models/Track";
import type Quiz from "$lib/models/Quiz";

export default interface Course extends BaseModel {
  displayName: string;
  urlName: string;
  order: number;
  description: string;
  hidden: boolean;
  tracks: string[];
  quizzes: string[];
  subtitle: string;
  image: string;
  price: number;
  expand: {
    tracks: Track[];
    quizzes: Quiz[];
  };
}

export function courseUrl(course: Course): string {
  return `/courses/${course.urlName}`;
}
