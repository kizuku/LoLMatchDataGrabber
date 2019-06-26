// External.js - holds external functions

function champNameFromID(idArray) {
    var champNames = [];
    var champ;

    for (var i = 0; i < idArray.length; i++) {
        switch(idArray[i]) {
            case 157: champ = "Yasuo"; break; 
            case 18: champ = "Tristana"; break;
            case 45: champ = "Veigar"; break;
            case 350: champ = "Yuumi"; break;
            case 110: champ = "Varus"; break;
        }
        champNames.push(champ);
    }

    return champNames;
}

function grabStats(playerArray) {
    var stats = [];
    var kills = [];
    var deaths = [];
    var assists = [];
    var kda = [];
    var killPercent = [];
    var deathPercent = [];

    var totKills = 0;
    var totDeaths = 0;

    for (var i = 0; i < playerArray.length; i++) {
        kills.push(playerArray[i].stats.kills);
        totKills += playerArray[i].stats.kills;

        deaths.push(playerArray[i].stats.deaths);
        totDeaths += playerArray[i].stats.deaths;

        assists.push(playerArray[i].stats.assists);
        kda.push(((playerArray[i].stats.kills + playerArray[i].stats.assists) / playerArray[i].stats.deaths).toFixed(2))
    }

    for (var i = 0; i < playerArray.length; i++) {
        
    }

    stats.push(kills);
    stats.push(deaths);
    stats.push(assists);
    stats.push(kda);

    return stats;
}