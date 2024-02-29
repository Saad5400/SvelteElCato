import BaseModel from "$lib/models/BaseModel";

export default class Track extends BaseModel {
    displayName: string;
    order: number;

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.order = data.order;
    }
}