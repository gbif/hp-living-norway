---
layout: compose
klass: dataset
permalink: /collections
composition:
- type: pageMarkdown
---






<h2>{{ site.data.collections.docs_list_title }}</h2>
<h3> All data collections available in the Living Norway Network </h3>
<ul>
   {% for item in site.data.collections.docs %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
   {% endfor %}
</ul>
