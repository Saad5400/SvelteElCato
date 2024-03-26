/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const collection = new Collection({
      id: "1pz3be63qralzy2",
      created: "2024-02-28 23:08:28.422Z",
      updated: "2024-02-28 23:08:28.422Z",
      name: "items",
      type: "base",
      system: false,
      schema: [
        {
          system: false,
          id: "u1o7fyvd",
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
          id: "qxgozvyk",
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
        {
          system: false,
          id: "9o8inucj",
          name: "free",
          type: "bool",
          required: false,
          presentable: false,
          unique: false,
          options: {},
        },
        {
          system: false,
          id: "u703ztul",
          name: "url",
          type: "url",
          required: true,
          presentable: false,
          unique: false,
          options: {
            exceptDomains: [],
            onlyDomains: [],
          },
        },
        {
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
    const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

    return dao.deleteCollection(collection);
  },
);
