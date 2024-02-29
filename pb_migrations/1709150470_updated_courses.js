/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qmzoqid9",
    "name": "pathes",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nznq9mf0vr61khr",
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
  collection.schema.removeField("qmzoqid9")

  return dao.saveCollection(collection)
})
