// Main JS file for LoLMatchDataGrabber

const vm = new Vue({
    el: '#app',
    data: {
        roles: ['Top', 'Jungle', 'Mid', 'Bot', 'Support'],
        players: [],
        stats: [],
        visible: false,
        link: '',
        matchid: ''
    },
    methods: {
        pullData: function (event) {
            this.visible = true
            this.link = document.getElementById("link").value;

            this.players = [];
            this.stats = [];

            //console.log(this.link);
            var arr = this.link.split("/")
            //console.log(arr[6]);

            this.matchid = arr[6];
            //console.log(matchid); // successfully extract matchid from match history link
        
            axios.get('/api', { headers: { matchid: this.matchid }}).then(result => {
                console.log(result.data);

                
            })
        }
    }
});
