import BaseModel from "$lib/models/BaseModel";
import { handleError } from "$lib/models/TypedPocketBase";
import type TypedPocketBase from "$lib/models/TypedPocketBase";
import useHighlight from "$lib/hooks/useHighlight";

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

    return options.sort(() => Math.random() - 0.5);
  }

  public static async fetch(
    id: string,
    pb: TypedPocketBase,
    fetch: typeof window.fetch,
  ): Promise<Question> {
    const question = new Question(
      await pb
        .collection("questions")
        .getOne(id, {
          fetch: async (url, config) => fetch(url, config),
          cache: "force-cache",
          headers: {
            "Cache-Control": "max-age=600",
          },
        })
        .catch(handleError),
    );

    question.content = useHighlight(question.content);
    question.a = useHighlight(question.a);
    question.b = useHighlight(question.b);
    if (question.c) question.c = useHighlight(question.c);
    if (question.d) question.d = useHighlight(question.d);
    if (question.e) question.e = useHighlight(question.e);

    return question;
  }
}
