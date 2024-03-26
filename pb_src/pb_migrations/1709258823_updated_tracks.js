/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "q45yd7pa",
        name: "description",
        type: "text",
        required: false,
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
    collection.schema.removeField("q45yd7pa");

    return dao.saveCollection(collection);
  },
);
