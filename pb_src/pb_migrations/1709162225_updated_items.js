/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // remove
    collection.schema.removeField("qxgozvyk");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "hwqw3ohe",
        name: "next",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "1pz3be63qralzy2",
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
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "qxgozvyk",
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

    // remove
    collection.schema.removeField("hwqw3ohe");

    return dao.saveCollection(collection);
  },
);
