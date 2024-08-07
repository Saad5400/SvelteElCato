import type BaseModel from "$lib/models/BaseModel";
import type Track from "$lib/models/Track";
import type Course from "$lib/models/Course";
import { courseUrl } from "$lib/models/Course";

export default interface Step extends BaseModel {
  displayName: string;
  linked: string;
  type: "external" | "bunny" | "youtube" | "section" | "post";
  description: string;
  isFree: boolean;
  length: number;
}

export function stepUrl(step: Step, course: Course, track: Track): string {
  return `${courseUrl(course)}/${track.urlName}/${step.id}`;
}
