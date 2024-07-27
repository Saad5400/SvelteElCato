/// <reference path="../pb_data/types.d.ts" />

// fires only for "users" and "members"
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
        const total = course.getFloat('price');
        const paid = payment.getFloat('amount');
        const credits = user.getFloat('credits') || 0;
        user.set('credits', (credits + paid) - total);
        user.set('registeredCourses', user.get('registeredCourses').concat([course.getId()]));
        message.html = `<div style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center"><h3>تم تفعيل الدورة ${course.getString('displayName')}</h3><p>${payment.getString('feedback')}</p></div>`;
    } else if (payment.getString('status') == "rejected") {
        message.html = `<div style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center"><h3>تم رفض عملية الدفع للدورة ${course.getString('displayName')}</h3><p>${payment.getString('feedback')}</p></div>`;
    }

    if (payment.getString('status') == "rejected" || payment.getString('status') == "accepted") {
        $app.newMailClient().send(message);
    }
}, "payments")