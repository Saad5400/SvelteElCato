/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("megjv1n6a5d7unh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ddi9i0so",
    "name": "isFree",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("megjv1n6a5d7unh")

  // remove
  collection.schema.removeField("ddi9i0so")

  return dao.saveCollection(collection)
})
