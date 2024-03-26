/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "m3waopmi",
        name: "steps",
        type: "relation",
        required: false,
        presentable: false,
        unique: false,
        options: {
          collectionId: "y8zr52i3l6cgg39",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: null,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8");

    // remove
    collection.schema.removeField("m3waopmi");

    return dao.saveCollection(collection);
  },
);
