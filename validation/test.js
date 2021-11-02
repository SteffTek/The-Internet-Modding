/**
 * Test Script for roles
 */

/* Imports */
const fs = require("fs");
const Role = require("./role");

/* Load all role files */
const roles = fs.readdirSync("./roles").filter(file => file.endsWith(".json")).map(file => {
    return require(`../roles/${file}`);
});

/* Load all custom role files */
const customRoles = fs.readdirSync("./community").filter(file => file.endsWith(".json")).map(file => {
    return require(`../community/${file}`);
});

/* Filter out all non .json files */
const all = roles.concat(customRoles); //filter(file => file.endsWith(".json"));

/**
 * Loop all Roles over role validation
 */
all.forEach(file => {
    // Create Role
    const role = new Role(file);

    // Check if role is valid
    if (!role.valid) {
        console.error(`The role '${file.name}' is not valid!`);
        // Exit process
        process.exit(1);
    }
});

// Log success
console.log("Everything looks fine!");