const Discord = require("discord.js");
const client = new Discord.Client();

exports.run = (client, message, args) => {
    /* const umu = client.emojis.get("401386848796016650");
    message.reply(`${umu}`); */
var umuType = args.join(" ").toLowerCase();
console.log(umuType);
if(umuType == "rojo" || umuType == "") {
    const embed = new Discord.RichEmbed()
        .setTitle("UMU","umu")
        .setImage("https://cdn.discordapp.com/emojis/401386848796016650.png")
        .setDescription("umu")
        .setFooter("umu")
        .addField("umu","umu",true)

    message.channel.send({ embed });
  } else if (umuType == "blanco") {
    const embed = new Discord.RichEmbed()
        .setTitle("UMU","umu")
        .setImage("https://i.imgur.com/Z8amJs7.png")
        .setDescription("umu")
        .setFooter("umu")
        .addField("umu","umu",true)

    message.channel.send({ embed });
  } else if (umuType == "verano") {
    const embed = new Discord.RichEmbed()
        .setTitle("UMU","umu")
        .setImage("https://i.imgur.com/3wXCF7X.jpg")
        .setDescription("umu")
        .setFooter("umu")
        .addField("umu","umu",true)

    message.channel.send({ embed });
  }
};
