module.exports = {
    up: async (db) => {
        await db.collection('users').updateSchema({
            fields: [
                { 
                    name: 'webID', 
                    type: 'number', 
                    required: true, 
                    options: { min: 1 } // Ensures the number is non-zero
                }
            ]
        });
    },
    down: async (db) => {
        await db.collection('users').updateSchema({
            fields: [
                // Remove the webID field
            ]
        });
    }
};
