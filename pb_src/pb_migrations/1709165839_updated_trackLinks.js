/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // remove
    collection.schema.removeField("u703ztul");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "iexifgti",
        name: "url",
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
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "u703ztul",
        name: "url",
        type: "url",
        required: true,
        presentable: false,
        unique: false,
        options: {
          exceptDomains: [],
          onlyDomains: [],
        },
      }),
    );

    // remove
    collection.schema.removeField("iexifgti");

    return dao.saveCollection(collection);
  },
);
