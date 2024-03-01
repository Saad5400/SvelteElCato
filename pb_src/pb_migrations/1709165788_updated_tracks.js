/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oc1lhqcb",
    "name": "links",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1pz3be63qralzy2",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  // remove
  collection.schema.removeField("oc1lhqcb")

  return dao.saveCollection(collection)
})
