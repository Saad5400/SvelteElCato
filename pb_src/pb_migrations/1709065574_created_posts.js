/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "eirwzcyq81aiodg",
      created: "2024-02-27 20:26:14.185Z",
      updated: "2024-02-27 20:26:14.185Z",
      name: "posts",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "rsklkwvo",
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
          id: "pisipvyt",
          name: "urlName",
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
          id: "n6tuj7x2",
          name: "hidden",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
          options: {},
        },
        {
          system: false,
          id: "cbs9xfna",
          name: "content",
          type: "editor",
          required: false,
          presentable: false,
          unique: false,
          options: {
            convertUrls: false,
          },
        },
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_Zt4CYA9` ON `posts` (`urlName`)"],
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
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    return dao.deleteCollection(collection);
  },
);
