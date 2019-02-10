let Rcon = require('srcds-rcon');
let SteamID = require('steamid-interop');

let rcon = Rcon({
    address: '185.113.141.4',
    password: 'deepgcomunidade2018'
});


rcon.connect().then(() => {
    console.log('connected');
}).then(() => { return rcon.command('status');
})
.then((data) => {
    //TODO: add try and Catch to avoid errors
    let data1 = data.split('\n#end')
    let rawClientsArray = data1[0].split('\n# ')
    rawClientsArray.splice(0, 3);


    let clientsArray = [];

    rawClientsArray.forEach(clientString => {
        str = clientString.replace(/ +(?= )/g,'');
        usefullString = str.split('" STEAM_');
        
        console.log(usefullString);
        dataArray =  usefullString[1].split(' ');
    
        console.log(dataArray);
        let ip = dataArray[6].split(':');

        //Conver to SteamID 64 - Required to query Steam API
        var idObject = SteamID.decode('STEAM_' + dataArray[0])

        let client = 
        {
            steamid64: parseInt(idObject.toString('64')),
            steamid32: 'STEAM_' + dataArray[0],
            connected: dataArray[1],
            ping: parseInt(dataArray[2]),
            loss: parseInt(dataArray[3]),
            state: dataArray[4],
            rate: parseInt(dataArray[5]),
            ip: ip[0]
        }
        

        clientsArray.push(client)

    });
    console.log(clientsArray);

})
.catch(console.error);

/*

# 873 2 "Hard" STEAM_1:1:244334789 18:53 70 0 active 80000
# 882 3 ".godMystiCj-" STEAM_1:1:196378675 02:15 35 0 active 128000
# 875 4 ". erd na g ." STEAM_1:0:147194112 16:17 28 0 active 128000
# 876 5 "t0ny" STEAM_1:1:120619119 15:52 42 0 active 128000
# 877 6 "(VD] skanixmaniaks hellcase.com" STEAM_1:1:109307018 15:22 77 0 active 128000
# 883 7 ".aqua" STEAM_1:0:154321263 00:55 19 0 active 128000
# 880 8 "Stewie2K" STEAM_1:0:420227620 12:29 24 0 active 128000
# 881 9 "GIDAY" STEAM_1:1:187711377 07:55 33 0 active 128000
# 884 10 "AFS-" STEAM_1:1:225907976 00:28 393 82 active 128000

*/





// var id = SteamID.decode('STEAM_1:1:90766640')

// console.log(id.toString('64')) // 76561197960265731





/*
var params = "domain:Abcd-E-Group,domaintype:com,Submit1:Search";

          var jsonStrig = '[{';
          var items = params.split(',');
          for (var i = 0; i < items.length; i++) {
              var current = items[i].split(':');
              jsonStrig += '"' + current[0] + '":"' + current[1] + '",';
          }
          jsonStrig = jsonStrig.substr(0, jsonStrig.length - 1);
          jsonStrig += '}]';
          alert(jsonStrig); //[{"domain":"Abcd-E-Group","domaintype":"com","Submit1":"Search"}]
          var obj = JSON.parse(jsonStrig);
          alert(obj[0].domain);

const parseList = (data) => {
    return data.raw()
      .split('|')
      .map(TeamspeakQuery.parse)
      .map(entry => entry.params)
      .map(entry => {
        delete entry.raw;
        return entry;
      });
}
*/
//  ISteamUser/GetPlayerSummaries -- Get Player Data