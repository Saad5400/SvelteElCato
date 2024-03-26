/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("k5fmp0fcqsh9gwf");

    return dao.deleteCollection(collection);
  },
  (db) => {
    const collection = new Collection({
      id: "k5fmp0fcqsh9gwf",
      created: "2024-02-28 23:57:55.797Z",
      updated: "2024-02-28 23:57:55.797Z",
      name: "paths",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "lk6xf0de",
          name: "displayName",
          type: "text",
          required: true,
          presentable: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: "",
          },
        },
        {
          system: false,
          id: "w9qzq4w4",
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
        },
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
);
