/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("n3u4hbvf1b2ibld");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "n3u4hbvf1b2ibld",
    "created": "2024-03-02 18:33:24.346Z",
    "updated": "2024-03-02 19:00:36.061Z",
    "name": "telegramUsers",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "tsptdrfx",
        "name": "telegramId",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "dgs15lu1",
        "name": "username",
        "type": "text",
        "required": false,
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
        "id": "yscsdkwu",
        "name": "credits",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "assa9dzr",
        "name": "registeredUntil",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_vOyH5MO` ON `telegramUsers` (`telegramId`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
