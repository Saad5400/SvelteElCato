/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xk8py2jx",
    "name": "hasFree",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  // remove
  collection.schema.removeField("xk8py2jx")

  return dao.saveCollection(collection)
})
