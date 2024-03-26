/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("zcpw1byjrv08n6f");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "9eyk8zj3",
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
    const collection = dao.findCollectionByNameOrId("zcpw1byjrv08n6f");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "9eyk8zj3",
        name: "content",
        type: "editor",
        required: false,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
