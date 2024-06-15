import type BaseModel from "$lib/models/BaseModel";

export default interface College extends BaseModel {
  displayName: string;
  urlName: string;
}
