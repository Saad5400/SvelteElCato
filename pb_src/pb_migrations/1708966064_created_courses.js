/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "rdc13big79ez8hy",
      created: "2024-02-26 16:47:44.305Z",
      updated: "2024-02-26 16:47:44.305Z",
      name: "courses",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "guwyr5ff",
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
          id: "78vazvtm",
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
        },
        {
          system: false,
          id: "pxzrzkhl",
          name: "hidden",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
          options: {},
        },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_EjBi95U` ON `courses` (`urlName`)"],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy");

    return dao.deleteCollection(collection);
  },
);
