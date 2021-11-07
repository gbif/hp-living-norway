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

![](LNWorkshopExample_TOV-E_Metadata_files/figure-markdown_strict/figExample-1.png)

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

    span.LNmetadata {
      color: red;
    }

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
id="LNtitle_666c08ed-e005-4d90-8baf-7e627d5932c3_TOVEDataset"
class="LNmetadata" style="display:none">TOV-E Bird monitoring sampling
data</span>

We can also associate some keywords with the dataset. To do this we can
set up a ‘keywordSet’ tag using the relevant tagging function
<span id="LNkeywordSet_TOVEKeywordSet_TOVEDataset" class="LNmetadata" style="display:none"/>
and then specifying keywords such as <span
id="LNkeyword_d73b5e60-facb-4c7b-8f1a-f671cec8a9f6_TOVEKeywordSet"
class="LNmetadata">breeding birds</span> and <span
id="LNkeyword_453a3f0e-fb03-4472-b96b-a08934c43267_TOVEKeywordSet"
class="LNmetadata">sampling event</span>.

We must also specify some contact information for the individual or
organisation responsible for coordinating with users of the dataset.
Here the responsible user is
<span id="LNcontact_TOVEContact_TOVEDataset" class="LNmetadata"/>
<span id="LNindividualName_649e2fb4-6a92-4c00-9f0c-83c60a66ecb8_TOVEContact" class="LNmetadata"/><span
id="LNgivenName_0e96e975-a733-436b-927c-264b27cb68eb_649e2fb4-6a92-4c00-9f0c-83c60a66ecb8"
class="LNmetadata">John Atle</span> <span
id="LNsurName_0331fb4a-0d1e-40ff-b15b-f634b78888f0_649e2fb4-6a92-4c00-9f0c-83c60a66ecb8"
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

<span id="LNvalue_6e684fe6-08bd-4a29-92e2-4f9209d09cff_TOVEAbstract"
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

-   <span id="LNcreator_TOVECreator1_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_2fd1388a-8c42-4b04-85ec-1fc4e37962fa_TOVECreator1" class="LNmetadata"/><span
    id="LNgivenName_2c1e5972-b161-48db-8625-b67a290d50b7_2fd1388a-8c42-4b04-85ec-1fc4e37962fa"
    class="LNmetadata">John Atle</span> <span
    id="LNsurName_d1dcaca4-d8a7-4f61-a8d0-7c2fbf0bea33_2fd1388a-8c42-4b04-85ec-1fc4e37962fa"
    class="LNmetadata">Kålås</span> who is a <span
    id="LNpositionName_45ec6707-f6ac-4d1b-90fd-668009d8a006_TOVECreator1"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_76920d2d-948d-4ea2-83c6-2f2625594916_TOVECreator1"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_456191fa-c13d-45bc-9d0e-0c0450523c9d_TOVECreator1"
    class="LNmetadata"><a href="mailto:john.kalas@nina.no" class="email">john.kalas@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator2_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_7f23a0ac-4440-4a4c-a6ae-3ca088eef566_TOVECreator2" class="LNmetadata"/><span
    id="LNgivenName_c9da4c8d-fca9-4d90-ba5e-b65a87904d9e_7f23a0ac-4440-4a4c-a6ae-3ca088eef566"
    class="LNmetadata">Ingar Jostein</span> <span
    id="LNsurName_c3d6abb9-d7d7-4b0f-a5a7-7d7663fcb83e_7f23a0ac-4440-4a4c-a6ae-3ca088eef566"
    class="LNmetadata">Øien</span> who is a <span
    id="LNpositionName_de9688d3-88f5-4180-8d0f-6130b4ecf675_TOVECreator2"
    class="LNmetadata">fagsjef</span> at the <span
    id="LNorganizationName_f6cdc1ea-1d48-4d14-bdd6-8fcebb758dee_TOVECreator2"
    class="LNmetadata">Norsk Ornitologisk Forening</span> (<span
    id="LNelectronicMailAddress_58076436-2f05-4a9f-95b2-8b667be27609_TOVECreator2"
    class="LNmetadata"><a href="mailto:ingar@birdlife.no" class="email">ingar@birdlife.no</a></span>).
-   <span id="LNcreator_TOVECreator3_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_61a84832-5c81-4745-813c-8f1e2051b9f4_TOVECreator3" class="LNmetadata"/><span
    id="LNgivenName_477741ab-ef20-4c30-a2cc-c76ce21fb7a1_61a84832-5c81-4745-813c-8f1e2051b9f4"
    class="LNmetadata">Bård</span> <span
    id="LNsurName_6a77d351-2af1-4aa8-95d8-9d7624396615_61a84832-5c81-4745-813c-8f1e2051b9f4"
    class="LNmetadata">Stokke</span> who is a <span
    id="LNpositionName_7d7d157a-93d7-4bbd-b0c3-12b80c8627c9_TOVECreator3"
    class="LNmetadata">senior researcher</span> at the <span
    id="LNorganizationName_3c87f884-1ddc-4b7f-8ce4-de8a769e1b17_TOVECreator3"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_7509833d-0ee0-4401-a325-01984034b13f_TOVECreator3"
    class="LNmetadata"><a href="mailto:bard.stokke@nina.no" class="email">bard.stokke@nina.no</a></span>).
-   <span id="LNcreator_TOVECreator4_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_60ddfe37-11b4-4cfd-9f14-afba11f5c208_TOVECreator4" class="LNmetadata"/><span
    id="LNgivenName_6d8e9088-43dc-498c-b823-cf77ac78c5e1_60ddfe37-11b4-4cfd-9f14-afba11f5c208"
    class="LNmetadata">Roald</span> <span
    id="LNsurName_2d266926-2b7d-4515-ac01-e88ec417c58a_60ddfe37-11b4-4cfd-9f14-afba11f5c208"
    class="LNmetadata">Vang</span> who is a <span
    id="LNpositionName_eb9649b9-e3ea-475e-9c30-d510ac8fc08b_TOVECreator4"
    class="LNmetadata">data manager</span> at the <span
    id="LNorganizationName_9c49017c-e85b-4d72-9928-f47b06ae8ce1_TOVECreator4"
    class="LNmetadata">Norwegian Institute for Nature Research</span>
    (<span
    id="LNelectronicMailAddress_9db8d716-643f-40ad-b69b-d8114b0a3062_TOVECreator4"
    class="LNmetadata"><a href="mailto:roald.vang@nina.no" class="email">roald.vang@nina.no</a></span>).
