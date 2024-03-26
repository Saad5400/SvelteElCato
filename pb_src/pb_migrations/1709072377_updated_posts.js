/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "y43lkr0e",
        name: "tags",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "mlqqgn5h39ebgs7",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    // remove
    collection.schema.removeField("y43lkr0e");

    return dao.saveCollection(collection);
  },
);
