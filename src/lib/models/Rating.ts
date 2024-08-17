import type BaseModel from "$lib/models/BaseModel";
import type User from "$lib/models/User";

export default interface Rating extends BaseModel {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  user: string;
  expand: {
    user: User;
  };
}