/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  collection.createRule = "@request.data.toAddress = \"sdbtwa@gmail.com\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  collection.createRule = null

  return dao.saveCollection(collection)
})
