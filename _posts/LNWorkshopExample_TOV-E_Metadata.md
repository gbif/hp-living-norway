TOV-E Bird monitoring sampling data
================

## A Mini-Introduction to R Markdown

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

![](LNWorkshopExample_TOV-E_Metadata_files/figure-gfm/figExample-1.png)<!-- -->

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

<style type="text/css">
span.LNmetadata {
  color: red;
}
</style>

## The Dataset

Metadata must have a dataset tag. We give this tag an ID and it serves
as a parent ID for a lot of other tags that describe the dataset. Often
we don’t want to print any text associated with this tag to the output
so we can therefore set the `isHidden` argument to `TRUE` so that the
tag is invisible in the rendered output. The main purpose of calling
this function is to set an ID for the dataset tag that can be used to
relate other things to it (here we have used the ID ‘TOVEDataset’). In
the dataset function we can also give information on the title to use in
the dataset through the `title.tagText` argument.

<span id="LNdataset_TOVEDataset" class="LNmetadata" style="display:none"/><span id="LNtitle_73c964b5-30c0-4954-8a1e-9c4c88cb842e_TOVEDataset" class="LNmetadata" style="display:none">TOV-E
Bird monitoring sampling data</span>

We can also associate some keywords with the dataset. To do this we can
set up a ‘keywordSet’ tag using the relevant tagging function
<span id="LNkeywordSet_TOVEKeywordSet_TOVEDataset" class="LNmetadata" style="display:none"/>
and then specifying keywords such as
<span id="LNkeyword_980af5d4-25ae-42e9-b177-75ae9ddb7ce7_TOVEKeywordSet" class="LNmetadata">breeding
birds</span> and
<span id="LNkeyword_dcb8c246-30d0-40ac-88b6-742051d7f793_TOVEKeywordSet" class="LNmetadata">sampling
event</span>.

We must also specify some contact information for the individual or
organisation responsible for coordinating with users of the dataset.
Here the responsible user is
<span id="LNcontact_TOVEContact_TOVEDataset" class="LNmetadata"/>
<span id="LNindividualName_550998c8-ac90-4bed-bc45-fc3e028a70a7_TOVEContact" class="LNmetadata"/><span id="LNgivenName_2ba3e30a-68de-4335-9c77-fb755391e306_550998c8-ac90-4bed-bc45-fc3e028a70a7" class="LNmetadata">John
Atle</span>
<span id="LNsurName_7e02847e-3595-4398-a44a-5536023d1910_550998c8-ac90-4bed-bc45-fc3e028a70a7" class="LNmetadata">Kålås</span>.

## Abstract

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

<span id="LNvalue_41285d36-4124-493e-8f2e-e4bae565d3ab_TOVEAbstract" class="LNmetadata" style="display:none" xml:lang="nb">Data
fra prosjektet “Ekstensiv overvåking av hekkefugl (TOV-E)” fra 2006 og
frem til i dag. Prosjektet utføres i samarbeid mellom Norsk Ornitologisk
Forening, Norsk Institutt for Naturforskning og Miljødirektoratet og er
det viktigste prosjektet for å overvåke populasjonstrender for norske
fuglearter på land.</span>

By default, alternative translations are hidden in rendered HTML output.
The information is still there but it is not displayed when being opened
by a browser. This is useful when you want information to be exported to
the EML file but do not to display them in the rendered HTML. If you
would rather the alternative translation be displayed, then you can add
the argument `isHidden=FALSE` to the `LNaddTranslation` function.

## Dataset creators

