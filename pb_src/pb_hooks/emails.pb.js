/// <reference path="../pb_data/types.d.ts" />

cronAdd("sendEmails", "*/1 * * * *", () => {

    const env = require(`${__hooks}/env.json`);
    if (env.environment === "local") {
        $app.logger().warn("Skipping email sending in local environment");
        return;
    }

    const emailsToSend = $app.dao().findRecordsByFilter(
        "emails",
        "status = 'pending' || status = 'failed'",
        "created",
        10,
        0
    );

    for (const email of emailsToSend) {
        const message = new MailerMessage({
            from: {
                address: email.getString("fromAddress"),
                name: email.getString("fromName")
            },
            to: [{ address: email.getString("toAddress") }],
            subject: email.getString("subject"),
            html: email.getString("html")
        });
        try {
            $app.newMailClient().send(message);
            email.set("status", "sent");
            $app.dao().saveRecord(email);
        } catch (e) {
            email.set("status", "failed");
            email.set("details", e.message);
            $app.dao().saveRecord(email);
        }
    }
});
