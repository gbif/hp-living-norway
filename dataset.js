var app = new Vue({
  el: '#app',
  data: {
    title: '',
    dataset: {},
    map: {},
    occurrences: []
  },
  methods: {
    getDatasetKey() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('key')
    }
  },
  mounted() {
    let key = this.getDatasetKey()
    if (key) {
      let self = this
      axios.get('https://api.gbif.org/v1/dataset/' + key).then(function(response) {
        self.dataset = response.data
      })
    } else {
      alert('no such dataset found');
    }
    
    self.map = L.map('map').setView([63.446827, 10.421906], 4);
    new L.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(self.map)
    new L.TileLayer(
      'https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?datasetKey=b49a2978-0e30-4748-a99f-9301d17ae119&bin=hex&hexPerTile=30&style=green.poly'
    ).addTo(self.map)
    
  }
})