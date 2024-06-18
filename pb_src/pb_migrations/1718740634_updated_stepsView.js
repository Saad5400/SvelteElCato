/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f")

  // remove
  collection.schema.removeField("xjljhtl7")

  // remove
  collection.schema.removeField("mbkqio2a")

  // remove
  collection.schema.removeField("ohvmg3pu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dq8rpjn9",
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
    "id": "hgoexudo",
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
        "section",
        "post"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c2vngu50",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xjljhtl7",
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
    "id": "mbkqio2a",
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
    "id": "ohvmg3pu",
    "name": "isFree",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("dq8rpjn9")

  // remove
  collection.schema.removeField("hgoexudo")

  // remove
  collection.schema.removeField("c2vngu50")

  return dao.saveCollection(collection)
})
