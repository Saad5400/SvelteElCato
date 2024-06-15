import BaseModel from "$lib/models/BaseModel";
import type Course from "$lib/models/Course";
import type Track from "$lib/models/Track";

export default class Step extends BaseModel {
  displayName: string;
  linked: string;
  type: "external" | "bunny" | "youtube" | "section";
  description: string;
  isFree: boolean;

  constructor(data: any) {
    super(data);
    this.displayName = data.displayName;
    this.linked = data.linked;
    this.type = data.type;
    this.description = data.description;
    this.isFree = data.isFree;
  }

  public url(course: Course, track: Track): string {
    return track.url(course) + `/${this.id}`;
  }
}
