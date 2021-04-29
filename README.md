# Discord Backup (MongoDB Version)

A Package that allows your Discord Bot to Facilitate Server Backup.

NOTE: This Package Uses MongoDB, not a JSON File and "FS" like the [Original Package](https://npmjs.com/package/discord-backup) by [Androz2091](https://github.com/Androz2091).

# Install Package

To Install this Package, type the following into your Project's Terminal:

`npm i @willtda/discord-backup --save`

# Example Code

```js
const Discord = require("discord.js");
const backup = require("@willtda/discord-backup");
const client = new Discord.Client();

const PREFIX = "!";

backup.connectToDatabase("MongoDB Database URI"); //THIS IS VERY IMPORTANT. MAKE SURE YOU DO THIS!

client.on("ready", () => {
    console.log("Bot is Online")
});

client.on("message", async message => {
    if (message.author.bot || message.channel.type == "dm") return;

    let args = message.content.substring(PREFIX.length).split(" ");

    if (message.content.startsWith(`${PREFIX}create`)) {
        message.channel.send("Creating Server Backup... This may take a few seconds.")
        await backup.create(message.guild).then((backupData) => {
            message.channel.send(`Successfully Created a Backup with the ID: ${backupData.id}`)
        });
    }
    else if (message.content.startsWith(`${PREFIX}load`)) {
        //Create a confirmation message here...
        message.channel.send("Starting to Load Server Backup... This may take a few seconds.")
        await backup.load(args[1], message.guild);
    }
    else if (message.content.startsWith(`${PREFIX}info`)) {
        await backup.fetch(args[1]).then(async (backupData) => {
            await message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Backup Information")
                    .addField("Backup ID", backupData.id)
                    .addField("Backup Size", backupData.size)
                    .addField("Time Created", new Date(backupData.data.createdTimestamp))
            )
        });
    } 
    else if (message.content.startsWith(`${PREFIX}remove`)) {
        //Again, create a confirmation message here if you want...
        await backup.remove(args[1]);
        message.channel.send("Successfully Removed Backup!")
    }
    else if (message.content.startsWith(`${PREFIX}list`)) {
        let list = await backup.listGuildBackups(message.guild) //You can get a list of all server backups by just using "backup.list()".
        console.log(list)
    }
});

client.login("Discord Bot Token");
```

# Need Help? Join Our Discord Server!

https://discord.gg/P2g24jp