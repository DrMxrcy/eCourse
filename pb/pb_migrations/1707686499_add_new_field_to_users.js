export async function up(db) {
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
}

export async function down(db) {
    await db.collection('users').updateSchema({
        fields: [
            // Remove the webID field
        ]
    });
}
