import BaseModel from "$lib/models/BaseModel";
import Step from "$lib/models/Step";

export default class Track extends BaseModel {
    displayName: string;
    urlName: string;
    description: string;
    steps: Step[];

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.description = data.description;
        this.steps = data.expand?.steps?.map((step: any) => new Step(step)) || [];
    }
}