import BaseModel from "$lib/models/BaseModel";
import { pb } from "$lib/pocketbase";
import { handleError } from "$lib/models/TypedPocketBase";
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

  public static async fetch(stepId: string, fetch: any, pbInstance = pb) {
    return new Step(
      await pbInstance
        .collection("steps")
        .getOne(stepId, {
          fetch: async (url, config) => fetch(url, config),
        })
        .catch(handleError),
    );
  }

  public url(course: Course, track: Track): string {
    return track.url(course) + `/${this.id}`;
  }
}
