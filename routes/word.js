var request = require('request');
var myArgs = process.argv.slice(2);



var length = myArgs.length;
if(length>3 || length==0)
{
	console.log("Enter right command");
}
else if(myArgs[0]=='./dict')
{
	switch (myArgs[1])
	{
		case 'def':
			console.log("......",myArgs[1]);
			break;
		case 'syn':
			console.log(".............",myArgs[1]);
			break;
		case 'ant':
			console.log("..............",myArgs[1]);
			break;
		case 'ex':
			console.log("................",myArgs[1]);
			break;
		case 'play':
			console.log("...............",myArgs[1]);
			break;
		case myArgs[1]:
			console.log(".................",myArgs[1]);
			break;
		default :
			console.log("WORD OF THE DAY");
	}
}
