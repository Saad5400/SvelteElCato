/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6vd2mqfd",
    "name": "remainder",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // remove
  collection.schema.removeField("6vd2mqfd")

  return dao.saveCollection(collection)
})
