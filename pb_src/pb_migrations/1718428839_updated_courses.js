/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  collection.indexes = [
    "CREATE INDEX `idx_EjBi95U` ON `courses` (`urlName`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_EjBi95U` ON `courses` (`urlName`)"
  ]

  return dao.saveCollection(collection)
})
