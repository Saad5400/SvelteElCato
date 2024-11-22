/// <reference path="../pb_data/types.d.ts" />

onModelAfterUpdate((e) => {
    const payment = $app.dao().findRecordById("payments", e.model.getId());
    $app.dao().expandRecord(payment, ["user", "course"], null);
    const user = payment.expandedOne("user");
    const course = payment.expandedOne("course");

    let messageHtml = "";

    if (payment.getString("status") === "accepted") {
        user.set("registeredCourses", user.get("registeredCourses").concat([course.getId()]));
        $app.dao().saveRecord(user);
        messageHtml = `<div style="width:100%; text-align: center;"><h3>تم قبول عملية الدفع وتفعيل الدورة ${course.getString("displayName")}</h3><a href="https://elcato.sb.sa/courses/${course.getString("urlName")}">صفحة الدورة</a><p>${payment.getString("feedback")}</p></div>`;
    } else if (payment.getString("status") === "rejected") {
        messageHtml = `<div style="width:100%; text-align: center;"><h3>تم رفض عملية الدفع للدورة ${course.getString("displayName")}</h3><p>${payment.getString("feedback")}</p></div>`;
    }

    if (payment.getString("status") === "rejected" || payment.getString("status") === "accepted") {
        const addEmailToQueue = require(`${__hooks}/emails-utils.js`).addEmailToQueue;
        addEmailToQueue(null, null, user.email(), "تفعيل الدورة", messageHtml);
    }
}, "payments");

onModelAfterCreate((e) => {
    const addEmailToQueue = require(`${__hooks}/emails-utils.js`).addEmailToQueue;

    const payment = $app.dao().findRecordById("payments", e.model.getId());

    // In case the user did not upload the receipt
    if (!payment.get("receipt"))
        addEmailToQueue(null, null, "sdbtwa@gmail.com", "طلب اشتراك جديد", `<div style="width:100%; text-align: center;"><h3>طلب اشتراك جديد</h3><p>الرجاء الدخول <a href="https://pbelcato.sb.sa/_/#/collections?collectionId=skhpj1bql7zd3ge&filter=&sort=-created&recordId=${e.model.getId()}">للوحة التحكم</a> للموافقة على الطلب</p></div>`);
    // In case the user uploaded the receipt, we will send an email to the admin, and immediately approve the payment
    else {
        addEmailToQueue(null, null, "sdbtwa@gmail.com", "تم تفعيل اشتراك جديد", `<div style="width:100%; text-align: center;"><h3>تم تفعيل اشتراك جديد</h3><p>الرجاء الدخول <a href="https://pbelcato.sb.sa/_/#/collections?collectionId=skhpj1bql7zd3ge&filter=&sort=-created&recordId=${e.model.getId()}">للوحة التحكم</a> للمتابعة</p></div>`);

        const form = new RecordUpsertForm($app, payment);
        form.loadData({
            "status": "accepted",
            "feedback": "قروب التيليجرام https://t.me/+2UquWfE4Bz85MGM0"
        });
        form.submit();
    }
}, "payments");
