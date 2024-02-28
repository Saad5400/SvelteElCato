import BaseModel from "$lib/models/BaseModel";
import {Tag} from "lucide-svelte";

export default class Post extends BaseModel {
    content: string;
    displayName: string;
    urlName: string;
    hidden: boolean;
    views: number;
    readTime: number;
    tags: Tag[] | undefined;

    constructor(data: any) {
        super(data);
        this.content = data.content;
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.hidden = data.hidden;
        this.views = data.views;
        this.readTime = data.readTime;
        this.tags = data.expand?.tags;
    }
}