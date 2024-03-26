/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    collection.name = "questions";

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "fypoqtcz",
        name: "content",
        type: "editor",
        required: true,
        presentable: true,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    collection.name = "quizzes";

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "fypoqtcz",
        name: "question",
        type: "editor",
        required: true,
        presentable: true,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
