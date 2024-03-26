/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "tfq8weeo",
        name: "a",
        type: "editor",
        required: true,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "zorvpyok",
        name: "b",
        type: "editor",
        required: true,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "hh8ubugn",
        name: "c",
        type: "editor",
        required: false,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "xlpiikvf",
        name: "d",
        type: "editor",
        required: false,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "7jowtdf4",
        name: "e",
        type: "editor",
        required: false,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "rnn8rjdd",
        name: "correct",
        type: "select",
        required: false,
        presentable: false,
        unique: false,
        options: {
          maxSelect: 1,
          values: ["a", "b", "c", "d", "e"],
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    // remove
    collection.schema.removeField("tfq8weeo");

    // remove
    collection.schema.removeField("zorvpyok");

    // remove
    collection.schema.removeField("hh8ubugn");

    // remove
    collection.schema.removeField("xlpiikvf");

    // remove
    collection.schema.removeField("7jowtdf4");

    // remove
    collection.schema.removeField("rnn8rjdd");

    return dao.saveCollection(collection);
  },
);
