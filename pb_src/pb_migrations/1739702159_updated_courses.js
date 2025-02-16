/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pebyg2qv",
    "name": "linked",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "rdc13big79ez8hy",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // remove
  collection.schema.removeField("pebyg2qv")

  return dao.saveCollection(collection)
})
