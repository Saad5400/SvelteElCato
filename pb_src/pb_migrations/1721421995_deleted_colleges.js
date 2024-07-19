/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7fevc1hk7he4u9g");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "7fevc1hk7he4u9g",
    "created": "2024-02-26 16:43:30.141Z",
    "updated": "2024-03-15 17:21:54.117Z",
    "name": "colleges",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "4z8n4pcg",
        "name": "displayName",
        "type": "text",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "5bd58uhr",
        "name": "urlName",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_gFS4Zme` ON `colleges` (`urlName`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
