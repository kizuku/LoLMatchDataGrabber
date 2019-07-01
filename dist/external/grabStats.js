// grabStats.js - holds function to pull stats from results object

function grabStats(playerArray, gameDuration) {
    var stats = [];
    var kills = [];
    var deaths = [];
    var assists = [];
    var kda = [];
    var killPercent = [];
    var deathPercent = [];
    //var csAt10 = [];
    // want to somehow cover csAt15
    //var cspm = [];
    var dpm = [];
    var dmgPercent = [];
    var gold = [];
    var gpm = [];
    var goldShare = [];
    var wardsPlaced = [];
    var wardsCleared = [];
    var wpm = [];
    var wcpm = [];

    var totKills = 0;
    var totDeaths = 0;
    var totDmg = 0;
    var totGold = 0;

    for (var i = 0; i < playerArray.length; i++) {
        kills.push(playerArray[i].stats.kills);
        deaths.push(playerArray[i].stats.deaths);
        assists.push(playerArray[i].stats.assists);
        
        var tempKDA = 0;
        if (playerArray[i].stats.deaths != 0)
            tempKDA = ((playerArray[i].stats.kills + playerArray[i].stats.assists) / playerArray[i].stats.deaths).toFixed(2);
        else
            tempKDA = (playerArray[i].stats.kills + playerArray[i].stats.assists).toFixed(2);
        kda.push(tempKDA);

        // cover cs at 15 

        totKills += playerArray[i].stats.kills;
        totDeaths += playerArray[i].stats.deaths;
        totDmg += playerArray[i].stats.totalDamageDealtToChampions;
        totGold += playerArray[i].stats.goldEarned;
    }

    for (var i = 0; i < playerArray.length; i++) {
        killPercent.push((kills[i]/totKills).toFixed(2));
        deathPercent.push((deaths[i]/totDeaths).toFixed(2));


        // fix cs metrics
        /*
        var tempCSat10 = parseInt((playerArray[i].timeline.creepsPerMinDeltas["0-10"] * 10).toFixed(0)); 
        csAt10.push(tempCSat10);
        
        var tempCSpm = (((playerArray[i].stats.totalMinionsKilled * 60)/ gameDuration)).toFixed(2) 
        cspm.push(tempCSpm);
        */

        var tempDPM = (((playerArray[i].stats.totalDamageDealtToChampions * 60) / gameDuration)).toFixed(2); 
        dpm.push(tempDPM);
        var tempDMG = (playerArray[i].stats.totalDamageDealtToChampions / totDmg).toFixed(2);
        dmgPercent.push(tempDMG);

        gold.push(playerArray[i].stats.goldEarned);    
        var tempGPM = ((playerArray[i].stats.goldEarned * 60) / gameDuration).toFixed(2);
        gpm.push(tempGPM);
        goldShare.push((playerArray[i].stats.goldEarned / totGold).toFixed(2))

        wardsPlaced.push(playerArray[i].stats.wardsPlaced);
        wardsCleared.push(playerArray[i].stats.wardsKilled);
        wpm.push(((playerArray[i].stats.wardsPlaced * 60) / gameDuration).toFixed(2));
        wcpm.push(((playerArray[i].stats.wardsKilled * 60) / gameDuration).toFixed(2));
    }

    stats.push(kills);
    stats.push(deaths);
    stats.push(assists);
    stats.push(kda);
    stats.push(killPercent);
    stats.push(deathPercent);
    //stats.push(csAt10);

    //stats.push(cspm);
    stats.push(dpm);
    stats.push(dmgPercent);
    stats.push(gold);
    stats.push(gpm);
    stats.push(wardsPlaced);
    stats.push(wardsCleared);
    stats.push(wpm);
    stats.push(wcpm);

    return stats;
}