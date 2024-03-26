/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "zrd4l0t0",
        name: "order",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: null,
          max: null,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr");

    // remove
    collection.schema.removeField("zrd4l0t0");

    return dao.saveCollection(collection);
  },
);
