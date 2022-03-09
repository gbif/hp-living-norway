---
output:
  md_document:
    preserve_yaml: True
    variant: 'markdown\_github'
title: 'TOV-E Bird monitoring sampling data'
background: /assets/images/icon6.png
---

A Mini-Introduction to R Markdown
---------------------------------

Markdown documents are text files that contain a mixture of standard
prose and programming code that can be easily be rendered as HTML or PDF
outputs. During this rendering process, any code blocks are run and the
results embedded in the output document. This can be really useful for
making figures and tables to help describe a data set and to document
analyses. [R markdown](https://rmarkdown.rstudio.com/) is a flavour of
markdown that interfaces with the [R statistical
platform](https://www.r-project.org/).

Code can included in R markdown documents in ‘chunks’ such as the one
shown below:

However, you will only see this code chunk in the original markdown
text. At the top of the code chunk you will see the line `input=FALSE`.
This means that the code is run but that neither the code itself or the
results of the code is printed when rendering the document to HTML or
any other output format. This is useful when you want to set up things
in the background that you don’t want rendered into the document. In
this example the code chunk above calls the libraries that our markdown
document will use so we don’t need to have that code rendered to the
HTML output. We can also make the code chunks print to the rendered
document by removing the `include=FALSE` term. Sometimes, you might only
want the result to be created in the rendered document. For example,
when producing figures, we often do not want the code that produces the
figure in the rendered document, just the figure itself. By setting
`echo=FALSE` in the code chunk options then the code itself will not be
rendered in the output document. For example the code chunk below will
appear as code in the markdown document but will be replaced by a figure
in the rendered document.

![](2021-02-21-TOV-E_Metadata_files/figure-markdown_github/figExample-1.png)

The easiest way to render this document is to open it in
[RStudio](https://www.rstudio.com/) and then click on the ‘Knit’ button
that is in the top left-hand corner. A rendered version of the document
is then opened in a browser.

We can also call R functions ‘inline’. For example in the markdown
version of the document the term: 4 appears as ‘r 2+2’ but, in the
rendered version, R is called and the calculation is performed. The
statement is then replaced by the output (in this case ‘4’). A full
introduction to R markdown is beyond the scope of this document but
there are number of [great
resources](https://bookdown.org/yihui/rmarkdown/) to learn more.

When using markdown to describe the metadata of the project we can use a
number of functions described in the Living Norway package to help flag
sections of text that we want to export as information to appear in an
EML file. The code chunk below will allow you to see flagged sections of
text being rendered in a red colour in HTML output. For normal
descriptions of metadata you would not want this so you should delete
this code chunk for your own metadata descriptions.

``` css
span.LNmetadata {
  color: red;
}
```

The Dataset
-----------

Metadata must have a dataset tag. We give this tag an ID and it serves
as a parent ID for a lot of other tags that describe the dataset. Often
we don’t want to print any text associated with this tag to the output
so we can therefore set the `isHidden` argument to `TRUE` so that the
tag is invisible in the rendered output. The main purpose of calling
this function is to set an ID for the dataset tag that can be used to
relate other things to it (here we have used the ID ‘TOVEDataset’). In
the dataset function we can also give information on the title to use in
the dataset through the `title.tagText` argument.

<span id="LNdataset_TOVEDataset" class="LNmetadata" style="display:none"/><span
id="LNtitle_77dd0094-9ffa-404b-9c88-732587d0e9f8_TOVEDataset"
class="LNmetadata" style="display:none">TOV-E Bird monitoring sampling
data</span>

We can also associate some keywords with the dataset. To do this we can
set up a ‘keywordSet’ tag using the relevant tagging function
<span id="LNkeywordSet_TOVEKeywordSet_TOVEDataset" class="LNmetadata" style="display:none"/>
and then specifying keywords such as <span
id="LNkeyword_b9a04fa8-a311-4dd0-aca3-9e1228c99934_TOVEKeywordSet"
class="LNmetadata">breeding birds</span> and <span
id="LNkeyword_7982ece8-0a9a-4f2b-99da-dd585a8bb83b_TOVEKeywordSet"
class="LNmetadata">sampling event</span>.

We must also specify some contact information for the individual or
organisation responsible for coordinating with users of the dataset.
Here the responsible user is
<span id="LNcontact_TOVEContact_TOVEDataset" class="LNmetadata"/>
<span id="LNindividualName_ae593dc1-9e84-4643-93c4-e9043c9fc8f4_TOVEContact" class="LNmetadata"/><span
id="LNgivenName_63e17bb2-b02b-41be-ac4c-ea1a4d236e76_ae593dc1-9e84-4643-93c4-e9043c9fc8f4"
class="LNmetadata">John Atle</span> <span
id="LNsurName_5539ee09-8f95-4231-a627-2679a84b9152_ae593dc1-9e84-4643-93c4-e9043c9fc8f4"
class="LNmetadata">Kålås</span>.

Abstract
--------

We will need to produce an abstract for the data. You can flag the
abstract for export to EML using the following inline code:

<span id="LNabstract_TOVEAbstract_TOVEDataset" class="LNmetadata">Data
from the project: “Extensive monitoring of breeding birds (TOV-E)” from
2006 up until today. The project is carried out in cooperation between
NOF BirdLife Norway, Norwegian Institute for Nature Research (NINA) and
Norwegian Environment Agency, and is the most important project for
monitoring population trends for Norwegian bird species on land.</span>

The Living Norway package will also allow for alternative translations
of EML elements. In the inline code above we set the tagID argument. We
can provide an alternative translation for the element with that tagID
using the following code:

<span id="LNvalue_498d298b-fed7-4ae0-9009-5fad4188b9b7_TOVEAbstract"
class="LNmetadata" style="display:none" xml:lang="nb">Data fra
prosjektet “Ekstensiv overvåking av hekkefugl (TOV-E)” fra 2006 og frem
til i dag. Prosjektet utføres i samarbeid mellom Norsk Ornitologisk
Forening, Norsk Institutt for Naturforskning og Miljødirektoratet og er
det viktigste prosjektet for å overvåke populasjonstrender for norske
fuglearter på land.</span>

By default, alternative translations are hidden in rendered HTML output.
The information is still there but it is not displayed when being opened
by a browser. This is useful when you want information to be exported to
the EML file but do not to display them in the rendered HTML. If you
would rather the alternative translation be displayed, then you can add
the argument `isHidden=FALSE` to the `LNaddTranslation` function.

Dataset creators
----------------

The dataset was created by the following people:

-   <span id="LNcreator_TOVECreator1_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_d4c906e7-285b-4b01-8415-a7c8fa67ce98_TOVECreator1" class="LNmetadata"/><span
    id="LNgivenName_ec76137e-e542-4537-88a8-40e85d2af089_d4c906e7-285b-4b01-8415-a7c8fa67ce98"
    class="LNmetadata">John Atle</span> <span
    id="LNsurName_ac92c89f-ad6d-4704-8f19-e96440decb89_d4c906e7-285b-4b01-8415-a7c8fa67ce98"
    class="LNmetadata">Kålås</span> who is a <span
    id="LNpositionName_3beb029d-c7f3-4780-bbb6-e95e1ae90645_TOVECreator1"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_02717e55-63fe-425a-9039-b860c0300656_TOVECreator1"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_52c3d225-7da2-4626-bdae-04c817a6e23c_TOVECreator1"
    class="LNmetadata"><a href="mailto:john.kalas@nina.no" class="email">john.kalas@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator2_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_1349e2ee-9740-42b9-b6df-d0f981c2023a_TOVECreator2" class="LNmetadata"/><span
    id="LNgivenName_b8eb1880-cd24-4ac3-94e9-688c71189394_1349e2ee-9740-42b9-b6df-d0f981c2023a"
    class="LNmetadata">Ingar Jostein</span> <span
    id="LNsurName_4aff5502-57a2-4c31-ac90-0205d7c6e542_1349e2ee-9740-42b9-b6df-d0f981c2023a"
    class="LNmetadata">Øien</span> who is a <span
    id="LNpositionName_6179b710-7734-42f5-9a7f-7e5a37a9647f_TOVECreator2"
    class="LNmetadata">fagsjef</span> at the <span
    id="LNorganizationName_7dff0121-4004-47b0-9366-b126fd18e5cf_TOVECreator2"
    class="LNmetadata">Norsk Ornitologisk Forening</span> (<span
    id="LNelectronicMailAddress_2b726c70-12be-4348-9287-496461acdb28_TOVECreator2"
    class="LNmetadata"><a href="mailto:ingar@birdlife.no" class="email">ingar@birdlife.no</a></span>).
-   <span id="LNcreator_TOVECreator3_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_e1ff49c1-9e65-4e49-b6ce-316fe9aeaf03_TOVECreator3" class="LNmetadata"/><span
    id="LNgivenName_cbcd375d-76b5-4053-85a2-08b0440a2616_e1ff49c1-9e65-4e49-b6ce-316fe9aeaf03"
    class="LNmetadata">Bård</span> <span
    id="LNsurName_235833fa-3b74-4622-9c39-30df5ec5762c_e1ff49c1-9e65-4e49-b6ce-316fe9aeaf03"
    class="LNmetadata">Stokke</span> who is a <span
    id="LNpositionName_a4455f8e-38a6-4160-b730-8f97d5875b58_TOVECreator3"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_52668ffb-77a6-433d-8560-cc25af609570_TOVECreator3"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_e665c49f-c647-4208-8060-75809ff26f14_TOVECreator3"
    class="LNmetadata"><a href="mailto:bard.stokke@nina.no" class="email">bard.stokke@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator4_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_40b7b89a-e3c9-4c44-818f-8cde22f59b03_TOVECreator4" class="LNmetadata"/><span
    id="LNgivenName_4c8b70f0-72c1-415b-96a8-446df0ab75c2_40b7b89a-e3c9-4c44-818f-8cde22f59b03"
    class="LNmetadata">Roald</span> <span
    id="LNsurName_c8f4f964-ce7c-4d0f-a149-dc060e38cda0_40b7b89a-e3c9-4c44-818f-8cde22f59b03"
    class="LNmetadata">Vang</span> who is a <span
    id="LNpositionName_adff8775-044a-4735-92f6-117df6c2d71a_TOVECreator4"
    class="LNmetadata">data manager</span> at the <span
    id="LNorganizationName_16f85905-7bb1-44e6-8a9a-caadf8bc1248_TOVECreator4"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_7677688f-75c3-4678-9abc-f180ed9bc310_TOVECreator4"
    class="LNmetadata"><a href="mailto:roald.vang@nina.no" class="email">roald.vang@nina.no</a></span>).
