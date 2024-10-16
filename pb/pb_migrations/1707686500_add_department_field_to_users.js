/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // Add the new department field
    collection.schema.addField(new SchemaField({
        system: false,
        id: "department",
        name: "department",
        type: "text",
        required: false,
        presentable: false,
        unique: false,
        options: {
            min: null,
            max: 255, // Optional: set a maximum length for the text
            pattern: "" // Optional: set a regex pattern if needed
        }
    }));

    return dao.saveCollection(collection);
}, (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId("_pb_users_auth_");

    // Remove the department field
    collection.schema.removeField("department");

    return dao.saveCollection(collection);
});
