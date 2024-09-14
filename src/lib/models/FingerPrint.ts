import type BaseModel from "$lib/models/BaseModel";
import type User from "$lib/models/User";

export default interface FingerPrint extends BaseModel {
  user: string;
  fp: string,
  data: JSON,
  expand: {
    user: User;
  };
}
