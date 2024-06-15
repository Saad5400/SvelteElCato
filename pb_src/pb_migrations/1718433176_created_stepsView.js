/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ty4ztiqgtu89e0f",
    "created": "2024-06-15 06:32:56.623Z",
    "updated": "2024-06-15 06:32:56.623Z",
    "name": "stepsView",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fw6ayn2g",
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
        "id": "fqonyxu6",
        "name": "type",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "external",
            "bunny",
            "youtube",
            "section"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id, displayName, type FROM steps"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f");

  return dao.deleteCollection(collection);
})
