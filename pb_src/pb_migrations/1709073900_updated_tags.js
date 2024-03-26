/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("mlqqgn5h39ebgs7");

    collection.listRule = "";
    collection.viewRule = "";

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("mlqqgn5h39ebgs7");

    collection.listRule = null;
    collection.viewRule = null;

    return dao.saveCollection(collection);
  },
);
