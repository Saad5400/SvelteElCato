import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
  if (!locals.pb.authStore.isValid || !locals.pb.authStore.model)
    redirect(302, `/auth/register?redirect=${url.toString()}`);
};

export const actions: Actions = {
  default: async ({ locals, fetch, request }) => {

    const data = Object.fromEntries(await request.formData()) as {
      amount: string;
      receipt: File;
    };

    if (!locals.pb.authStore.isValid || !locals.pb.authStore.model) {
      return fail(401, {
        message: 'وصول غير مصرح! تأكد من تسجيل الدخول'
      });
    }

    if (data.receipt.size > 5242880) {
      return fail(400, {
        message: 'ملف الايصال كبير جداً! يجب أن يكون أقل من 5 ميجابايت'
      });
    }

    const pendingPaymentsCount = (await locals.pb.collection('payments').getFullList({
      filter: locals.pb.filter('user.id = {:userId} && status = "pending"', {
        userId: locals.pb.authStore.model.id,
      }),
      fetch
    })).length;

    if (pendingPaymentsCount > 1) {
      return fail(400, {
        message: 'لديك طلبات اشتراك معلقة! يجب انتظار موافقة الإدارة قبل تقديم طلب جديد'
      });
    }

    await locals.pb.collection('payments').create({
      ...data,
      user: locals.pb.authStore.model.id,
      status: 'pending',
    }, {
      fetch,
    })
  },
};
