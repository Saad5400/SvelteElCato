/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsndilqs",
    "name": "receipt",
    "type": "file",
    "required": false,
    "presentable": true,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hsndilqs",
    "name": "receipt",
    "type": "file",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": true
    }
  }))

  return dao.saveCollection(collection)
})
