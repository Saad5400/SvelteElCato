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
    const senderAddress = email.getString("fromAddress");
    const senderName = email.getString("fromName");

    const message = new MailerMessage({
      from: {
        address: senderAddress ? senderAddress : $app.settings().meta.senderAddress,
        name: senderName ? senderName : $app.settings().meta.senderName
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

routerAdd("GET", "/send-emails-123854624525628543", (e) => {
  const addEmailToQueue = require(`${__hooks}/emails-utils.js`).addEmailToQueue;

  let records = $app.dao().findRecordsByFilter(
    "payments",
    "course = 'putm7m2fwhmkqr4'",
    "-created",
    10000
  );

  // let's get the latest payment for each user
  let lastPaymentByUser = {};
  for (let record of records) {
    let user = record.getString("user");
    if (!lastPaymentByUser[user]) {
      lastPaymentByUser[user] = record;
    }
  }

  // filter out the payments with 0 remaining amount
  let uniqueRecords = [];
  for (let record of Object.values(lastPaymentByUser)) {
    if (record.getInt("remainder") > 0) {
      uniqueRecords.push(record);
    }
  }

  // send an email to each user
  for (let record of uniqueRecords) {
    let user = $app.dao().findRecordById("users", record.getString("user"));

    addEmailToQueue(
      null,
      null,
      user.getString("email"),
      "تذكير بالدفع",
      `السلام عليكم ورحمة الله وبركاته، ${user.getString("name")}،
      <br>
      <br>
      نود تذكيرك بأن لديك دفعة متبقية للدورة التدريبية. يرجى تسديد المبلغ المتبقي في أقرب وقت ممكن.
      <br>
      <a href="https://elcato.sb.sa/courses/cs1211/subscribe">الدفع</a>
      <br>
      <br>
      شكرًا لك،
      <br>
      فريق الكاتو
      `
    );
  }

  return e.json(200, {
    message: "Emails sent successfully to " + uniqueRecords.length + " users"
  });
});
