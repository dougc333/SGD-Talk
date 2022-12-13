migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ohlxcaac4ny6a4m");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "ohlxcaac4ny6a4m",
    "created": "2022-12-13 07:30:31.538Z",
    "updated": "2022-12-13 07:30:31.538Z",
    "name": "posts1",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rzksblav",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
