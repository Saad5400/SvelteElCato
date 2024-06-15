import type BaseModel from "$lib/models/BaseModel";
import type Step from "$lib/models/Step";

interface Track extends BaseModel {
  displayName: string;
  urlName: string;
  description: string;
  steps: Step[];
  hasFree: boolean;
  expand: {
    steps: Step[];
  };
}
