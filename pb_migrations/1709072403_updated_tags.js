/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqqgn5h39ebgs7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1n9un200",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mlqqgn5h39ebgs7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1n9un200",
    "name": "displayName",
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
})
