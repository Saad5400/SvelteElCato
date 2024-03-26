/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "tcpiz8srbmrdsp9",
      created: "2024-03-08 03:43:00.999Z",
      updated: "2024-03-08 03:43:00.999Z",
      name: "quizzes",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "fypoqtcz",
          name: "question",
          type: "editor",
          required: true,
          presentable: true,
          unique: false,
          options: {
            convertUrls: false,
          },
        },
        {
          system: false,
          id: "vglslesl",
          name: "choices",
          type: "relation",
          required: true,
          presentable: false,
          unique: false,
          options: {
            collectionId: "zcpw1byjrv08n6f",
            cascadeDelete: true,
            minSelect: null,
            maxSelect: null,
            displayFields: null,
          },
        },
        {
          system: false,
          id: "nevemyny",
          name: "tag",
          type: "relation",
          required: true,
          presentable: true,
          unique: false,
          options: {
            collectionId: "mlqqgn5h39ebgs7",
            cascadeDelete: false,
            minSelect: null,
            maxSelect: 1,
            displayFields: null,
          },
        },
      ],
      indexes: [],
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9");

    return dao.deleteCollection(collection);
  },
);
