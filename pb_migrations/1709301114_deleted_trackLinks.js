/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "1pz3be63qralzy2",
    "created": "2024-02-28 23:08:28.422Z",
    "updated": "2024-02-29 00:17:19.090Z",
    "name": "trackLinks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "u1o7fyvd",
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
        "id": "9o8inucj",
        "name": "free",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "hwqw3ohe",
        "name": "next",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "1pz3be63qralzy2",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "iexifgti",
        "name": "url",
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
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
