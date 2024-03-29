/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("mlqqgn5h39ebgs7");

    return dao.deleteCollection(collection);
  },
  (db) => {
    const collection = new Collection({
      id: "mlqqgn5h39ebgs7",
      created: "2024-02-27 22:19:20.541Z",
      updated: "2024-03-01 23:13:00.219Z",
      name: "tags",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "1n9un200",
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
      ],
      indexes: ["CREATE UNIQUE INDEX `idx_Dq5ZdZp` ON `tags` (`displayName`)"],
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
);
