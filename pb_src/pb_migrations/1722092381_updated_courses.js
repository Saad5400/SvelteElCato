/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_EjBi95U` ON `courses` (`urlName`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vnz02sjv",
    "name": "isAvailable",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rdc13big79ez8hy")

  collection.indexes = [
    "CREATE INDEX `idx_EjBi95U` ON `courses` (`urlName`)"
  ]

  // remove
  collection.schema.removeField("vnz02sjv")

  return dao.saveCollection(collection)
})
