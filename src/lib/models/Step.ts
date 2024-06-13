import BaseModel from "$lib/models/BaseModel";
import { pb } from "$lib/pocketbase";
import { handleError } from "$lib/models/TypedPocketBase";

export default class Step extends BaseModel {
  displayName: string;
  linked: string;
  type: "external" | "bunny" | "youtube" | "section";
  description: string;

  constructor(data: any) {
    super(data);
    this.displayName = data.displayName;
    this.linked = data.linked;
    this.type = data.type;
    this.description = data.description;
  }

  public static async fetch(stepId: string, pbInstance = pb) {
    return new Step(
      await pbInstance
        .collection("steps")
        .getOne(stepId, {
          fetch: async (url, config) => fetch(url, config),
        })
        .catch(handleError),
    );
  }
}
