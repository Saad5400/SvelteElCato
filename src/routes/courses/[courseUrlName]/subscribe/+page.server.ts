import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { getCourseRemainder } from "$lib/models/Payment";
import type Payment from "$lib/models/Payment";
import { courseUrl } from "$lib/models/Course";

export const load: PageServerLoad = async ({ locals, url, parent }) => {
  const { course } = await parent();

  if (!course.isAvailable) {
    redirect(302, courseUrl(course));
  }

  let payments: Payment[] = [];

  if (locals.pb.authStore.isValid && locals.pb.authStore.model) {
    payments = await locals.pb.collection("payments").getFullList({
      filter: locals.pb.filter("user.id = {:userId}", {
        userId: locals.pb.authStore.model.id
      }),
      expand: "course",
      fetch,
      // cache: "no-cache"
    });
  }

  return {
    payments: payments as Payment[]
  };
};

export const actions: Actions = {
  default: async ({ locals, fetch, request }) => {

    if (!locals.pb.authStore.isValid || !locals.pb.authStore.model)
      redirect(302, `/auth/register?redirect=${request.url.toString()}`);

    const data = Object.fromEntries(await request.formData()) as {
      amount: string;
      receipt?: File;
      course: string;
    };

    if (!locals.pb.authStore.isValid || !locals.pb.authStore.model) {
      return fail(401, {
        message: "وصول غير مصرح! تأكد من تسجيل الدخول"
      });
    }

    if (data.receipt && data.receipt.size > 5242880) {
      return fail(400, {
        message: "ملف الايصال كبير جداً! يجب أن يكون أقل من 5 ميجابايت"
      });
    }

    const paymentsRequest = locals.pb.collection("payments").getFullList({
      filter: locals.pb.filter("user.id = {:userId}", {
        userId: locals.pb.authStore.model.id
      }),
      expand: "course",
      fetch,
      // cache: "no-cache"
    });
    const courseRequest = locals.pb.collection("courses").getOne(data.course, { fetch });

    const [payments, course] = await Promise.all([paymentsRequest, courseRequest]);

    const pendingPaymentsCount = payments.filter(payment => payment.status === "pending").length;
    const remainder = getCourseRemainder(payments, course);

    if (pendingPaymentsCount > 0) {
      return fail(400, {
        message: "لديك طلبات اشتراك معلقة! يجب انتظار موافقة الإدارة قبل تقديم طلب جديد"
      });
    }

    console.log(remainder);

    await locals.pb.collection("payments").create({
      ...data,
      course: course.id,
      user: locals.pb.authStore.model.id,
      status: "pending",
      remainder: remainder !== null ? remainder - parseInt(data.amount) : course.price - parseInt(data.amount)
    }, {
      fetch
    });
  }
};
