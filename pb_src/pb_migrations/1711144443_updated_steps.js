/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "vf8u8f18",
        name: "description",
        type: "editor",
        required: false,
        presentable: false,
        unique: false,
        options: {
          convertUrls: false,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39");

    // remove
    collection.schema.removeField("vf8u8f18");

    return dao.saveCollection(collection);
  },
);
