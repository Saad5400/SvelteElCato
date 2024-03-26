/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "9jlljeqi",
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
    const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy");

    // remove
    collection.schema.removeField("9jlljeqi");

    return dao.saveCollection(collection);
  },
);
