/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  collection.viewRule = "@request.query.fields = \"id,displayName,urlName,order,description,expand.college,expand.tracks,expand.quizzes\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p769rmoedc83ne8")

  collection.viewRule = ""

  return dao.saveCollection(collection)
})