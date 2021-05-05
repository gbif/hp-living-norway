var app = new Vue({
  el: '#app',
  data: {
    title: '',
    dataset: {},
    map: {},
    mapBoundingBox: {},
    occurrences: [],
    publishingOrg: {}
  },
  methods: {
    getDatasetKey() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('key')
    }
  },
  computed: {
    getTaxonomicScope () {
      if (this.dataset.taxonomicCoverages != undefined) {
        return this.dataset.taxonomicCoverages[0].description
      }
    },
    getGeographicScope () {
      if (this.dataset.taxonomicCoverages != undefined) {
        return this.dataset.geographicCoverages[0].description
      }
    },
    getPublishingOrgName () {
      return this.publishingOrg.title      
    },
    getPublishingOrgUrl () {
      return this.publishingOrg.description
    }
  },  
  mounted() {
    let key = this.getDatasetKey()
    if (key) {
      let self = this
      axios.get('https://api.gbif.org/v1/dataset/' + key).then(function(response) {
        self.dataset = response.data
        var bounding = self.dataset.geographicCoverages[0].boundingBox
        var bounds = [[bounding.maxLatitude , bounding.maxLongitude], [ bounding.minLatitude , bounding.minLongitude ]];

        self.mapBoundingBox = L.map('map-bounding-box').setView([63.446827, 10.421906], 4);
        new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(self.mapBoundingBox)
        var boundingBox = L.rectangle(bounds, {color: "#ff7800", weight: 1})
        self.mapBoundingBox.addLayer(boundingBox)
        axios.get('https://api.gbif.org/v1/organization/' + self.dataset.publishingOrganizationKey).then(function(response) {
          self.publishingOrg = response.data
        })
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