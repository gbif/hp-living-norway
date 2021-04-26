---
layout: compose
klass: dataset
permalink: /MDdatasets
composition:
- type: pageMarkdown
---

<div id="app">
<h1>Available datasets</h1>
<table class="table is-fullwidth is-bordered is-striped">
  <thead>
    <tr>
      <th>Title</th>
      <th>Doi</th>
      <th>Type</th>
      <th>Produced by</th>
    </tr>
  </thead>
  
  <tbody>
    <tr v-for="dataset in datasets" :key="dataset.key">     
      <td><a v-bind:href="'dataset?key='+ dataset.key">{{ dataset.title }}</a></td>
      <td>{{ dataset.doi }}</td>
      <td>{{ dataset.type }}</td>
      <td>{{ dataset.hostingOrganizationTitle }}</td>
    </tr>
  </tbody>
</table>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script src="custom-datasets.js">
