import BaseModel from "$lib/models/BaseModel";
import TrackLink from "$lib/models/TrackLink";

export default class Track extends BaseModel {
    displayName: string;
    order: number;
    links: TrackLink[];

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.order = data.order;
        this.links = data.expand.links.map((link: any) => new TrackLink(link));
    }
}