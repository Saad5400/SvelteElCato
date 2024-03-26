/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "cpvfx4p7",
        name: "order",
        type: "number",
        required: false,
        presentable: true,
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
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "cpvfx4p7",
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
);
