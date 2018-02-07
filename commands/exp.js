exports.run = (client, message, args) => {

var expData;
var startInput, endInput, calcButton, expText;
var class4, class3, class2, class1;
var nonclass4, nonclass3, nonclass2, nonclass1;
var expPerCard = [1000, 3000, 9000, 27000];
var expPerCardBonus = [1200, 3600, 10800, 32400];

expData = require('./exp.json');
startInput = args[0];
endInput = args[1];
var startLevel = startInput;
var endLevel = endInput;
console.log(startLevel);
console.log(endLevel);
if(startLevel && startLevel > 0 && endLevel && endLevel <= 100 && startLevel < endLevel){
var expNeeded = 0;
var startExp = expData[startLevel-1].total;
var endExp = expData[endLevel-1].total;
expNeeded = endExp - startExp;

for(var i = 0; i < 4; i++){
	//html id #
	var idx = i+1;
	var perCard = expPerCard[i];
	var perCardBonus = expPerCardBonus[i];
	var numNeeded = Math.ceil(expNeeded/perCard);
	numNeeded = numNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	var numNeededBonus = Math.ceil(expNeeded/perCardBonus);
	numNeededBonus = numNeededBonus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  message.channel.send(idx + "* XP Cards (Class): " + numNeededBonus + "\n" + idx + "* XP Cards (Non-Class): " + numNeeded + "\n");

}
expNeeded = expNeeded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
message.channel.send("Total Experience Needed: " + expNeeded);

	}
	else{
		message.channel.send(`You did not set the correct levels for this function. Use !exp starting_level final_level, where the levels can be between 1 and 100.
For example, !exp 1 70 calculates the cards needed for taking a level 1 Servant to level 70.`);
	}
}
