import type BaseModel from "$lib/models/BaseModel";

export default interface Post extends BaseModel {
  content: string;
  displayName: string;
  urlName: string;
  hidden: boolean;
  views: number;
  readTime: number;
}
