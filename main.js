// Main JS file for LoLMatchDataGrabber

const vm = new Vue({
    el: '#app',
    data: {
        roles: ['Top', 'Jungle', 'Mid', 'Bot', 'Support'],
        players: [],
        visible: false,
        link: ''
    },
    methods: {
        pullData: function (event) {
            this.visible = true
        }
    },
    mounted() {

    }
});
