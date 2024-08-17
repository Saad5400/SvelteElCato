/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ny4t79kjse1njnk",
    "created": "2024-08-14 20:12:38.893Z",
    "updated": "2024-08-14 20:12:38.893Z",
    "name": "ratings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gm5wyhki",
        "name": "comment",
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
        "id": "hnvax3kd",
        "name": "rating",
        "type": "select",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "1",
            "2",
            "3",
            "4",
            "5"
          ]
        }
      },
      {
        "system": false,
        "id": "zxgxeaep",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": true,
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ny4t79kjse1njnk");

  return dao.deleteCollection(collection);
})
