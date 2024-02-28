import BaseModel from "$lib/models/BaseModel";

export default class Tag extends BaseModel {
    displayName: string;

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
    }
}