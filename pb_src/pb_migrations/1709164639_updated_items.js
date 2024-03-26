/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // remove
    collection.schema.removeField("pwy3ng1l");

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "pwy3ng1l",
        name: "path",
        type: "relation",
        required: true,
        presentable: true,
        unique: false,
        options: {
          collectionId: "nznq9mf0vr61khr",
          cascadeDelete: false,
          minSelect: null,
          maxSelect: 1,
          displayFields: null,
        },
      }),
    );

    return dao.saveCollection(collection);
  },
);
