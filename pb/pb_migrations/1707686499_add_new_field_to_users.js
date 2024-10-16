/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // Add the new field
    collection.schema.addField(new SchemaField({
        system: false,
        id: "webID",
        name: "webID",
        type: "number",
        required: true,
        presentable: false,
        unique: false,
        options: {
            min: 1 // Ensures the number is non-zero
        }
    }));

    return dao.saveCollection(collection);
}, (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // Remove the webID field
    collection.schema.removeField("webID");

    return dao.saveCollection(collection);
});
