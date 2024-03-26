/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "shawyoyc",
        name: "paths",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "k5fmp0fcqsh9gwf",
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
    const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "shawyoyc",
        name: "paths",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "k5fmp0fcqsh9gwf",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
