/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "wm3uotf5",
        name: "urlName",
        type: "text",
        required: true,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: null,
          pattern: "",
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // remove
    collection.schema.removeField("wm3uotf5");

    return dao.saveCollection(collection);
  },
);
