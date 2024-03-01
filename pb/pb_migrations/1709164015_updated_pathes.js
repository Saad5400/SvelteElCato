/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr")

  collection.name = "paths"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nznq9mf0vr61khr")

  collection.name = "pathes"

  return dao.saveCollection(collection)
})
