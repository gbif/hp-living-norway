const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get('keyword')

const collectionHeader = document.getElementById('my-collection-header');
const collectionElement = document.getElementById('my-collection');
const collectionTemplate = collections => `
  <ul>
  ${collections.results.map(x => `<li><a href="dataset?key=${x.key}">${x.title}</a></li>`).join('')}
  </ul>
 `;

 

if (keyword) {
  fetch(`https://api.gbif.org/v1/dataset/search?keyword=${keyword}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      collectionElement.innerHTML = collectionTemplate(jsonResponse);
      collectionHeader.innerHTML = keyword
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  alert('no such dataset found');
}