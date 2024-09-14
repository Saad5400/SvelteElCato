/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpgxpdppjgcfly")

  collection.listRule = "@request.data.user.id = @request.auth.id"
  collection.viewRule = "@request.data.user.id = @request.auth.id"
  collection.createRule = "@request.data.user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0fpgxpdppjgcfly")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
