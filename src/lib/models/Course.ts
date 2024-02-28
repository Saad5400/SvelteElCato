import BaseModel from "$lib/models/BaseModel";
import College from "$lib/models/College";

export default class Course extends BaseModel {
    displayName: string;
    urlName: string;
    order: number;
    description: string;
    college: College;

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.order = data.order;
        this.description = data.description;
        this.college = new College(data.expand.college);
    }
}