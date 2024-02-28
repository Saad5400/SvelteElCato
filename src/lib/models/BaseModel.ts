export default class BaseModel {
    collectionId: string;
    collectionName: string;
    id: string;
    created: Date;
    updated: Date;

    constructor(data: any) {
        this.created = new Date(data.created);
        this.updated = new Date(data.updated);
        this.id = data.id;
        this.collectionId = data.collectionId;
        this.collectionName = data.collectionName;
    }
}