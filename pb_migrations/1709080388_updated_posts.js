/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ysoemrdc",
    "name": "views",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  // remove
  collection.schema.removeField("ysoemrdc")

  return dao.saveCollection(collection)
})
