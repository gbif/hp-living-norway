

 const datasetListElement = document.getElementById('my-datasets');
 const datasetTemplate = datasets => `
  <ul>
  ${datasets.results.map(x => `<li><a href="dataset?key=${x.key}">${x.title}</a></li>`).join('')}
  </ul>
 `;

 var datasetTemp = function(datasets) {
  `
  <div>${JSON.stringify(datasets)}</div>
  <ul>
  
  ${datasets.results.map(x => `<li><a href="dataset.html?key=${x.key}">${x.title}</a></li>`)}
  </ul>
 `
 };


fetch(`https://api.gbif.org/v1/network/379a0de5-f377-4661-9a30-33dd844e7b9a/constituents`)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonResponse) {
    datasetListElement.innerHTML = datasetTemplate(jsonResponse);
    
  })
  .catch(function (err) {
    console.log(err);
  });
