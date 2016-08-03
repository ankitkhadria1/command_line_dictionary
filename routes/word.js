var request = require('request');
var async = require('async');
var myArgs = process.argv.slice(2);
var API_END_POINT = 'http://api.wordnik.com:80/v4/word.json/'
var ACCESS_TOKEN = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

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
			getDefinitions(myArgs[2],function(err,result)
			{
				if(err)
					console.log(err);
				else{
					console.log(result);
				}
			})
			break;
		case 'syn':
			getRelatedWord(myArgs[2],function(err,result)
			{
				if(err)
					console.log(err);
				else{
					console.log(result);
				}
			})
			break;
		case 'ant':
			console.log("..............",myArgs[1]);
			break;
		case 'ex':
			getExample(myArgs[2],function(err,result)
			{
				if(err)
					console.log(err);
				else{
					console.log(result);
				}
			})
			break;
		case 'play':
			console.log("...............",myArgs[1]);
			break;
		case myArgs[1]:
			allFunction(myArgs[1],function(err,result)
			{
				if(err)
					console.log(err);
				else
					console.log(result);
			})
			break;
		default :
			wordOfTheDay(function(err,result)
			{
				if(err)
					console.log(err);
				else{
					console.log(result);
				}
			})
	}
}


function  callApi(resource, callback) {
    var options = {
        method: 'GET',
        url:  resource,
        headers: {
            'api-key': ACCESS_TOKEN,
            'content-type': 'application/json'

        }
    };

    request(options, function(error, response, body) {
        callback(error, body);
    });
};

function getDefinitions(word,callback)
{
	var resource = 'http://api.wordnik.com:80/v4/word.json/'+word+'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	callApi(resource,function(error,result)
	{
		if(error)
			callback(error);
		else{
			
			var def = JSON.parse(result);
			def = def[0].text;
			callback(null,def);
		}
	})
}

function getRelatedWord(word,callback)
{
	
	var resource = 'http://api.wordnik.com:80/v4/word.json/'+word+'/relatedWords?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	callApi(resource,function(error,result)
	{
		if(error)
			callback(error);
		else{
			var syn = JSON.parse(result);
			var len = syn.length;
			var data =[];
			for(var i=0;i<len;i++)
			{
				(function(i)
				{
					if(syn[i].relationshipType=='synonym')
					{
						data=syn[i].words;
					}
					if(i==len-1)
						callback(null,data);
				})(i);
			}
		}
	})
	
}
function getExample(word,callback)
{
	var resource = 'http://api.wordnik.com:80/v4/word.json/'+word+'/examples?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	callApi(resource,function(error,result)
	{
		if(error)
			callback(error);
		else{
			
			var def = JSON.parse(result);
			def = def.examples;
			callback(null,def[0].text);
		}
	})
}
function wordOfTheDay(callback)
{
	var date = new Date();
   date =  date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
	var resource = 'http://api.wordnik.com:80/v4/word.json/'+date+'/wordOfTheDay?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
	callApi(resource,function(error,result)
	{
		if(error)
			callback(error);
		else{
			var data={};
			var def = JSON.parse(result);
			def = def.examples;
			data.examples = def[0].text;
			var word = def.word;
			affFunction(word,function(err,response)
			{
				if(err)
					callback(err);
				else
					callback(null,response);
			})
						
		}
	})

}

function allFunction(word,callback)
{
	async.auto({
				example:function(callback)
				{
					getExample(word,function(err,result)
					{
						if(err)
							callback(err);
						else{
							data.example=result;
							callback(null);
						}

					})
				},
				definition:function(callback)
				{
					getDefinitions(word,function(err,result)
					{
						if(err)
							callback(err);
						else{
							data.definition = result;
							callback(null);
						}
					})
				},
				relatedAt:function(callback)
				{
					getRelatedWord(word,function(err,result)
					{
						if(err)
							callback(err);
						else{
							data.synonym=result;
							callback(null);
						}
					})
				}

			},function(err,response)
			{
				if(err)
					callback(err);
				else
					callback(null,ata);

			})


}