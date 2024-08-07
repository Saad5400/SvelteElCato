import type BaseModel from "$lib/models/BaseModel";
import type Step from "$lib/models/Step";

export default interface Track extends BaseModel {
  displayName: string;
  urlName: string;
  description: string;
  steps: string[];
  expand: {
    steps: Step[];
  };
}
