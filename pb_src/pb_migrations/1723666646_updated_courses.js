/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kzfdsso3",
    "name": "ratings",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ny4t79kjse1njnk",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // remove
  collection.schema.removeField("kzfdsso3")

  return dao.saveCollection(collection)
})
