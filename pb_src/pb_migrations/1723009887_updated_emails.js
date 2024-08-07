/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ce8tbxmr",
    "name": "details",
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
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  // remove
  collection.schema.removeField("ce8tbxmr")

  return dao.saveCollection(collection)
})
