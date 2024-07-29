/// <reference path="../pb_data/types.d.ts" />

onModelAfterUpdate((e) => {
    const payment = $app.dao().findRecordById('payments', e.model.getId());
    $app.dao().expandRecord(payment, ["user", "course"], null);
    const user = payment.expandedOne("user");
    const course = payment.expandedOne("course");
    const message = new MailerMessage({
        from: {
            address: $app.settings().meta.senderAddress,
            name: $app.settings().meta.senderName,
        },
        to: [{ address: user.email() }],
        subject: "تفعيل الدورة",
    });

    if (payment.getString('status') == "accepted") {
        user.set('registeredCourses', user.get('registeredCourses').concat([course.getId()]));
        $app.dao().saveRecord(user);
        message.html = `<div style="width:100%; text-align: center;"><h3>تم قبول عملية الدفع وتفعيل الدورة ${course.getString('displayName')}</h3><a href="https://elcato.sb.sa/courses/${course.getString('urlName')}">صفحة الدورة</a><p>${payment.getString('feedback')}</p></div>`;
    } else if (payment.getString('status') == "rejected") {
        message.html = `<div style="width:100%; text-align: center;"><h3>تم رفض عملية الدفع للدورة ${course.getString('displayName')}</h3><p>${payment.getString('feedback')}</p></div>`;
    }

    if (payment.getString('status') == "rejected" || payment.getString('status') == "accepted") {
        $app.newMailClient().send(message);
    }
}, "payments")

onModelAfterCreate((e) => {
    const message = new MailerMessage({
        from: {
            address: $app.settings().meta.senderAddress,
            name: $app.settings().meta.senderName,
        },
        to: [{ address: "sdbtwa@gmail.com" }],
        subject: "طلب اشتراك جديد",
        html: `<div style="width:100%; text-align: center;"><h3>طلب اشتراك جديد</h3><p>الرجاء الدخول <a href="https://pbelcato.sb.sa/_/#/collections?collectionId=skhpj1bql7zd3ge&filter=&sort=-created&recordId=${e.model.getId()}">للوحة التحكم</a> للموافقة على الطلب</p></div>`
    });
    $app.newMailClient().send(message);
}, "payments")
