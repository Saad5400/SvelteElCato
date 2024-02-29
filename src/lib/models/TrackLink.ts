import BaseModel from "$lib/models/BaseModel";

export default class TrackLink extends BaseModel {
    displayName: string;
    url: string;

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.url = data.url;
    }
}