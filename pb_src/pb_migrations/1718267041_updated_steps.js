/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dewewsjd",
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
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  // remove
  collection.schema.removeField("dewewsjd")

  return dao.saveCollection(collection)
})
