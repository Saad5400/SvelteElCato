/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nsmbindp",
    "name": "status",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "pending",
        "sent",
        "failed"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vg8wxb48frljtic")

  // remove
  collection.schema.removeField("nsmbindp")

  return dao.saveCollection(collection)
})
