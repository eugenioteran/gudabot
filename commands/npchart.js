exports.run = (client, message, args) => {
    message.channel.send(`NP Chart: http://fategrandorder.wikia.com/wiki/User_blog:Ein_Inferno/NP_Damage_Comparisons`).catch(console.error);
}
