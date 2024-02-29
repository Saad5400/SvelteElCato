import BaseModel from "$lib/models/BaseModel";
import College from "$lib/models/College";
import Track from "$lib/models/Track";

export default class Course extends BaseModel {
    displayName: string;
    urlName: string;
    order: number;
    description: string;
    college: College;
    tracks: Track[];

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.order = data.order;
        this.description = data.description;
        this.college = new College(data.expand.college);
        this.tracks = data.expand.tracks.map((track: any) => new Track(track));
    }
}