import BaseModel from "$lib/models/BaseModel";

export interface Option {
  name: string;
  content: string;
}

export default class Question extends BaseModel {
  content: string;
  a: string;
  b: string;
  c: string | null;
  d: string | null;
  e: string | null;
  correct: string;
  explanation: string | null;

  constructor(data: any) {
    super(data);
    this.content = data.content;
    this.a = data.a;
    this.b = data.b;
    this.c = data.c || null;
    this.d = data.d || null;
    this.e = data.e || null;
    this.correct = data.correct;
    this.explanation = data.explanation || null;
  }

  public options(): Option[] {
    let options: Option[] = [
      { name: "a", content: this.a },
      { name: "b", content: this.b },
    ];

    if (this.c) options.push({ name: "c", content: this.c });
    if (this.d) options.push({ name: "d", content: this.d });
    if (this.e) options.push({ name: "e", content: this.e });

    return options;
  }
}
