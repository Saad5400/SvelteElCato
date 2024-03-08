/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zcpw1byjrv08n6f",
    "created": "2024-03-08 03:41:07.492Z",
    "updated": "2024-03-08 03:41:07.492Z",
    "name": "choices",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9eyk8zj3",
        "name": "content",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zcpw1byjrv08n6f");

  return dao.deleteCollection(collection);
})
