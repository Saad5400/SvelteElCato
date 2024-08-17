/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ny4t79kjse1njnk")

  collection.createRule = "@request.auth.id != \"\" &&\n@request.auth.id = @request.data.user.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ny4t79kjse1njnk")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
