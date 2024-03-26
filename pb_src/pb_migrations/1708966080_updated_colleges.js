/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("7fevc1hk7he4u9g");

    // remove
    collection.schema.removeField("bypywr1q");

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("7fevc1hk7he4u9g");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "bypywr1q",
        name: "logo",
        type: "file",
        required: false,
        presentable: false,
        unique: false,
        options: {
          mimeTypes: [],
          thumbs: [],
          maxSelect: 1,
          maxSize: 5242880,
          protected: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
