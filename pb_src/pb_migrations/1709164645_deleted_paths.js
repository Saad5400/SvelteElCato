/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr");

    return dao.deleteCollection(collection);
  },
  (db) => {
    const collection = new Collection({
      id: "nznq9mf0vr61khr",
      created: "2024-02-28 19:52:00.074Z",
      updated: "2024-02-28 23:46:55.110Z",
      name: "paths",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "hdgykusl",
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
          id: "zrd4l0t0",
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
