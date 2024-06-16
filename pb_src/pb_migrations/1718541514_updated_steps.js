/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  collection.listRule = "isFree = true"
  collection.viewRule = "isFree = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  collection.listRule = "isFree = true || @request.auth.registeredCourses.tracks.steps:each ?= id"
  collection.viewRule = "isFree = true || @request.auth.registeredCourses.tracks.steps:each ?= id"

  return dao.saveCollection(collection)
})
