/*
This is just a crude example of what it means to write your own dataset page. This example is not meant to be used as is. It is just to show how you can insert whatever your heart desires.
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const datasetKey = urlParams.get('key')

const datasetArticleElement = document.getElementById('my-custom-dataset');
const datasetTemplate = dataset => `
  <h1>
    ${dataset.title}
  </h1>
  <ul>
  <li><a href="https://www.gbif.org/dataset/${ dataset.key }">View data on GBIF.org</a></li>
  <li><a href="https://www.gbif.org/resource/search?contentType=literature&gbifDatasetKey=${ dataset.key }}">View data on citation tracker</a></li>
</ul>
<div>Download data:</div>
${dataset.endpoints.map(x => `<a href="${x.url}" class="button">${x.type}</a>`).join('')}
  <h2>Abstract</h2>
    <div> ${dataset.project.abstract}</div>
  <h2> Description </h2>
    <div>${dataset.description}</div>
  <h2>Scope</h2>
  <h3>Temporal scope</h3>
  <p>${JSON.stringify(dataset.temporalCoverages)}</p>
  <h3>Geographic scope</h3>
  <p>${JSON.stringify(dataset.geographicCoverages)}</p>
  <h3>Taxonomic scope</h3>
  <ul>
  ${dataset.taxonomicCoverages.map(x => `<li>${JSON.stringify(x)}</li>`)}
  </ul>

`;

if (datasetKey) {
  fetch(`https://api.gbif.org/v1/dataset/${datasetKey}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      datasetArticleElement.innerHTML = datasetTemplate(jsonResponse);
    })
    .catch(function (err) {
      console.log(err);
    });
} else {
  alert('no such dataset found');
}