import type BaseModel from "./BaseModel";
import type Course from "./Course";
import type User from "./User";

export default interface Payment extends BaseModel {
    user: string;
    course: string;
    amount: number;
    receipt: string;
    status: "pending" | "accepted" | "rejected";
    expand?: {
        user?: User;
        course?: Course;
    }
}
