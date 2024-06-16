/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f")

  collection.options = {
    "query": "SELECT id, displayName, type, isFree FROM steps"
  }

  // remove
  collection.schema.removeField("fw6ayn2g")

  // remove
  collection.schema.removeField("fqonyxu6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1j8nnibg",
    "name": "displayName",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3n84va4k",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "external",
        "bunny",
        "youtube",
        "section"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uohoyfoy",
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
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f")

  collection.options = {
    "query": "SELECT id, displayName, type FROM steps"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fw6ayn2g",
    "name": "displayName",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fqonyxu6",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "external",
        "bunny",
        "youtube",
        "section"
      ]
    }
  }))

  // remove
  collection.schema.removeField("1j8nnibg")

  // remove
  collection.schema.removeField("3n84va4k")

  // remove
  collection.schema.removeField("uohoyfoy")

  return dao.saveCollection(collection)
})
