var app = new Vue({
  el: '#app',
  data: {
    title: '',
    datasets: [],
    description: 'Here will the description be',
   
  },
  methods: {
    getKeyword() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('keyword')
    },
    
  },
  computed: {
  },  
  mounted() {
    let keyword = this.getKeyword()
    
    if (keyword) {
      let self = this
      self.title = keyword
      axios.get('https://api.gbif.org/v1/dataset/search?keyword=' + keyword).then(function(response) {
        self.datasets = response.data.results
      })
    } else {
      alert('no such dataset found');
    }

    
  }
})