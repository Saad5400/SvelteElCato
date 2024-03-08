/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0b0yb5pc",
    "name": "explanation",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("tcpiz8srbmrdsp9")

  // remove
  collection.schema.removeField("0b0yb5pc")

  return dao.saveCollection(collection)
})
