/**
 * Imports
 */
const { Validator, DetailedValue } = require("node-data-validator");

/**
 * Role Model
 */
const role_model = {
    "name": String,         // 30 Chars
    "isCustom": Boolean,
    "displayName": String,  // 30 Chars
    "title": String,        // 50 Chars
    "description": String,  // 250 Chars
    "sound": String,        // 30 Chars
    "team": String, // <user|bot|alone> // Default: user
    "canKill": Boolean,
    "abilities": [
        new DetailedValue(Object, { required: false })
    ],
    "win": {
        "with": String, // "<user|bot|alone>" // Default: user
        "onUserKick": Boolean,
        "onBotKick": Boolean,
        "onLastSurvive": Boolean,
        "winMessage": String    // 30 Chars
    },
    "visibility": {
        "evil": Boolean,
        "bots": Boolean,
        "neutral": Boolean,
        "inspected": Boolean,
    }
}

/**
 * Ability Model
 */
const ability_model = {
    "type": String, // "<skip|scam|hack|inspect>"
    "amount": Number, // 0 - 100
    "negate": Boolean
}

// Constant team / ability types
const team_types = ["user", "bot", "alone"];
const ability_types = ["skip", "scam", "hack", "inspect"];

/**
 * Create Role Class
 */
class Role {
    constructor(json) {

        // Validate Json
        this.valid = Validator(json, role_model);

        // Throw Error
        if (!this.valid) {
            return;
        }

        // Validate Strings
        if(json.name.length > 30 || json.displayName.length > 30 || json.title.length > 50 || json.description.length > 250 || json.sound.length > 30 || json.win.winMessage.length > 30) {
            this.valid = false;
            return;
        }

        // Validate Name and String Trims
        if(json.name.toLowerCase().trim() !== json.name) {
            this.valid = false;
            return;
        }
        if(json.displayName.trim() !== json.displayName || json.title.trim() !== json.title || json.description.trim() !== json.description || json.sound.trim() !== json.sound || json.win.winMessage.trim() !== json.win.winMessage) {
            this.valid = false;
            return;
        }

        // Validate Properties
        if (!team_types.includes(json.team)) {
            this.valid = false;
            return;
        }

        if (!team_types.includes(json.win.with)) {
            this.valid = false;
            return;
        }

        // Abilities
        json.abilities.forEach(ability => {
            // Validate Ability
            if (!Validator(ability, ability_model)) {
                this.valid = false;
                return;
            }

            // Validate Inputs
            if (!ability_types.includes(ability.type)) {
                this.valid = false;
                return;
            }

            // Validate Amount
            if (ability.amount < 0 || ability.amount > 100) {
                this.valid = false;
                return;
            }
        });
    }
}
module.exports = Role;