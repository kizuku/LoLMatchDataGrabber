// main.js - Main JS file for LoLMatchDataGrabber

const vm = new Vue({
    el: '#app',
    data: {
        champions: [],
        champIDs: [],
        players: [],
        categories: ["Champion", "Kills", "Deaths", "Assists", "KDA", "KP", "Death %", "DMG PM", "DMG %", "Gold", "GPM", "Gold Share %", "Wards Plc", "Wards Clr", "Wards PPM", "Wards CPM"],
        stats: [],
        rows: [],
        visible: false,
        link: '',
        matchid: '',
        team: ''
    },
    methods: {
        pullData: function (event) {
            this.champions = [];
            this.champIDs = [];
            this.players = [];
            this.stats = [];
            this.visible = false;

            this.link = document.getElementById("link").value;
            var teams = document.getElementsByName("team");

            for (var i = 0; i < teams.length; i++) {
                if (teams[i].checked)
                    this.team = teams[i].value;
            }

            if (this.team == "")
                alert("Error: Please select a team color");
            else
                this.visible = true

            if (this.team == "blue")
                this.team = 100;
            else if (this.team == "red")
                this.team = 200;

            var arr = this.link.split("/")
            this.matchid = arr[6];
        
            axios.get('/api', { headers: { matchid: this.matchid }}).then(result => {
                var data = result.data;
                console.log(data);

                // get data for relevant players
                for (var i = 0; i < data.participantIdentities.length; i++) {
                    if (data.participants[i].teamId == this.team)
                        this.players.push(data.participants[i])
                }

                for (var i = 0; i < this.players.length; i++) {
                    this.champIDs.push(this.players[i].championId);
                }

                this.champions = champIDtoName(this.champIDs);

                this.stats = grabStats(this.players, data.gameDuration);

                for (var i = 0; i < this.champions.length; i++) {
                    var tempArr = [];
                    tempArr.push(this.champions[i])
                    for (var j = 0; j < this.stats.length; j++) {
                        tempArr.push(this.stats[j][i]);
                    }
                    console.log(tempArr);
                    this.rows.push(tempArr);
                }
            })

        },
        exportCSV() {
            let csvContent = "data:text/csv;charset=utf-8,";

            csvContent += this.categories[0];
            for (var i = 1; i < this.categories.length; i++) {
                csvContent += ";" + this.categories[i];
            }
            csvContent += "\n";

            for (var i = 0; i < this.rows.length; i++) {
                csvContent += this.rows[i][0];
                for (var j = 1; j < this.categories.length; j++) {
                    csvContent += "," + this.rows[i][j];
                }
                csvContent += "\n";
            }

            console.log(csvContent);

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "table.csv");
            link.click();
        }
    }
});
