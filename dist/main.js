// main.js - Main JS file for LoLMatchDataGrabber

const vm = new Vue({
    el: '#app',
    data: {
        champions: [],
        champIDs: [],
        players: [],
        stats: [],
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
            })
        },
        exportCSV() {
            var table = document.getElementById("table");
            var numRows = table.rows.length;

            let csvContent = "data:text/csv;charset=utf-8,";
            let categories = [];

            for (var i = 0; i < numRows; i++) {
                var cells = table.rows.item(i).cells;

                categories.push(cells.item(0).innerHTML);
            }

            for (var i = 0; i < categories.length; i++) {
                csvContent += categories[i];
                if (i == 0) {
                    for (var j = 0; j < this.champions.length; j++) {
                        csvContent += "," + this.champions[j];
                    }
                }
                else {
                    for (var k = 0; k < this.champions.length; k++) {
                        csvContent += "," + this.stats[i - 1][k];
                    }
                }
                csvContent += "\n";
            }

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "table.csv");
            link.click();
        }
    }
});
