exports.run = (client, message, connection, args) => {
var username = message.author.username;
var userID = message.author.id;
if(typeof(args) == "undefined") {
  message.channel.send(`${username} you did not use the command correctly. Use !addwl [wishlist].`);
  return;
}

var nickname = message.member.nickname;
var wishlist = args.toString().replace(/,/g, " ");
wishlist = wishlist.replace(/'/g, " ");
var defaultImage = "https://i.imgur.com/bqd5u1r.png";

if(nickname === null) {

console.log(username + " wants to add / update his wishlist.");
connection.query(`SELECT * FROM wishlist WHERE userID = '${userID}'`, function(err, rows, fields) {
  if(err) throw err;
  if (rows.length == 0) {
    console.log("User did not exist. Creating.");
    connection.query(`INSERT INTO wishlist SET userID = '${userID}', username = '${username}', nickname = '${nickname}', wishlist = '${wishlist}', imageURL = '${defaultImage}'`);
    message.channel.send(`**${username}**, you have created your wishlist as **${wishlist}**`);
  } else {
    console.log("User already exists. Updating.");
    connection.query(`UPDATE wishlist SET wishlist = '${wishlist}', username = '${username}' WHERE userID = '${userID}'`);
    message.channel.send(`**${username}** you have updated your wishlist with **${wishlist}**`);
  }
});

} else {
  console.log(nickname + " wants to add / update his wishlist.");
  connection.query(`SELECT * FROM wishlist WHERE userID ='${userID}'`, function(err, rows, fields) {
    if (err) throw err;
    if(rows.length == 0) {
      console.log("User did not exist. Creating.");
      connection.query(`INSERT INTO wishlist SET userID = '${userID}', username = '${username}', nickname = '${nickname}', wishlist = '${wishlist}', imageURL = '${defaultImage}'`);
      message.channel.send(`**${nickname}**, you have created your wishlist as **${wishlist}**.`);
    } else {
      console.log("User already exists. Updating.");
      connection.query(`UPDATE wishlist SET wishlist = '${wishlist}', username = '${username}', nickname = '${nickname}'  WHERE userID = '${userID}'`);
      message.channel.send(`**${nickname}**, you have updated your wishlist to **${wishlist}**`);
    }
  });
 }
}
