[![Role Validation](https://github.com/SteffTek/The-Internet-Modding/actions/workflows/validation.yml/badge.svg?branch=main)](https://github.com/SteffTek/The-Internet-Modding/actions/workflows/validation.yml)

# Modding TheInternet
### A Guide on how to improve bad game design.
⚠️ Caution: If you don't know what "TheInternet" is - look [**here**](https://internet.stefftek.de).

## About Modding
TheInternet is modded by creating, altering or deleting roles that directly affect gameplay with their different abilities or can provide valuable intel.

Mods are provided as JSON files and uploaded for each lobby on TheInternet.

## Basic Game Rules
+ A game lasts until all `bots` are dead, all `users` are killed, etc.
+ A custom role with `onLastSurvive` only wins if no other users or bots are alive, otherwise the users will win.
+ As bot counts every role that `canKill` users and have `bot` set as their team.
+ Roles are given in a certain order in game logic.
    + Bots
    + Admin
    + Davis
    + Troll
    + Scammer
    + Any Custom Roles
    + Users
+ This implies that if you have 5 players, from which 4 are selected as bots, the last user will be selected as admin.
+ A scammer, a bad guy, doesn't count as bot.
+ I like watermelon.
+ Removed Herobrine.

## Role mod file
A role mod file looks like this.
```json
{
    "name": "bot",
    "isCustom": false,
    "displayName": "roles.bots.name",
    "title": "page.roles.bot.title",
    "description": "page.roles.bot.desc",
    "sound": "voice_role_bot",
    "team": "bot",
    "canKill": true,
    "abilities": [
        {
            "type": "hack",
            "amount": 1,
            "negate": false
        }
    ],
    "win": {
        "with": "bot",
        "onUserKick": false,
        "onBotKick": false,
        "onLastSurvive": false,
        "winMessage": ""
    },
    "visibility": {
        "evil": false,
        "bots": true,
        "neutral": false,
        "inspected": false
    }
}
```

**Well - I know this can look scary, but it really isn't.**

Let's go through __step by step__.

## The Header
The header defines a set of base rules for our new role.
```json
"name": "bot",
"isCustom": false,
"displayName": "roles.bots.name",
"title": "page.roles.bot.title",
"description": "page.roles.bot.desc",
"sound": "voice_role_bot",
"team": "bot",
"canKill": true,
```

The `name` is an internal reference. No two roles can have the same `name`. It's like an unique identifier.

`isCustom` should always be set to `true`, if you are creating your own role. The default is false, because for any **existing roles** the header segment is **locked** and not alterable.

The `displayName`, `title` and `description` of your new role are free to use text fields. The display name is used to announce your role to the player. The title and description is used to give valuable information to the player above the chatbox. However, there are [text size limits](#text-limits).

![grafik](https://user-images.githubusercontent.com/5563452/139813439-5f81db88-da29-4382-8d7b-2e2d478f2620.png)

`sound` is the announcer sound file that will be played. No, this is **not** a hyperlink. For reference, look up existing role files.

The `team` header field is describing the most important. This defines which team the role plays with. This should be noted in your description. [Reference](#enums)

And finally, the `canKill` attribute. Set this to true if your role can vote during bot vote phases.

## The Abilities
Abilities are stored in an so called array.
```json
"abilities": [
    {
        "type": "hack",
        "amount": 1,
        "negate": false
    }
]
```

You can have more abilities per role, if you comma separate them.
```json
"abilities": [
    {
        ...
    }, {
        ...
    }
]
```

`type` declares the type of the ability. **There can only ever be one ability of the same type on the same role.** [Reference](#enums)

`amount` declares how often a user can use this ability.

`negate` negates the ability. So you can "unhack" users, or "unscam" other users. This does not work for the `inspect`-Type. Look up the [Reference](#enums) for more.

## Win Conditions
The win conditions are stored inside the `win` attribute. This field will be ignored on non-custom roles.
```json
"win": {
    "with": "bot",
    "onUserKick": false,
    "onBotKick": false,
    "onLastSurvive": false,
    "winMessage": ""
}
```
First of all, everything below `with` is ignored if its not set to `alone`. [Reference](#enums)

However, if your role win with is set to `alone`, the other fields become available.

Set `onUserKick` to `true`, if you role wins if its kicked during a user vote - like the troll. Or set `onBotKick` to `true` to apply the same behavior to the bot vote. In both instances, the "troll" will be announced as winner.

Set the `onLastSurvive` attribute to `true`. Your role will be elected winner if it survived all users and bots at the end of the round and will have the custom `winMessage` displayed. **Note:** If a user and your custom role are the last survivers, the users will win that round.

## Visibility
The visibility describes what a user can or cannot see.
```json
"visibility": {
    "evil": false,
    "bots": true,
    "neutral": false,
    "inspected": false
}
```
`evil` enables the ability to see any evil role. (Team equals `bot`).

`bots` enables to only see bots but no other evil role.

`neutral` allows to see roles like the troll, where the team type is `alone`. ⚠️**THIS IS NOT YET VISUALLY IMPLEMENTED**⚠️

`inspected` allows to see the results of an inspection from the `inspect` ability.

## Enums
Team Types are:
+ `user`
+ `bot`
+ `alone`

Ability Types are:
+ `skip` - Skip bot votes
    + **Negated**: Force skipped bot votes
+ `scam` - Steal all abilites from users
    + **Negated**: Give back all abilities once
+ `hack` - Hacks user during minigames
    + **Negated**: Un-Hack user
+ `inspect`
    + **Negated**: Not implemented.


## Text Limits
A few limits on free text fields while modding.
+ `name`: 30 Chars, only lower case
+ `displayName`: 30 Chars
+ `title`: 50 Chars
+ `description`: 250 Chars
+ `sound`: 30 Chars
+ `winMessage`: 30 Chars

Futhermore, no text field is allowed to have leading or trailing spaces.
