/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  collection.listRule = "isFree = true"
  collection.viewRule = "isFree = true"

  return dao.saveCollection(collection)
})
