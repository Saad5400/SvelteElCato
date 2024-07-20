/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  collection.createRule = "@request.auth.id != \"\" &&\n@request.data.status = \"pending\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("skhpj1bql7zd3ge")

  collection.createRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
