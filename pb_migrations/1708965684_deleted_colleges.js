/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("tm2wg2b1cm69jzf");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "tm2wg2b1cm69jzf",
    "created": "2024-02-26 16:37:22.483Z",
    "updated": "2024-02-26 16:37:22.483Z",
    "name": "colleges",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vs9vz0de",
        "name": "name",
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
        "id": "3cu9d22j",
        "name": "logo",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_S38Wbkz` ON `colleges` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
