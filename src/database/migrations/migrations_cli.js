"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const args = process.argv.slice(2);
// CLI Command mapping
if (args.length > 0) {
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
function createMigrationFile(migrationName) {
    if (!migrationName || migrationName === "") {
        console.error('Usage: node migrations_cli.js create "my migrations name"');
        return;
    }
    migrationName = migrationName.split(" ").join("-");
    const timestamp = getTimestamp();
    const fileName = `${timestamp}-${migrationName}.ts`;
    const migrationContent = `
import { Database } from "./../Database";

export async function up() {

    const db = Database.getInstance();

    try {
        
        await db.runQuery('BEGIN');
        // Migrations code start:

        // Insert SQL here!!!

        // Migration code end.
        await db.runQuery('COMMIT');

    } catch (error) {
        await db.runQuery('ROLLBACK');
        throw error;
    }
};
    `;
    fs.writeFile(path.join(__dirname, fileName), migrationContent, err => {
        if (err) {
            console.error('An error occurred while creating the migration file.');
        }
        else {
            console.log(`Migration file '${fileName}' created successfully.`);
        }
    });
}
