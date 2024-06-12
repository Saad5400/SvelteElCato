/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("u6aq2my9t0rbabi");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "u6aq2my9t0rbabi",
    "created": "2024-06-11 22:51:57.129Z",
    "updated": "2024-06-11 22:51:57.129Z",
    "name": "usersEmails",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cpl15uwb",
        "name": "email",
        "type": "email",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, email from users;"
    }
  });

  return Dao(db).saveCollection(collection);
})
