import BaseModel from "$lib/models/BaseModel";
import Question from "$lib/models/Question";

export default class Quiz extends BaseModel {
    displayName: string;
    urlName: string;
    questions: Question[];

    constructor(data: any) {
        super(data);
        this.displayName = data.displayName;
        this.urlName = data.urlName;
        this.questions = data.expand?.questions?.map((question: any) => new Question(question)) || [];
    }
}