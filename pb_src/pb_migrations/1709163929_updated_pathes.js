/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr");

    collection.indexes = [];

    // remove
    collection.schema.removeField("qryje8ya");

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr");

    collection.indexes = [
      "CREATE UNIQUE INDEX `idx_YYE2UsS` ON `pathes` (`urlName`)",
    ];

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: "qryje8ya",
        name: "urlName",
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
);
