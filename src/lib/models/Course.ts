import type BaseModel from "$lib/models/BaseModel";
import type Track from "$lib/models/Track";
import type Quiz from "$lib/models/Quiz";
import type Rating from "$lib/models/Rating";

export default interface Course extends BaseModel {
  displayName: string;
  urlName: string;
  order: number;
  description: string;
  hidden: boolean;
  isAvailable: boolean;
  tracks: string[];
  quizzes: string[];
  ratings: string[];
  subtitle: string;
  image: string;
  details: string;
  price: number;
  linked: string;
  telegram: string;
  expand: {
    tracks: Track[];
    quizzes: Quiz[];
    ratings: Rating[];
    linked: Course;
  };
}

export function courseUrl(course: Course): string {
  return `/courses/${course.urlName}`;
}
