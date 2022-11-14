addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function gbifQuery(query, variables) {
  return fetch('https://graphql.gbif.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    })
  })
}

/**
 * Many more examples available at:
 *   https://developers.cloudflare.com/workers/examples
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname == "/literature") {
    // https://github.com/gbif/content-crawler/issues/46
    const MAX_LIMIT = 2**31-1;

    datasets = await (await gbifQuery(`{ 
      datasetSearch(networkKey: "379a0de5-f377-4661-9a30-33dd844e7b9a", limit: ${MAX_LIMIT}) {
        results {
            key
        }
      }
    }`)).json();
    documents = await (await gbifQuery(`
      query($keys: [ID]){
        literatureSearch(gbifDatasetKey: $keys) {
          documents { total }
        }
      }`,
      {
        keys: datasets.data.datasetSearch.results.map(d => d.key),
      },
    )).json();
    return new Response(JSON.stringify({
        count: documents.data.literatureSearch.documents.total,
      }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
       }
    });
  }
 
  return fetch("https://livingnorway.no/");
}
