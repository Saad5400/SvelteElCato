import BaseModel from "$lib/models/BaseModel";
import College from "$lib/models/College";
import Track from "$lib/models/Track";
import Quiz from "$lib/models/Quiz";
import { handleError } from "$lib/models/TypedPocketBase";
import { pb } from "$lib/pocketbase";

export default class Course extends BaseModel {
  displayName: string;
  urlName: string;
  order: number;
  description: string;
  hidden: boolean;
  college: College;
  tracks: Track[];
  quizzes: Quiz[];

  constructor(data: any) {
    super(data);
    this.displayName = data.displayName;
    this.urlName = data.urlName;
    this.order = data.order;
    this.description = data.description;
    this.hidden = data.hidden;
    this.college = data.expand?.college
      ? new College(data.expand.college)
      : null!;
    this.tracks =
      data.expand?.tracks?.map((track: any) => new Track(track)) || [];
    this.quizzes =
      data.expand?.quizzes?.map((quiz: any) => new Quiz(quiz)) || [];
  }

  public url(): string {
    return `/courses/${this.college.urlName}/${this.urlName}`;
  }

  public static async fetch(
    collegeUrlName: string,
    courseUrlName: string,
    fetch: any,
    pbInstance = pb,
  ) {
    return new Course(
      await pbInstance
        .collection("courses")
        .getFirstListItem(
          pbInstance.filter(
            "urlName = {:courseUrlName} && college.urlName = {:collegeUrlName}",
            {
              courseUrlName: courseUrlName,
              collegeUrlName: collegeUrlName,
            },
          ),
          {
            expand: "college,tracks,quizzes",
            fetch: async (url, config) => fetch(url, config),
          },
        )
        .catch(handleError),
    );
  }
}
