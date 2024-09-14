import type BaseModel from "$lib/models/BaseModel";
import type User from "$lib/models/User";

export default interface Logout extends BaseModel {
  user: string;
  expand: {
    user: User;
  };
}
