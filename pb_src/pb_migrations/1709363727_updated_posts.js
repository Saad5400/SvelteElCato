/// <reference path="../pb_data/types.d.ts" />
migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    collection.updateRule = null;

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg");

    collection.updateRule = "";

    return dao.saveCollection(collection);
  },
);
