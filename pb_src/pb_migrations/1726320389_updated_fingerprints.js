/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpgxpdppjgcfly")

  collection.listRule = "user.id = @request.auth.id"
  collection.viewRule = "user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpgxpdppjgcfly")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})