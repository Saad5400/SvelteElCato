import BaseModel from "$lib/models/BaseModel";

export default class College extends BaseModel {
    displayName: string;
    urlName: string;
    order: number;

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.order = data.order;
    }
}