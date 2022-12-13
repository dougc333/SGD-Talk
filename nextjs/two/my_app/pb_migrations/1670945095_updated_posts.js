migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("407ipg5aqqjocnr")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("407ipg5aqqjocnr")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
