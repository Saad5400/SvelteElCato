/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  collection.listRule = "hidden = false"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eirwzcyq81aiodg")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
