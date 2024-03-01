import type {ListResult, RecordModel} from "pocketbase";

export default class BaseModel {
    collectionId: string;
    collectionName: string;
    id: string;
    created: Date;
    updated: Date;
    expand: any | null;

    constructor(data: any) {
        this.created = new Date(data.created);
        this.updated = new Date(data.updated);
        this.id = data.id;
        this.collectionId = data.collectionId;
        this.collectionName = data.collectionName;
        this.expand = data.expand || null;
    }

    public static toClass<T extends BaseModel>(this: new (...args: any[]) => T, obj: RecordModel): T {
        return new this(obj);
    }

    public static toClassList<T extends BaseModel>(this: new (...args: any[]) => T, obj: ListResult<any>): T[] {
        return obj.items.map((item: any) => new this(item));
    }
}