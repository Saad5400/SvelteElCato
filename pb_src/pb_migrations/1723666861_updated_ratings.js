/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ny4t79kjse1njnk")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gm5wyhki",
    "name": "comment",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ny4t79kjse1njnk")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
