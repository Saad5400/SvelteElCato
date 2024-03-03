import BaseModel from "$lib/models/BaseModel";
import Step from "$lib/models/Step";

export default class Track extends BaseModel {
    displayName: string;
    urlName: string;
    description: string;
    order: number;
    steps: Step[];

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.description = data.description;
        this.order = data.order;
        this.steps = data.expand?.steps?.map((step: any) => new Step(step)).sort((a: Step, b: Step) => a.order - b.order) || [];
    }
}