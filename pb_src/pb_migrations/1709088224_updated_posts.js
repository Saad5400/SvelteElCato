/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "nrxwbp2c",
        name: "readTime",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 0,
          max: null,
          noDecimal: true,
        },
      }),
    );

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "ysoemrdc",
        name: "views",
        type: "number",
        required: false,
        presentable: false,
        unique: false,
        options: {
          min: 0,
          max: null,
          noDecimal: true,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    // remove
    collection.schema.removeField("nrxwbp2c");

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "ysoemrdc",
        name: "views",
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
