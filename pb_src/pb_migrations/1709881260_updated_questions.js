/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // remove
    collection.schema.removeField("vglslesl");

    // remove
    collection.schema.removeField("eks5wpbv");

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "vglslesl",
        name: "choices",
        type: "relation",
        required: true,
        presentable: false,
        unique: false,
        options: {
          collectionId: "zcpw1byjrv08n6f",
          cascadeDelete: true,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

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
);
