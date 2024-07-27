import type BaseModel from "./BaseModel";
import type Course from "./Course";
import type User from "./User";

export default interface Payment extends BaseModel {
    user: string;
    course: string;
    amount: number;
    receipt: string;
    status: "pending" | "accepted" | "rejected";
    feedback: string;
    remainder: number;
    expand?: {
        user?: User;
        course?: Course;
    }
}

export function getCourseRemainder(payments: Payment[], course: Course): number | null {
    const coursePayments = payments.filter(payment => payment.course === course.id).sort((a, b) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
    return coursePayments.length ? coursePayments[0].remainder : null;
}
