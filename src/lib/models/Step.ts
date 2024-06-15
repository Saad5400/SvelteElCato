import type BaseModel from "$lib/models/BaseModel";
import type Track from "$lib/models/Track";

export default interface Step extends BaseModel {
  displayName: string;
  linked: string;
  type: "external" | "bunny" | "youtube" | "section";
  description: string;
  isFree: boolean;
}
