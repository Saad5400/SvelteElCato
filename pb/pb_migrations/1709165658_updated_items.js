/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2")

  collection.name = "TrackLinks"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1pz3be63qralzy2")

  collection.name = "items"

  return dao.saveCollection(collection)
})
