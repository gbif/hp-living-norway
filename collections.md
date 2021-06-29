---
layout: compose
klass: dataset
permalink: /collections
composition:
- type: pageMarkdown
---



{% for project in site.projects %}
<article class="card" style="margin-bottom: 12px; padding: 12px;">
  <a href="{{project.url}}">
    <h1>{{ project.title }}</h1>
  </a>
  <div>
  {{project.content}}
  </div>
  <a href="{{project.url}}" class="button">Read more</a>
</article>
{% endfor %}

<a href="/collections.json" class="button is-primary">See all projects as JSON dump</a>
<a href="/projects.json" class="button is-primary">See all projects as JSON dump</a>

<h2>{{ site.data.collections.docs_list_title }}</h2>
<h3> All data collections available in the Living Norway Network </h3>
<ul>
   {% for item in site.data.collections.docs %}
      <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>