The dataset was created by the following people:

  - <span id="LNcreator_TOVECreator1_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_02a3d30e-492b-4636-8c16-c9ad82c16d6a_TOVECreator1" class="LNmetadata"/><span id="LNgivenName_fe88400a-cbb7-4b6e-8309-37bbe58b139e_02a3d30e-492b-4636-8c16-c9ad82c16d6a" class="LNmetadata">John
    Atle</span>
    <span id="LNsurName_5b0187d2-3100-4d6f-b5ea-8159484adf97_02a3d30e-492b-4636-8c16-c9ad82c16d6a" class="LNmetadata">Kålås</span>
    who is a
    <span id="LNpositionName_e2aae919-9a81-4c86-8377-7d224920eaac_TOVECreator1" class="LNmetadata">senior
    researcher</span> at the
    <span id="LNorganizationName_b04cb99b-6cd2-44a0-83dd-9c294624780c_TOVECreator1" class="LNmetadata">Norwegian
    Institute for Nature Research</span>
    (<span id="LNelectronicMailAddress_bc4ec9f9-e7cf-4a93-9d99-03fb55a1c3ed_TOVECreator1" class="LNmetadata"><john.kalas@nina.no></span>).
  - <span id="LNcreator_TOVECreator2_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_4f8f51ea-b9db-42a1-af7e-d4a02c97c7e8_TOVECreator2" class="LNmetadata"/><span id="LNgivenName_3b01070b-1dc4-4f8c-8bcd-cbd34c2e235f_4f8f51ea-b9db-42a1-af7e-d4a02c97c7e8" class="LNmetadata">Ingar
    Jostein</span>
    <span id="LNsurName_30744399-fb85-46fd-8a28-e7e4ea6e061a_4f8f51ea-b9db-42a1-af7e-d4a02c97c7e8" class="LNmetadata">Øien</span>
    who is a
    <span id="LNpositionName_5f1bcfcd-de39-4581-a8c0-1b1a2a7a8667_TOVECreator2" class="LNmetadata">fagsjef</span>
    at the
    <span id="LNorganizationName_47db6b93-4b5b-4ea6-baa2-bad53af8debe_TOVECreator2" class="LNmetadata">Norsk
    Ornitologisk Forening</span>
    (<span id="LNelectronicMailAddress_a33e25ba-4a65-4223-97b3-44f8b9417040_TOVECreator2" class="LNmetadata"><ingar@birdlife.no></span>).
  - <span id="LNcreator_TOVECreator3_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_cff14acc-55a0-4555-a4a5-3bfd7d72a069_TOVECreator3" class="LNmetadata"/><span id="LNgivenName_8cdf9c44-75a4-4cb2-96db-0de8899e2379_cff14acc-55a0-4555-a4a5-3bfd7d72a069" class="LNmetadata">Bård</span>
    <span id="LNsurName_c761f6ea-1125-4389-a277-a6122c2bcef4_cff14acc-55a0-4555-a4a5-3bfd7d72a069" class="LNmetadata">Stokke</span>
    who is a
    <span id="LNpositionName_6ab9e4e3-1c3d-40dd-8a96-e7e73a2107b3_TOVECreator3" class="LNmetadata">senior
    researcher</span> at the
    <span id="LNorganizationName_979472b2-4f60-4459-8533-21eaa481574d_TOVECreator3" class="LNmetadata">Norwegian
    Institute for Nature Research</span>
    (<span id="LNelectronicMailAddress_4e5258d1-e8b5-4a8a-82d5-25d2f9433078_TOVECreator3" class="LNmetadata"><bard.stokke@nina.no></span>).
  - <span id="LNcreator_TOVECreator4_TOVEDataset" class="LNmetadata"/><span id="LNindividualName_5d7a5491-da96-4651-b7d6-6e4c815c3f7a_TOVECreator4" class="LNmetadata"/><span id="LNgivenName_89218d29-5d2e-4acc-b5c5-58e2578ee6eb_5d7a5491-da96-4651-b7d6-6e4c815c3f7a" class="LNmetadata">Roald</span>
    <span id="LNsurName_54c0c2ce-7bba-4843-a23f-f917b89568ac_5d7a5491-da96-4651-b7d6-6e4c815c3f7a" class="LNmetadata">Vang</span>
    who is a
    <span id="LNpositionName_06fc7e04-e98b-4c88-8165-4a0f44a927b8_TOVECreator4" class="LNmetadata">data
    manager</span> at the
    <span id="LNorganizationName_1c701273-d5e0-473f-a23a-dd699e600390_TOVECreator4" class="LNmetadata">Norwegian
    Institute for Nature Research</span>
    (<span id="LNelectronicMailAddress_61f68d3a-414c-41ef-9771-27a2b4f81f76_TOVECreator4" class="LNmetadata"><roald.vang@nina.no></span>).
