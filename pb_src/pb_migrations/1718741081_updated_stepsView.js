/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f")

  collection.options = {
    "query": "SELECT id, displayName, type, isFree, length FROM steps"
  }

  // remove
  collection.schema.removeField("dq8rpjn9")

  // remove
  collection.schema.removeField("hgoexudo")

  // remove
  collection.schema.removeField("c2vngu50")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ys1rufrv",
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
    "id": "qp7vk4fv",
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
    "id": "88izoaol",
    "name": "isFree",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgzlvvy6",
    "name": "length",
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
  const collection = dao.findCollectionByNameOrId("ty4ztiqgtu89e0f")

  collection.options = {
    "query": "SELECT id, displayName, type, isFree FROM steps"
  }

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

  // remove
  collection.schema.removeField("ys1rufrv")

  // remove
  collection.schema.removeField("qp7vk4fv")

  // remove
  collection.schema.removeField("88izoaol")

  // remove
  collection.schema.removeField("vgzlvvy6")

  return dao.saveCollection(collection)
})
