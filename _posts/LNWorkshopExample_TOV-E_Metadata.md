---
output:
  md_document:
    preserve_yaml: True
    variant: 'markdown\_github'
title: 'TOV-E Bird monitoring sampling data'
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

![](LNWorkshopExample_TOV-E_Metadata_files/figure-markdown_github/figExample-1.png)

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
id="LNtitle_430aaf38-4668-48ae-a60b-61194ec2dfa1_TOVEDataset"
class="LNmetadata" style="display:none">TOV-E Bird monitoring sampling
data</span>

We can also associate some keywords with the dataset. To do this we can
set up a ‘keywordSet’ tag using the relevant tagging function
<span id="LNkeywordSet_TOVEKeywordSet_TOVEDataset" class="LNmetadata" style="display:none"/>
and then specifying keywords such as <span
id="LNkeyword_80815030-b0b8-4c09-b573-909ea0b6edc2_TOVEKeywordSet"
class="LNmetadata">breeding birds</span> and <span
id="LNkeyword_eedcfbc1-02b2-4fe2-b700-8660bd168fac_TOVEKeywordSet"
class="LNmetadata">sampling event</span>.

We must also specify some contact information for the individual or
organisation responsible for coordinating with users of the dataset.
Here the responsible user is
<span id="LNcontact_TOVEContact_TOVEDataset" class="LNmetadata"/>
<span id="LNindividualName_723bfaf9-c4b9-4ee6-9d1a-ec11d6b70f35_TOVEContact" class="LNmetadata"/><span
id="LNgivenName_23310802-5fed-4fd1-addb-1212abdf76c8_723bfaf9-c4b9-4ee6-9d1a-ec11d6b70f35"
class="LNmetadata">John Atle</span> <span
id="LNsurName_617a4fc4-ba45-44d1-bc64-ce99944a28bb_723bfaf9-c4b9-4ee6-9d1a-ec11d6b70f35"
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

<span id="LNvalue_2a505b55-742b-4a4d-bc1c-78f40332337e_TOVEAbstract"
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

-   <span id="LNcreator_TOVECreator1_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_5faebd95-0607-499f-8e8c-7307205f830a_TOVECreator1" class="LNmetadata"/><span
    id="LNgivenName_8c4b35d0-4a24-4bce-a2c7-a7da9e4db563_5faebd95-0607-499f-8e8c-7307205f830a"
    class="LNmetadata">John Atle</span> <span
    id="LNsurName_f0846c51-c3a6-4aae-babf-38582077b32c_5faebd95-0607-499f-8e8c-7307205f830a"
    class="LNmetadata">Kålås</span> who is a <span
    id="LNpositionName_7baad281-a242-4f50-ab4f-4ce73e9bf145_TOVECreator1"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_80195b26-2d7d-47bc-8fa5-ab41a8da878f_TOVECreator1"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_b4e780ca-fc28-4522-b111-4f74438f3a79_TOVECreator1"
    class="LNmetadata"><a href="mailto:john.kalas@nina.no" class="email">john.kalas@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator2_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_ca219847-bc18-4a2d-b397-7df58f3f1d8c_TOVECreator2" class="LNmetadata"/><span
    id="LNgivenName_a99e950e-5722-4536-a5cf-d5b4b3488535_ca219847-bc18-4a2d-b397-7df58f3f1d8c"
    class="LNmetadata">Ingar Jostein</span> <span
    id="LNsurName_06e796b7-8231-442c-a8bf-8ba5ae97b75c_ca219847-bc18-4a2d-b397-7df58f3f1d8c"
    class="LNmetadata">Øien</span> who is a <span
    id="LNpositionName_9bbe6f92-0881-4e72-8694-395c1c19642b_TOVECreator2"
    class="LNmetadata">fagsjef</span> at the <span
    id="LNorganizationName_9ca60b44-2c2e-491f-9873-29b8efe09279_TOVECreator2"
    class="LNmetadata">Norsk Ornitologisk Forening</span> (<span
    id="LNelectronicMailAddress_b357eef6-1a79-4bf1-8a65-a080aff1d788_TOVECreator2"
    class="LNmetadata"><a href="mailto:ingar@birdlife.no" class="email">ingar@birdlife.no</a></span>).
-   <span id="LNcreator_TOVECreator3_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_8f301e3b-348b-4641-a09c-b7482312c817_TOVECreator3" class="LNmetadata"/><span
    id="LNgivenName_5cbbd631-0f4a-4afb-bdb7-2bbbfab755a1_8f301e3b-348b-4641-a09c-b7482312c817"
    class="LNmetadata">Bård</span> <span
    id="LNsurName_c16cbf95-4bed-4dc5-9589-1fc0703bbbc6_8f301e3b-348b-4641-a09c-b7482312c817"
    class="LNmetadata">Stokke</span> who is a <span
    id="LNpositionName_eb4e3d8a-3ccb-406d-9f15-2f6073cfcfae_TOVECreator3"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_cec7bf66-9a94-43d8-98da-67acb176ccdd_TOVECreator3"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_405aae76-d2bb-4fce-856e-d8ff8dbb55b6_TOVECreator3"
    class="LNmetadata"><a href="mailto:bard.stokke@nina.no" class="email">bard.stokke@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator4_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_6e3355f7-5f04-44a2-ac92-70b82018d433_TOVECreator4" class="LNmetadata"/><span
    id="LNgivenName_031d84cc-9739-440b-887b-d17ae08a2916_6e3355f7-5f04-44a2-ac92-70b82018d433"
    class="LNmetadata">Roald</span> <span
    id="LNsurName_2e5de18f-3aca-473e-b48e-20dff70bd81f_6e3355f7-5f04-44a2-ac92-70b82018d433"
    class="LNmetadata">Vang</span> who is a <span
    id="LNpositionName_7e293fdf-8d88-475f-9e19-9610b4c1e164_TOVECreator4"
    class="LNmetadata">data manager</span> at the <span
    id="LNorganizationName_1b1373c0-ea1f-4dca-b33f-c116cb942bc9_TOVECreator4"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_4d2fa856-ea0f-4d2e-8ca4-aa54f4e36581_TOVECreator4"
    class="LNmetadata"><a href="mailto:roald.vang@nina.no" class="email">roald.vang@nina.no</a></span>).
