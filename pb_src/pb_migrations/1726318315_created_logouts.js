/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3z03075a19b7xon",
    "created": "2024-09-14 12:51:55.503Z",
    "updated": "2024-09-14 12:51:55.503Z",
    "name": "logouts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "a0yccwhn",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3z03075a19b7xon");

  return dao.deleteCollection(collection);
})
