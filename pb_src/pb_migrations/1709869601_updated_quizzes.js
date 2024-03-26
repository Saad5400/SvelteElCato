/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // remove
    collection.schema.removeField("nevemyny");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "eks5wpbv",
        name: "correct",
        type: "relation",
        required: true,
        presentable: true,
        unique: false,
        options: {
          collectionId: "zcpw1byjrv08n6f",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "nevemyny",
        name: "tag",
        type: "relation",
        required: true,
        presentable: true,
        unique: false,
        options: {
          collectionId: "mlqqgn5h39ebgs7",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: null,
        },
      }),
    );

    // remove
    collection.schema.removeField("eks5wpbv");

    return dao.saveCollection(collection);
  },
);
