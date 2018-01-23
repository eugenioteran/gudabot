exports.run = (servantUrl, urlRef, client, message) => {
var servantCall = servantUrl;
var urlRef = urlRef;
var request = require('request');
var cheerio = require('cheerio');
const Discord = require('discord.js');
var servant = {
  name: '',
  image: '',
  serClass: '',
  cost: '',
  baseHP: '',
  baseATK: '',
  maxHP: '',
  maxATK: '',
  cards: '',
  np: '',
  npDesc: ''
};

// Retrieves Servant Name from Servant specific URL
request("http://fate-go.cirnopedia.org/servant_all.php#nav", function(error, response, html) {
  if(!error && response.statusCode == 200) {
    //$ = cheerio.load('div', '<div id="mw-content-text">...</div>');
    var $ = cheerio.load(html);
    var fullTable = $('tr[id="'+urlRef+'"]');
    var tablesColumns = $(fullTable).find('td').toArray();
    var i = 0;
    for (let tableColumns of tablesColumns){
      switch (i){
        /* case 2:
        servant.image = $(tableColumns).find('div').attr('style');
        console.log(servant.image);
          break;*/
        case 3:
        servant.name = $(tableColumns).find('a').text();
        servant.name = servant.name.replace(/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B|\n\r/g, "");
          break;
        case 4:
        servant.serClass = $(tableColumns).text();
        break;
        case 5:
        servant.cost = $(tableColumns).text();
        break;
        case 6:
        servant.baseHP = $(tableColumns).text();
        break;
        case 7:
        servant.baseATK = $(tableColumns).text();
        break;
        case 8:
        servant.maxHP = $(tableColumns).text();
        break;
        case 9:
        servant.maxATK = $(tableColumns).text();
        break;
        case 10:
        var cards = $(tableColumns).find('img').toArray();
        for(let card of cards) {
          var cardCheck = $(card).attr('src');
          if(cardCheck.indexOf("pattern_01") >= 0) {
            servant.cards += "Quick";
          } else if (cardCheck.indexOf("pattern_02") >= 0) {
            servant.cards += "Arts";
          } else if (cardCheck.indexOf("pattern_03") >= 0) {
            servant.cards += "Buster";
          }
            servant.cards += " ";
          }
        break;
        case 11:
        var nobleName = $(tableColumns).find('ch1').text();
        nobleName = nobleName.trim();
        servant.np = nobleName;
        console.log("Name: " + servant.np);
        var nobleDesc1 = $(tableColumns).find('ch2').text();
        nobleDesc1 = nobleDesc1.replace("]", "]\n");
        console.log("Desc1: " + nobleDesc1);
        var nobleDesc2 = $(tableColumns).find('ch3').text();
        nobleDesc2 = nobleDesc2.trim();
        console.log("Desc2: " + nobleDesc2);
        var noble = $(tableColumns).find('img');
        var nobleCheck = $(noble).attr('src');
        if(nobleCheck.indexOf("pattern_01") >= 0) {
          servant.npDesc = nobleDesc1 + nobleDesc2 + "(Quick)";
          } else if (nobleCheck.indexOf("pattern_02") >= 0) {
          servant.npDesc = nobleDesc1 + nobleDesc2 + "(Arts)";
          } else if (nobleCheck.indexOf("pattern_03") >= 0) {
          servant.npDesc = nobleDesc1 + "\n" nobleDesc2 + "(Buster)";
          }
          console.log("npDesc: " + servant.npDesc);
        break;
        }
      i++;
    }
    servant.image = "http://fate-go.cirnopedia.org/icons/servant/servant_"+urlRef+"1.png";
    //message.channel.send(`Name: ${servant.name}
//Image: ${servant.image}`);
    const embed = new Discord.RichEmbed()
    .setTitle(servant.name)
    .setThumbnail(servant.image)
    .setURL(servantCall)
    .addField("Class", servant.serClass, true)
    .addField("Cost", servant.cost, true)
    .addField("Base HP", servant.baseHP, true)
    .addField("Base ATK", servant.baseATK, true)
    .addField("Max HP", servant.maxHP, true)
    .addField("Max ATK", servant.maxATK, true)
    .addField("Cards", servant.cards)
    .addField(servant.np, servant.npDesc)

    message.channel.send({embed});
    }

  });
}
