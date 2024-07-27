/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b90azfji",
    "name": "feedback",
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
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // remove
  collection.schema.removeField("b90azfji")

  return dao.saveCollection(collection)
})
