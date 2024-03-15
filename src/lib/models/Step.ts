import BaseModel from "$lib/models/BaseModel";

export default class Step extends BaseModel {
    displayName: string;
    linked: string;
    type: "external" | "lesson" | "post" | "youtube";

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.linked = data.linked;
        this.type = data.type;
    }
}