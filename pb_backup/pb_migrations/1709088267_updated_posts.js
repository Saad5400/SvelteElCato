/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lcott1sb",
    "name": "writter",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  // remove
  collection.schema.removeField("lcott1sb")

  return dao.saveCollection(collection)
})
