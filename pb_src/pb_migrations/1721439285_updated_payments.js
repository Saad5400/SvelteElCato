/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ok37anzi",
    "name": "status",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "pending",
        "accepted",
        "rejected"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // remove
  collection.schema.removeField("ok37anzi")

  return dao.saveCollection(collection)
})
