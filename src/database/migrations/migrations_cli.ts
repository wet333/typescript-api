import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);

// CLI Command mapping
if ( args.length > 0 ) {
    const command = args[0];

    if (command === "create") {
        createMigrationFile(args[1]);
    }
}

// Commands Functionality
function getTimestamp() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  
    return `${year}${month}${day}-${hours}${minutes}`;
}

function createMigrationFile(migrationName: string) {
    
    if (!migrationName || migrationName === "") {
        console.error('Usage: node migrations_cli.ts create "my migrations name"');
        return;
    }
    
    migrationName = migrationName.split(" ").join("-");
    const timestamp = getTimestamp();
    const fileName = `${timestamp}-${migrationName}.ts`;

    const migrationContent = `
        import { Database } from "./../Database";

        async function up() {

            const db = Database.getInstance();

            try {
                await db.runQuery('BEGIN');
                // Migrations code start:

                // Insert SQL here!!!

                // Migration code end.
                await db.runQuery('COMMIT');

                console.log('Migration executed successfully');
            } catch (error) {
                await db.runQuery('ROLLBACK');
                throw error;
            }
        };

        export { up };
    `;
    
    fs.writeFile(path.join(__dirname, fileName), migrationContent, err => {
        if (err) {
            console.error('An error occurred while creating the migration file.');
        } else {
            console.log(`Migration file '${fileName}' created successfully.`);
        }
    });
}

