// Main JS file for LoLMatchDataGrabber

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
                //console.log(data);
                
                // get data for relevant players
                for (var i = 0; i < data.participantIdentities.length; i++) {
                    if (data.participants[i].teamId == this.team)
                        this.players.push(data.participants[i])
                }

                //console.log(this.players)

                for (var i = 0; i < this.players.length; i++) {
                    this.champIDs.push(this.players[i].championId);
                }
                console.log(this.champIDs);

                // console.log(champNameFromID(this.champIDs)); // concept works

            })
        }
    }
});
