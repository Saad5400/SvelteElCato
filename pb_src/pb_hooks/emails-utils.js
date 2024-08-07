/// <reference path="../pb_data/types.d.ts" />

module.exports = {
    addEmailToQueue: (fromAddress, fromName, toAddress, subject, html) => {
        fromAddress = fromAddress ?? $app.settings().meta.senderAddress;
        fromName = fromName ?? $app.settings().meta.senderName;

        const emailsCollection = $app.dao().findCollectionByNameOrId("emails");
        const emailToSend = new Record(emailsCollection, {
            "fromAddress": fromAddress,
            "fromName": fromName,
            "toAddress": toAddress,
            "subject": subject,
            "html": html,
            "status": "pending" // pending, sent, failed
        });
        $app.dao().saveRecord(emailToSend);
    }
};
