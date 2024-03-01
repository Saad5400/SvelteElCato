/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr")

  // remove
  collection.schema.removeField("qpcedbf4")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qpcedbf4",
    "name": "links",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
})
