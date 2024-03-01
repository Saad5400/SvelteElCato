import BaseModel from "$lib/models/BaseModel";

export default class Step extends BaseModel {
    displayName: string;
    linked: string;
    order: number;
    type: "external" | "lesson" | "post" | "youtube";

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.linked = data.linked;
        this.order = data.order;
        this.type = data.type;
    }
}