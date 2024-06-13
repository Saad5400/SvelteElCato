/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtfacgvs",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "external",
        "bunny",
        "youtube",
        "section"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y8zr52i3l6cgg39")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wtfacgvs",
    "name": "type",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "external",
        "lesson",
        "post",
        "youtube",
        "section"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
