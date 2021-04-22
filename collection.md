---
layout: compose
klass: dataset
permalink: /collection
composition:
- type: pageMarkdown
---

<div id="app" >

<h1 class="is-size-1" v-text="title"></h1>
<template v-text="title"></template>
<ul>
  <li v-for="dataset in datasets" :key="dataset.key">
    <a v-bind:href="'dataset?key='+ dataset.key">{{ dataset.title }}</a>
  </li>
 </ul>
</div>

<!-- <script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css">
<script src="custom-collection.js"></script>



