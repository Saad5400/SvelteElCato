/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7fevc1hk7he4u9g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_gFS4Zme` ON `colleges` (`urlName`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4z8n4pcg",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5bd58uhr",
    "name": "urlName",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("7fevc1hk7he4u9g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_gFS4Zme` ON `colleges` (`urlId`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4z8n4pcg",
    "name": "name",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5bd58uhr",
    "name": "urlId",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
