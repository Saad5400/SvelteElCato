/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbk0deld",
    "name": "tracks",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "p769rmoedc83ne8",
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
  collection.schema.removeField("cbk0deld")

  return dao.saveCollection(collection)
})
