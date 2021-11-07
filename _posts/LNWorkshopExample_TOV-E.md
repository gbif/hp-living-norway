What is Darwin Core?
--------------------

Darwin Core can best be thought of as a set of terms for describing
information about biodiversity data that are given special significance
so that their meaning is comparable between different data sets. Every
data set in the ecological science is unique and every one will have
some features about it that will require some explanation when providing
this data to other parties. The Darwin Core standard is a way of
describing features of your data set using a controlled vocabulary such
that when you talk about feature ‘x’ in your data set, that this ‘x’ can
be understood to mean a particular well-defined and standardised thing.
Darwin Core is not the only standard used for the description of
biological data, there are plenty of others and many, including Darwin
Core itself, are maintained by working groups associated with
[TDWG](https://www.tdwg.org/) a Biodiversity Information Standards
voluntary organization (formally called the Taxonomic Databases Working
Group). Darwin Core is the standard that forms the basis for the [Global
Biodiversity Information Facility](https://www.gbif.org/) and, for many
researchers, GBIF will represent the most common way to make their data
findable and sharable with the wider community.

Darwin Core Archive Files
-------------------------

The Darwin Core standard itself should not be confused with Darwin Core
*archive files*. Darwin Core archive files are a file format type that
bundles together data and the metadata describing said data into one
package. The data in these archive files are described according to
Darwin Core standards (hence the name) and, as a result, represent a
convenient standards-compliant format for sharing biodiversity data
according to [FAIR](https://www.go-fair.org/fair-principles/)
principles. Darwin Core archive files are the preferred method of
publishing data in GBIF and a full how-to guide to producing Darwin core
files can be found on the [GBIF Integrated Publishing Toolkit
website](https://ipt.gbif.org/manual/en/ipt/2.5/dwca-guide#publishing-dwc-a-manually).
However, this document will demonstrate ways to both generate your own
Darwin Core archive files an existing data set or importing data from an
existing Darwin core archive file using an alternative solution provided
by the [Living Norway R
package](https://github.com/LivingNorway/LivingNorwayR).

Darwin core archive files are simply a
[ZIP](https://en.wikipedia.org/wiki/ZIP_(file_format)) folder with a
specific set of files inside:

-   **Metafile** The metafile is a file that describes what files exist
    in the Dawin Core archive file and how the columns in the data files
    map to Darwin Core terms. This file format follows an XML schema
    described in the [Darwin Core text
    guide](https://dwc.tdwg.org/text/). Whilst it is possible to create
    this file yourself, there are a number of packages that can help
    users construct this file. The most commonly used program is the
    [Integrated Publishing Toolkit (IPT)](https://www.gbif.org/ipt).
    Another way to automatically generate the metafile is through the
    use of the Living Norway package for the [R statistical
    platform](https://www.r-project.org/) when processing your data
    sets. Later in this document we will guide you through the process
    of creating a Darwin Core archive file from a set of data tables.

-   **Resource metadata** This file contains the metadata about the data
    set but structured according to known standards. For example, it may
    include things such as a description of the purpose of the study,
    the sampling methodology used in the study, and license under which
    the data can be shared. The format of this file is a flavour of XML,
    known as [Ecological Metadata Language
    (EML)](https://eml.ecoinformatics.org/), developed specifically for
    the handling of metadata in ecological data sets. As with the
    metafile, there are a number of packages that can be used to help
    you produce syntactically valid EML. When publishing data through
    the [IPT](https://www.gbif.org/ipt), there are a number of
    user-friendly prompts to provide the information for the creation of
    the resource metadata. Later in this document we will demsonstrate
    how to generate valid EML from a markdown document that can also
    serve as a data paper to document the data set.

-   **Data files** These are a collection of files that contain the
    data. The format of this data is expected to be in a text-based
    delimited format such as [comma-seperated values
    (CSV)](https://en.wikipedia.org/wiki/Comma-separated_values) or
    [tab-seperated
    values](https://en.wikipedia.org/wiki/Tab-separated_values).
    Information such as the encoding of the text and the type of
    delimiter used in the data files is often stored in the metafile.
    The first line of the data files may contain column headings.

    -   *Core data file* Every Darwin Core archive needs exactly one
        core data file. This is the main data table of the dataset and
        serves as the definition of the reference sampling unit for the
        data set. One column of the core data file must be an ID column
        with each row of that column containing a unique ID code for the
        record (unique to the dataset): this ID code will serve as a
        reference code for any extension data files included in the
        archive. Data being published to GBIF can have core data files
        that belong to one the following types:

        -   [Sample event
            data](https://ipt.gbif.org/manual/en/ipt/2.5/best-practices-sampling-event-data)
            corresponds to data that have been collected according to a
            defined protocol or experimental design at particular times
            or locations. Here the data set is built around a series of
            sampling events at which measurements are recorded.
        -   [Occurrence
            data](https://ipt.gbif.org/manual/en/ipt/2.5/occurrence-data)
            correspoinds to sightings or records of species (or other
            taxon level) that can been assigned to a location or time
            period. This data type is best used when the data set is a
            series of sightings or records from a collection strategy
            that is not systemic or unknown. Observations from citizen
            science projects or from digitized museum records often fit
            this data type.
        -   [Species checklist
            data](https://ipt.gbif.org/manual/en/ipt/2.5/checklist-data)
            corresponds to a list of named species (or other taxon
            level) that represent a catolgue for some purpose. This
            could for example be a list of species of particular
            conservation for a particular area or a list of potential
            invasive species.

    -   *Extension data files* A Darwin Core archive file may optionally
        have any number of data tables that may contain additional
        information to extend the information in the core data file. For
        example, in a Darwin Core archive with an event-based core data
        file, we might also have an accompanying data table that
        describes the number of individuals of each species found at
        each of the sampling events. Like the core data file, each
        extension data table must contain one column that represents an
        ID column. Unlike the core data table type however, the
        extension ID columns refer to the IDs in the core data table
        that the extension data table rows are providing information
        about. The ID values in the ID column of the extension data
        tables do not therefore need to be unique because multiple rows
        in an extension table may be referring to a single entry in the
        core data table. In the example described above, multiple
        species may have been recorded at the same sampling event, and
        the extension data table will therefore contain multiple rows
        (one for each of the species recorded) each containig the ID for
        the relevant sampling event in the ID column of the extension
        data table. For data being submitted to publication to GBIF,
        extension data tables must belong to one of the [supported
        extension
        types](https://tools.gbif.org/dwca-validator/extensions.do).

To make it easier to both create and manipulate the contents of Darwin
Core archive files, the Living Norway package provides a number of
functions and tools for data managers and researchers. The aim of the
package and this documentation is to provide a more approachable
interface to producing Darwin Core archives without requiring extensive
knowledge of both the Darwin Core standard and EML such that the
dissemination of data to meet FAIR standards can be more easily
integrated into a researcher’s workflow.

![Structure of a Darwin Core archive file](images/DwCArchiveSchema.png)

The Living Norway R Package
---------------------------

Before we can use any of the functions contained within the Living
Norway package we must first install it. At the current time the easiest
way to install the Living Norway package is to import the
[devtools](https://cran.r-project.org/web/packages/devtools/index.html)
package and use the “install\_github” function to install the package
directly from the project’s [GitHub
repository](https://github.com/LivingNorway/LivingNorwayR). We hope to
distribute future releases of the Living Norway package over
[CRAN](https://cran.r-project.org/) and, once this is achieved, then
installation of the Living Norway package will follow that standard R
package installation procedure. In the meantime, the following code will
install the necessary packages:

    # Install the Living Norway package from the Git repository
    #devtools::install_github("https://github.com/LivingNorway/LivingNorwayR")
    # Import the tools into R
    library(LivingNorwayR)

Once the Living Norway package is installed and loaded, a number of
classes are added to R that allow for the easier manipulation of Darwin
Core archive data and the terms associated with them. What do we mean by
‘classes’? All variables in R belong to a particular class of object.
You will already be familiar with some R’s base classes that can used
for the handling of information such as data frames, lists, and vectors.
The Living Norway package simply contains more class definitions that
allow for easier manipulation of the information in Darwin Core archive
files:

-   **DwCTerm** Is a class that contains information about terms used in
    the Darwin Core standard. Nearly all users of the Living Norway
    package will never need to create their own terms objects and, for
    the most part, only interact with terms objects that have been
    pre-defined from their description in the Darwin Core standard.
-   **DwCGeneric** Is a class that the contains the information in the
    Darwin Core archive data tables but also defines the link between
    columns in data tables to registered Darwin Core terms. Most users
    will not use this class directly but will use one of the derived
    classes that are specialised for particular data table types
    supported by GBIF. The naming convention for these classes is ‘GBIF’
    followed by the GBIF class name (for example, the GBIF
    implementation of the Event core data table class type is provided
    by the ‘GBIFEvent’ class).
-   **DwCMetadata** This is a class for handling metadata relating the
    dataset. It allows for the easier import and export of EML files and
    also allows for the creation of EML files from other file formats
    such as R markdown files. This will described in greater detail
    later in this document.
-   **DwCArchive** This class contains an object of a DwCGeneric-dervied
    class for each of the data tables in a Darwin Core archive (one core
    file plus any number of extension tables) in addition to a
    DwCMetadata object containing the metadata describing the data
    tables. The class contains a number of helper functions for
    importing and exporting data from Darwin Core archive files.

The event core table type is supported by the ‘GBIFEvent’ class in the
Living Norway package. Similarly the the occurrence core table type is
supported by the ‘GBIFOccurrence’ class and the species checklist core
table type is supported by the ‘GBIFTaxon’ class. The
‘getGBIFCoreClasses()’ returns a full list of the GBIF core classes
handled by the Living Norway R package along with their definition
information (represented as ‘DwCTerms’ objects):

    getGBIFCoreClasses()

    ## $GBIFEvent
    ## http://rs.tdwg.org/dwc/terms/Event - Event
    ## An action that occurs at some location during some time.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/Event
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/Event-2018-09-06
    ##  Type: Class
    ##  Date modified: 2018-09-06
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      A specimen collection process. A camera trap image capture.  A marine trawl.
    ##  Miscellaneous information:
    ##      DataSets/DataSet/Units/Unit/Gathering
    ## 
    ## $GBIFOccurrence
    ## http://rs.tdwg.org/dwc/terms/Occurrence - Occurrence
    ## An existence of an Organism (sensu http://rs.tdwg.org/dwc/terms/Organism) at a particular place at a particular time.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/Occurrence
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/Occurrence-2020-08-20
    ##  Type: Class
    ##  Date modified: 2020-08-20
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      A wolf pack on the shore of Kluane Lake in 1988. A virus in a plant leaf in the New York Botanical Garden at 15:29 on 2014-10-23. A fungus in Central Park in the summer of 1929.
    ##  Miscellaneous information:
    ##      DataSets/DataSet/Units/Unit
    ## 
    ## $GBIFTaxon
    ## http://rs.tdwg.org/dwc/terms/Taxon - Taxon
    ## A group of organisms (sensu http://purl.obolibrary.org/obo/OBI_0100026) considered by taxonomists to form a homogeneous unit.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/Taxon
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/Taxon-2018-09-06
    ##  Type: Class
    ##  Date modified: 2018-09-06
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      The genus Truncorotaloides as published by Brönnimann et al. in 1953 in the Journal of Paleontology Vol. 27(6) p. 817-820.
    ##  Miscellaneous information:
    ##      no simple equivalent in ABCD

The Living Norway packages also supports a large number of classes to
handle the broad types of data tables that can be used as extension
tables in Darwin Core archive files submitted to GBIF. The full list of
extensions possible to use for GBIF-compliant Darwin Core archive files
can be found on the [Darwin Core Archive Validator
website](https://tools.gbif.org/dwca-validator/extensions.do). The names
of the Living Norway classes that can handle these extensions can be
found by calling the ‘getGBIFExtensionClasses()’ function.

    names(getGBIFExtensionClasses())

    ##  [1] "GBIFMultimedia"                "GBIFChronometricAge"          
    ##  [3] "GBIFIdentification"            "GBIFMeasurementOrFact"        
    ##  [5] "GBIFResourceRelationship"      "GBIFEOLMediaExtension"        
    ##  [7] "GBIFEOLReferencesExtension"    "GBIFDescription"              
    ##  [9] "GBIFDistribution"              "GBIFdnaDerivedData"           
    ## [11] "GBIFIdentifier"                "GBIFImage"                    
    ## [13] "GBIFMultimedia"                "GBIFReference"                
    ## [15] "GBIFReleve"                    "GBIFSpeciesProfile"           
    ## [17] "GBIFTypesAndSpecimen"          "GBIFVernacularName"           
    ## [19] "GBIFGermplasmAccession"        "GBIFMeasurementScore"         
    ## [21] "GBIFMeasurementTrait"          "GBIFMeasurementTrial"         
    ## [23] "GBIFAmplification"             "GBIFCloning"                  
    ## [25] "GBIFGelImage"                  "GBIFLoan"                     
    ## [27] "GBIFMaterialSample"            "GBIFPermit"                   
    ## [29] "GBIFPreparation"               "GBIFPreservation"             
    ## [31] "GBIFGermplasmSample"           "GBIFExtendedMeasurementOrFact"
    ## [33] "GBIFChronometricAge"           "GBIFChronometricDate"

Importing a Darwin Core Archive File
------------------------------------

In order to import a Darwin Core archive file we need to first get hold
of a Darwin Core archive file for a dataset that we wish to import.
Typically one can download these files manually from using biodiversity
database indexing facilities such as [GBIF](www.gbif.org). For this
example we will use an example dataset from the “Extensive monitoring of
breeding birds” program
([TOV-E](https://tov-e.nina.no/Fugl/Default.aspx)), for which the Darwin
Core archive file is housed on the IPT server at the [Norwegian
Institute for Nature Research](www.nina.no). The overview for this
dataset can be found on the [GBIF dataset
portal](https://www.gbif.org/dataset/4a00502d-6342-4294-aad1-9727e5c24041).
To minimise the number of files needed to be distributed as part of this
exercise, we can use the R code below to download and store the Darwin
Core archive file in a temporary location.

    # Create a temporary directory to store intermediate files used in this workshop
    tempDirLoc <- tempdir()
    # The URL where the Darwin Core file for the TOV-E bird survey data is housed
    datasetURL <- "https://ipt.nina.no/archive.do?r=tove_birdsampling"
    # Download the Darwin Core file to the temporary directory
    localDataLoc <- file.path(tempDirLoc, "TOVEData.zip")
    download.file(datasetURL, localDataLoc, mode = "wb")

Now that we have the Darwin Core archive file stored locally, we can now
import it using the “initializeDwCArchive” function in the Living Norway
package. We do this by calling the ‘initializeDwCArchive’ function. This
function can be called in one of two different ways: it’s first argument
can be a location of a Darwin Core archive file (with an optional second
argument being a default file encoding for importing the data) and is
the easiest way for importing data that already exist as Darwin Core
archive, or it can be called using Darwin Core tables constructed using
the Living Norway package for the times when you are using the package
to construct your own Darwin Core archives. This latter way to call the
function will be covered in the later section on archive file creation.

    # Create a DwCArchive object from the downloaded Darwin Core archive file
    TOVEArchive <- initializeDwCArchive(localDataLoc, "UTF-8")

In the code block above we specify the file UTF-8 file encoding. By
default the encoding will be set to your system and, in most cases will
not need to be changed from these defaults. In this example the metadata
files in the archive contain a number of Norwegian characters that may
be incorrectly imported if we use the default values of your system.

Now that the archive has been imported into a DwCArchive object then we
can have a look at a summary of the contents:

    # Print a summary of the data in the archive object
    TOVEArchive

    ## METADATA
    ## 
    ## Title: TOV-E Bird monitoring sampling data
    ## Creators: John Atle Kålås (Norwegian Institute for Nature Research), Ingar Jostein Øien (Norsk Ornitologisk Forening), Bård Stokke (Norsk institutt for naturforskning), Roald Vang (Norwegian Institute for Nature Research)
    ## Abstract: Data from the project "Extensive monitoring of breeding birds (TOV-E)" from 2006 up until today. The project is carried out in cooperation between NOF BirdLife Norway, Norwegian Institute for Nature Research (NINA) and the Norwegian Environment Agency, and is the most important project for monitoring population trends for Norwegian bird species on land.
    ## 
    ## 
    ## CORE TABLE
    ## 
    ## Table name: event | ID column: 1 - "id" | Table class: Event
    ##                                                            columnIndex
    ## http://purl.org/dc/terms/type                                        2
    ## http://purl.org/dc/terms/modified                                    3
    ## http://rs.tdwg.org/dwc/terms/datasetName                             4
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                    5
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                     6
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                     7
    ## http://rs.tdwg.org/dwc/terms/eventID                                 8
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                        9
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                        10
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                         11
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                         12
    ## http://rs.tdwg.org/dwc/terms/eventDate                              13
    ## http://rs.tdwg.org/dwc/terms/eventTime                              14
    ## http://rs.tdwg.org/dwc/terms/year                                   15
    ## http://rs.tdwg.org/dwc/terms/month                                  16
    ## http://rs.tdwg.org/dwc/terms/day                                    17
    ## http://rs.tdwg.org/dwc/terms/locationID                             18
    ## http://rs.tdwg.org/dwc/terms/country                                19
    ## http://rs.tdwg.org/dwc/terms/countryCode                            20
    ## http://rs.tdwg.org/dwc/terms/stateProvince                          21
    ## http://rs.tdwg.org/dwc/terms/municipality                           22
    ## http://rs.tdwg.org/dwc/terms/locality                               23
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters               24
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters               25
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                        26
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                       27
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                          28
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters          29
    ##                                                                               columnName
    ## http://purl.org/dc/terms/type                                                       type
    ## http://purl.org/dc/terms/modified                                               modified
    ## http://rs.tdwg.org/dwc/terms/datasetName                                     datasetName
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                   ownerInstitutionCode
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                     informationWithheld
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                     dataGeneralizations
    ## http://rs.tdwg.org/dwc/terms/eventID                                             eventID
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                           samplingProtocol
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                             sampleSizeValue
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                               sampleSizeUnit
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                               samplingEffort
    ## http://rs.tdwg.org/dwc/terms/eventDate                                         eventDate
    ## http://rs.tdwg.org/dwc/terms/eventTime                                         eventTime
    ## http://rs.tdwg.org/dwc/terms/year                                                   year
    ## http://rs.tdwg.org/dwc/terms/month                                                 month
    ## http://rs.tdwg.org/dwc/terms/day                                                     day
    ## http://rs.tdwg.org/dwc/terms/locationID                                       locationID
    ## http://rs.tdwg.org/dwc/terms/country                                             country
    ## http://rs.tdwg.org/dwc/terms/countryCode                                     countryCode
    ## http://rs.tdwg.org/dwc/terms/stateProvince                                 stateProvince
    ## http://rs.tdwg.org/dwc/terms/municipality                                   municipality
    ## http://rs.tdwg.org/dwc/terms/locality                                           locality
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters           minimumElevationInMeters
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters           maximumElevationInMeters
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                             decimalLatitude
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                           decimalLongitude
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                                 geodeticDatum
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters coordinateUncertaintyInMeters
    ##                                     id  type                modified
    ## 1 7B888854-72DF-41AF-A09D-4AC963D2B7D2 Event 2012-04-12T15:03:57.710
    ## 2 E8E6C2D0-CD3C-435E-BB0A-EE521FDEED73 Event     2008-05-30T00:00:00
    ## 3 C936B129-AEDF-4F15-B394-A67A048AC12B Event 2010-11-11T21:43:04.873
    ## 4 46775141-2D2F-4F8D-91FD-7D8328EC0D55 Event 2011-05-22T11:02:16.047
    ## 5 86CB0FA8-23DC-44E2-8130-834EC7EAABAA Event 2013-01-11T16:54:48.147
    ## 6 AA006F91-EA3C-4382-A30C-56575245A1C2 Event 2013-08-23T09:02:49.753
    ##             datasetName ownerInstitutionCode
    ## 1 TOV-E Bird monitoring             NINA/NOF
    ## 2 TOV-E Bird monitoring             NINA/NOF
    ## 3 TOV-E Bird monitoring             NINA/NOF
    ## 4 TOV-E Bird monitoring             NINA/NOF
    ## 5 TOV-E Bird monitoring             NINA/NOF
    ## 6 TOV-E Bird monitoring             NINA/NOF
    ##                                                                                        informationWithheld
    ## 1 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 2 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 3 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 4 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 5 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 6 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ##                                       dataGeneralizations
    ## 1 Location laid out randomly within 5km from centre point
    ## 2 Location laid out randomly within 5km from centre point
    ## 3 Location laid out randomly within 5km from centre point
    ## 4 Location laid out randomly within 5km from centre point
    ## 5 Location laid out randomly within 5km from centre point
    ## 6 Location laid out randomly within 5km from centre point
    ##                                eventID
    ## 1 7B888854-72DF-41AF-A09D-4AC963D2B7D2
    ## 2 E8E6C2D0-CD3C-435E-BB0A-EE521FDEED73
    ## 3 C936B129-AEDF-4F15-B394-A67A048AC12B
    ## 4 46775141-2D2F-4F8D-91FD-7D8328EC0D55
    ## 5 86CB0FA8-23DC-44E2-8130-834EC7EAABAA
    ## 6 AA006F91-EA3C-4382-A30C-56575245A1C2
    ##                                                   samplingProtocol
    ## 1 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 2 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 3 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 4 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 5 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 6 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ##   sampleSizeValue sampleSizeUnit                 samplingEffort  eventDate
    ## 1            5366          metre 255 minutes/17 sampling points 2007-06-03
    ## 2            5366          metre 245 minutes/17 sampling points 2008-05-30
    ## 3            5366          metre 240 minutes/17 sampling points 2010-05-29
    ## 4            5366          metre 270 minutes/17 sampling points 2011-05-22
    ## 5            5366          metre 330 minutes/17 sampling points 2012-06-02
    ## 6            5366          metre 225 minutes/17 sampling points 2013-06-02
    ##     eventTime year month day locationID country countryCode stateProvince
    ## 1  3:55/08:10 2007     6   3        101  Norway          NO         Viken
    ## 2 04:05/08:10 2008     5  30        101  Norway          NO         Viken
    ## 3 05:00/09:00 2010     5  29        101  Norway          NO         Viken
    ## 4 04:00/08:30 2011     5  22        101  Norway          NO         Viken
    ## 5  4:30/10:00 2012     6   2        101  Norway          NO         Viken
    ## 6 04:15/08:00 2013     6   2        101  Norway          NO         Viken
    ##   municipality    locality minimumElevationInMeters maximumElevationInMeters
    ## 1       Halden Skogskroken                      190                      220
    ## 2       Halden Skogskroken                      190                      220
    ## 3       Halden Skogskroken                      190                      220
    ## 4       Halden Skogskroken                      190                      220
    ## 5       Halden Skogskroken                      190                      220
    ## 6       Halden Skogskroken                      190                      220
    ##   decimalLatitude decimalLongitude geodeticDatum coordinateUncertaintyInMeters
    ## 1        58.91206         11.62238     EPSG:4326                          5000
    ## 2        58.91206         11.62238     EPSG:4326                          5000
    ## 3        58.91206         11.62238     EPSG:4326                          5000
    ## 4        58.91206         11.62238     EPSG:4326                          5000
    ## 5        58.91206         11.62238     EPSG:4326                          5000
    ## 6        58.91206         11.62238     EPSG:4326                          5000
    ## 
    ## 
    ## EXTENSION TABLES
    ## 
    ## Table name: occurrence | ID column: 1 - "id" | Table class: Occurrence
    ##                                                   columnIndex
    ## http://purl.org/dc/terms/type                               2
    ## http://purl.org/dc/terms/modified                           3
    ## http://rs.tdwg.org/dwc/terms/collectionCode                 4
    ## http://rs.tdwg.org/dwc/terms/basisOfRecord                  5
    ## http://rs.tdwg.org/dwc/terms/occurrenceID                   6
    ## http://rs.tdwg.org/dwc/terms/catalogNumber                  7
    ## http://rs.tdwg.org/dwc/terms/occurrenceRemarks              8
    ## http://rs.tdwg.org/dwc/terms/organismQuantity               9
    ## http://rs.tdwg.org/dwc/terms/organismQuantityType          10
    ## http://rs.tdwg.org/dwc/terms/eventID                       11
    ## http://rs.tdwg.org/dwc/terms/scientificName                12
    ## http://rs.tdwg.org/dwc/terms/kingdom                       13
    ## http://rs.tdwg.org/dwc/terms/phylum                        14
    ## http://rs.tdwg.org/dwc/terms/class                         15
    ## http://rs.tdwg.org/dwc/terms/order                         16
    ## http://rs.tdwg.org/dwc/terms/family                        17
    ## http://rs.tdwg.org/dwc/terms/genus                         18
    ## http://rs.tdwg.org/dwc/terms/infraspecificEpithet          19
    ## http://rs.tdwg.org/dwc/terms/vernacularName                20
    ##                                                             columnName
    ## http://purl.org/dc/terms/type                                     type
    ## http://purl.org/dc/terms/modified                             modified
    ## http://rs.tdwg.org/dwc/terms/collectionCode             collectionCode
    ## http://rs.tdwg.org/dwc/terms/basisOfRecord               basisOfRecord
    ## http://rs.tdwg.org/dwc/terms/occurrenceID                 occurrenceID
    ## http://rs.tdwg.org/dwc/terms/catalogNumber               catalogNumber
    ## http://rs.tdwg.org/dwc/terms/occurrenceRemarks       occurrenceRemarks
    ## http://rs.tdwg.org/dwc/terms/organismQuantity         organismQuantity
    ## http://rs.tdwg.org/dwc/terms/organismQuantityType organismQuantityType
    ## http://rs.tdwg.org/dwc/terms/eventID                           eventID
    ## http://rs.tdwg.org/dwc/terms/scientificName             scientificName
    ## http://rs.tdwg.org/dwc/terms/kingdom                           kingdom
    ## http://rs.tdwg.org/dwc/terms/phylum                             phylum
    ## http://rs.tdwg.org/dwc/terms/class                               class
    ## http://rs.tdwg.org/dwc/terms/order                               order
    ## http://rs.tdwg.org/dwc/terms/family                             family
    ## http://rs.tdwg.org/dwc/terms/genus                               genus
    ## http://rs.tdwg.org/dwc/terms/infraspecificEpithet infraspecificEpithet
    ## http://rs.tdwg.org/dwc/terms/vernacularName             vernacularName
    ##                                     id       type                modified
    ## 1 B5538DE6-437D-4B61-9CB0-8AE7CAF4D5A4 Occurrence 2012-06-19T23:33:30.053
    ## 2 BC7AB7CC-B9D9-433B-95E3-1609CD305E35 Occurrence 2013-07-08T22:06:26.513
    ## 3 29E73B38-950D-4EE1-A0B6-8443E7C219D2 Occurrence 2018-06-05T17:52:53.957
    ## 4 87416FAD-8400-48BF-B523-0BD0DF22ACDC Occurrence 2019-08-02T10:49:23.403
    ## 5 8640104C-3DA0-45BB-B6FE-C9522D58CEAA Occurrence 2020-09-06T18:56:19.373
    ## 6 18C6EA4B-E655-4A1B-981A-CF396B14B26D Occurrence 2014-06-08T12:14:57.170
    ##                                 collectionCode    basisOfRecord
    ## 1 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 2 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 3 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 4 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 5 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 6 TOV - Extensive monitoring of bird in Norway HumanObservation
    ##                        occurrenceID catalogNumber
    ## 1 urn:catalog:NINA:TOV-E:2012180410    2012180410
    ## 2 urn:catalog:NINA:TOV-E:2013180410    2013180410
    ## 3 urn:catalog:NINA:TOV-E:2018180410    2018180410
    ## 4 urn:catalog:NINA:TOV-E:2019180410    2019180410
    ## 5 urn:catalog:NINA:TOV-E:2020180410    2020180410
    ## 6 urn:catalog:NINA:TOV-E:2014152010    2014152010
    ##                                                                occurrenceRemarks
    ## 1 aggregated count for 15 sampling points situated less than 5000m from location
    ## 2 aggregated count for 15 sampling points situated less than 5000m from location
    ## 3 aggregated count for 15 sampling points situated less than 5000m from location
    ## 4 aggregated count for 15 sampling points situated less than 5000m from location
    ## 5 aggregated count for 15 sampling points situated less than 5000m from location
    ## 6 aggregated count for 20 sampling points situated less than 5000m from location
    ##   organismQuantity organismQuantityType                              eventID
    ## 1                1                pairs B5538DE6-437D-4B61-9CB0-8AE7CAF4D5A4
    ## 2                1                pairs BC7AB7CC-B9D9-433B-95E3-1609CD305E35
    ## 3                2                pairs 29E73B38-950D-4EE1-A0B6-8443E7C219D2
    ## 4                2                pairs 87416FAD-8400-48BF-B523-0BD0DF22ACDC
    ## 5                3                pairs 8640104C-3DA0-45BB-B6FE-C9522D58CEAA
    ## 6                1                pairs 18C6EA4B-E655-4A1B-981A-CF396B14B26D
    ##   scientificName  kingdom   phylum class       order   family genus
    ## 1 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 2 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 3 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 4 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 5 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 6 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ##   infraspecificEpithet vernacularName
    ## 1             stellata         Smålom
    ## 2             stellata         Smålom
    ## 3             stellata         Smålom
    ## 4             stellata         Smålom
    ## 5             stellata         Smålom
    ## 6             stellata         Smålom

The top section of the output gives a brief summary of the metadata
associated with the project. What follows the metadata is a summary of
each of the data tables contained in the archive: firstly the core data
table followed by each extension data table in the archive. The first
line of the summary of each data table gives the name of the file in the
archive (in this case the core file was called ‘event’), followed by the
column that serves as an ID column for the data table, and finally the
class of data table (in the case of this example the core data table is
of type ‘Event’ which corresponds to the GBIF event core category of
archive files). Below this line is a list of each of the columns in the
data table that have been linked to a standardised definition such as
Darwin Core. These are columns that have a meaning that corresponds to a
definition determined by a standardisation committee and for which the
definition is publically accessible. Each row of this definition summary
table starts with the location where the term definition can be found
(in most cases an [Internationalized Resource
Identifier](https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier))
followed by the column number and, if the data table has column names,
the name of the column corresponding to this column number. Below the
definition list is a snippet of the data contained in the data table
(usually just the first six rows).

We can select out the core data table from the Darwin Core archive and
even retrieve it as a data frame. Extracting information about objects
can be done by using the R6 ‘method functions’ defined for the classes
defining those objects. Under this object model method functions are
used by using the ‘$’ notation after the object you want to call the
method function for, followed by the name of the method function you
want to call. For example, the DwCArchive class has the method function
‘getCoreTable’ that allows the user to extract the core table from the
archive object. Once a particular data table is extracted then the user
can use the method functions defined by the DwCGeneric class that allows
for further manipulation of the individual data tables.

    # Retrieve the core table from the archive object
    TOVEEventTable <- TOVEArchive$getCoreTable()
    # TOVEEvent table is an object of type GBIFEvent which is derived from DwCGeneric
    class(TOVEEventTable)

    ## [1] "GBIFEvent"  "DwCGeneric" "R6"

    # Export the contents of the event table to a data frame
    TOVEEventTableDF <- TOVEEventTable$exportAsDataFrame()
    # Lets look at the top few rows of the data frame extracted from the core data table
    head(TOVEEventTableDF)

    ##                                     id  type                modified
    ## 1 7B888854-72DF-41AF-A09D-4AC963D2B7D2 Event 2012-04-12T15:03:57.710
    ## 2 E8E6C2D0-CD3C-435E-BB0A-EE521FDEED73 Event     2008-05-30T00:00:00
    ## 3 C936B129-AEDF-4F15-B394-A67A048AC12B Event 2010-11-11T21:43:04.873
    ## 4 46775141-2D2F-4F8D-91FD-7D8328EC0D55 Event 2011-05-22T11:02:16.047
    ## 5 86CB0FA8-23DC-44E2-8130-834EC7EAABAA Event 2013-01-11T16:54:48.147
    ## 6 AA006F91-EA3C-4382-A30C-56575245A1C2 Event 2013-08-23T09:02:49.753
    ##             datasetName ownerInstitutionCode
    ## 1 TOV-E Bird monitoring             NINA/NOF
    ## 2 TOV-E Bird monitoring             NINA/NOF
    ## 3 TOV-E Bird monitoring             NINA/NOF
    ## 4 TOV-E Bird monitoring             NINA/NOF
    ## 5 TOV-E Bird monitoring             NINA/NOF
    ## 6 TOV-E Bird monitoring             NINA/NOF
    ##                                                                                        informationWithheld
    ## 1 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 2 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 3 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 4 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 5 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ## 6 Exact location withheld to protect long-term study. Observers identity withheld due to GDPR restrictions
    ##                                       dataGeneralizations
    ## 1 Location laid out randomly within 5km from centre point
    ## 2 Location laid out randomly within 5km from centre point
    ## 3 Location laid out randomly within 5km from centre point
    ## 4 Location laid out randomly within 5km from centre point
    ## 5 Location laid out randomly within 5km from centre point
    ## 6 Location laid out randomly within 5km from centre point
    ##                                eventID
    ## 1 7B888854-72DF-41AF-A09D-4AC963D2B7D2
    ## 2 E8E6C2D0-CD3C-435E-BB0A-EE521FDEED73
    ## 3 C936B129-AEDF-4F15-B394-A67A048AC12B
    ## 4 46775141-2D2F-4F8D-91FD-7D8328EC0D55
    ## 5 86CB0FA8-23DC-44E2-8130-834EC7EAABAA
    ## 6 AA006F91-EA3C-4382-A30C-56575245A1C2
    ##                                                   samplingProtocol
    ## 1 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 2 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 3 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 4 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 5 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ## 6 https://tov-e.nina.no/Fugl/public/papirskjema/MethodologyEng.pdf
    ##   sampleSizeValue sampleSizeUnit                 samplingEffort  eventDate
    ## 1            5366          metre 255 minutes/17 sampling points 2007-06-03
    ## 2            5366          metre 245 minutes/17 sampling points 2008-05-30
    ## 3            5366          metre 240 minutes/17 sampling points 2010-05-29
    ## 4            5366          metre 270 minutes/17 sampling points 2011-05-22
    ## 5            5366          metre 330 minutes/17 sampling points 2012-06-02
    ## 6            5366          metre 225 minutes/17 sampling points 2013-06-02
    ##     eventTime year month day locationID country countryCode stateProvince
    ## 1  3:55/08:10 2007     6   3        101  Norway          NO         Viken
    ## 2 04:05/08:10 2008     5  30        101  Norway          NO         Viken
    ## 3 05:00/09:00 2010     5  29        101  Norway          NO         Viken
    ## 4 04:00/08:30 2011     5  22        101  Norway          NO         Viken
    ## 5  4:30/10:00 2012     6   2        101  Norway          NO         Viken
    ## 6 04:15/08:00 2013     6   2        101  Norway          NO         Viken
    ##   municipality    locality minimumElevationInMeters maximumElevationInMeters
    ## 1       Halden Skogskroken                      190                      220
    ## 2       Halden Skogskroken                      190                      220
    ## 3       Halden Skogskroken                      190                      220
    ## 4       Halden Skogskroken                      190                      220
    ## 5       Halden Skogskroken                      190                      220
    ## 6       Halden Skogskroken                      190                      220
    ##   decimalLatitude decimalLongitude geodeticDatum coordinateUncertaintyInMeters
    ## 1        58.91206         11.62238     EPSG:4326                          5000
    ## 2        58.91206         11.62238     EPSG:4326                          5000
    ## 3        58.91206         11.62238     EPSG:4326                          5000
    ## 4        58.91206         11.62238     EPSG:4326                          5000
    ## 5        58.91206         11.62238     EPSG:4326                          5000
    ## 6        58.91206         11.62238     EPSG:4326                          5000

Similarly, extension tables can be extracted from the archive by using
the ‘getExtensionTables’ method function of the DwCArchive class. This
function has one argument that is either an integer vector containing
the indeces of the extension tables (in the order that they are
displayed in the summary of the archive file) or a character vector
giving the names of the tables in the archive file (those names are
found in the first summary line of each data table when displaying the
archive summary). This function returns a list of the data tables
requested. Therefore to extract just the one we want, we’ll need to
further index the list with the ‘\[\[1\]\]’ notation to extract the
first element of the returned list.

    # Retrieve the extension table from the archive object: two ways to do this
    # 1. Retrieve the extension table by using its index
    TOVEOccTable <- TOVEArchive$getExtensionTables(1)[[1]]
    # 2. Retrieve the extension table by using its name
    TOVEOccTable <- TOVEArchive$getExtensionTables("occurrence")[[1]]
    # The getExtensionTables functions returns a list of the data tables that are requested.  Therefore to extract just the first element of this list we need
    # to use the extra '[[1]]' list extraction notation.
    # TOVEOccTable is an object of type GBIFOccurrence which is dervied from DwCGeneric
    class(TOVEOccTable)

    ## [1] "GBIFOccurrence" "DwCGeneric"     "R6"

    # Export the contents of the occurrence table to a data frame
    TOVEOccTableDF <- TOVEOccTable$exportAsDataFrame()
    # Lets look at the top few rows of the data frame extracted from the extension data table
    head(TOVEOccTableDF)

    ##                                     id       type                modified
    ## 1 B5538DE6-437D-4B61-9CB0-8AE7CAF4D5A4 Occurrence 2012-06-19T23:33:30.053
    ## 2 BC7AB7CC-B9D9-433B-95E3-1609CD305E35 Occurrence 2013-07-08T22:06:26.513
    ## 3 29E73B38-950D-4EE1-A0B6-8443E7C219D2 Occurrence 2018-06-05T17:52:53.957
    ## 4 87416FAD-8400-48BF-B523-0BD0DF22ACDC Occurrence 2019-08-02T10:49:23.403
    ## 5 8640104C-3DA0-45BB-B6FE-C9522D58CEAA Occurrence 2020-09-06T18:56:19.373
    ## 6 18C6EA4B-E655-4A1B-981A-CF396B14B26D Occurrence 2014-06-08T12:14:57.170
    ##                                 collectionCode    basisOfRecord
    ## 1 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 2 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 3 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 4 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 5 TOV - Extensive monitoring of bird in Norway HumanObservation
    ## 6 TOV - Extensive monitoring of bird in Norway HumanObservation
    ##                        occurrenceID catalogNumber
    ## 1 urn:catalog:NINA:TOV-E:2012180410    2012180410
    ## 2 urn:catalog:NINA:TOV-E:2013180410    2013180410
    ## 3 urn:catalog:NINA:TOV-E:2018180410    2018180410
    ## 4 urn:catalog:NINA:TOV-E:2019180410    2019180410
    ## 5 urn:catalog:NINA:TOV-E:2020180410    2020180410
    ## 6 urn:catalog:NINA:TOV-E:2014152010    2014152010
    ##                                                                occurrenceRemarks
    ## 1 aggregated count for 15 sampling points situated less than 5000m from location
    ## 2 aggregated count for 15 sampling points situated less than 5000m from location
    ## 3 aggregated count for 15 sampling points situated less than 5000m from location
    ## 4 aggregated count for 15 sampling points situated less than 5000m from location
    ## 5 aggregated count for 15 sampling points situated less than 5000m from location
    ## 6 aggregated count for 20 sampling points situated less than 5000m from location
    ##   organismQuantity organismQuantityType                              eventID
    ## 1                1                pairs B5538DE6-437D-4B61-9CB0-8AE7CAF4D5A4
    ## 2                1                pairs BC7AB7CC-B9D9-433B-95E3-1609CD305E35
    ## 3                2                pairs 29E73B38-950D-4EE1-A0B6-8443E7C219D2
    ## 4                2                pairs 87416FAD-8400-48BF-B523-0BD0DF22ACDC
    ## 5                3                pairs 8640104C-3DA0-45BB-B6FE-C9522D58CEAA
    ## 6                1                pairs 18C6EA4B-E655-4A1B-981A-CF396B14B26D
    ##   scientificName  kingdom   phylum class       order   family genus
    ## 1 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 2 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 3 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 4 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 5 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ## 6 Gavia stellata Animalia Chordata  Aves Gaviiformes Gaviidae Gavia
    ##   infraspecificEpithet vernacularName
    ## 1             stellata         Smålom
    ## 2             stellata         Smålom
    ## 3             stellata         Smålom
    ## 4             stellata         Smålom
    ## 5             stellata         Smålom
    ## 6             stellata         Smålom

It is possible to extract elements from the archive metadata. The
‘getMetadata’ method of the DwCArchive class returns a DwCMetadata
object. From this object it is possible to access elements of the
metadata.

    # Retrieve the metadata from the archive object
    TOVEMetadata <- TOVEArchive$getMetadata()
    # Retrieve the title of the data set
    TOVEMetadata$getTitle()

    ## [1] "TOV-E Bird monitoring sampling data"

    # Retrieve the abstract/summary of the data set
    TOVEMetadata$getAbstract()

    ## [1] "Data from the project \"Extensive monitoring of breeding birds (TOV-E)\" from 2006 up until today. The project is carried out in cooperation between NOF BirdLife Norway, Norwegian Institute for Nature Research (NINA) and the Norwegian Environment Agency, and is the most important project for monitoring population trends for Norwegian bird species on land."

    # Retrieve the information on the data set creators
    TOVEMetadata$getCreatorInfo()

    ## [[1]]
    ## [[1]]$individualName
    ## [[1]]$individualName$givenName
    ## [1] "John Atle"
    ## 
    ## [[1]]$individualName$surName
    ## [1] "Kålås"
    ## 
    ## 
    ## [[1]]$organizationName
    ## [1] "Norwegian Institute for Nature Research"
    ## 
    ## [[1]]$positionName
    ## [1] "Senior Researcher"
    ## 
    ## [[1]]$address
    ## [[1]]$address$deliveryPoint
    ## [1] "Postboks 5685 Sluppen"
    ## 
    ## [[1]]$address$city
    ## [1] "Trondheim"
    ## 
    ## [[1]]$address$postalCode
    ## [1] "7485"
    ## 
    ## [[1]]$address$country
    ## [1] "NO"
    ## 
    ## 
    ## [[1]]$electronicMailAddress
    ## [1] "john.kalas@nina.no"
    ## 
    ## [[1]]$userId
    ## [1] "0000-0002-2126-0261"
    ## 
    ## 
    ## [[2]]
    ## [[2]]$individualName
    ## [[2]]$individualName$givenName
    ## [1] "Ingar Jostein"
    ## 
    ## [[2]]$individualName$surName
    ## [1] "Øien"
    ## 
    ## 
    ## [[2]]$organizationName
    ## [1] "Norsk Ornitologisk Forening"
    ## 
    ## [[2]]$positionName
    ## [1] "Fagsjef"
    ## 
    ## [[2]]$address
    ## [[2]]$address$deliveryPoint
    ## [1] "Sandgata 30 B"
    ## 
    ## [[2]]$address$city
    ## [1] "Trondheim"
    ## 
    ## [[2]]$address$postalCode
    ## [1] "7012"
    ## 
    ## [[2]]$address$country
    ## [1] "NO"
    ## 
    ## 
    ## [[2]]$electronicMailAddress
    ## [1] "ingar@birdlife.no"
    ## 
    ## 
    ## [[3]]
    ## [[3]]$individualName
    ## [[3]]$individualName$givenName
    ## [1] "Bård"
    ## 
    ## [[3]]$individualName$surName
    ## [1] "Stokke"
    ## 
    ## 
    ## [[3]]$organizationName
    ## [1] "Norsk institutt for naturforskning"
    ## 
    ## [[3]]$positionName
    ## [1] "Senior Researcher"
    ## 
    ## [[3]]$address
    ## [[3]]$address$deliveryPoint
    ## [1] "Postboks 5685 Sluppen"
    ## 
    ## [[3]]$address$city
    ## [1] "Trondheim"
    ## 
    ## [[3]]$address$postalCode
    ## [1] "7485"
    ## 
    ## [[3]]$address$country
    ## [1] "NO"
    ## 
    ## 
    ## [[3]]$phone
    ## [1] "91138256"
    ## 
    ## [[3]]$electronicMailAddress
    ## [1] "bard.stokke@nina.no"
    ## 
    ## [[3]]$userId
    ## [1] "0000-0001-5589-6738"
    ## 
    ## 
    ## [[4]]
    ## [[4]]$individualName
    ## [[4]]$individualName$givenName
    ## [1] "Roald"
    ## 
    ## [[4]]$individualName$surName
    ## [1] "Vang"
    ## 
    ## 
    ## [[4]]$organizationName
    ## [1] "Norwegian Institute for Nature Research"
    ## 
    ## [[4]]$positionName
    ## [1] "Data manager"
    ## 
    ## [[4]]$address
    ## [[4]]$address$deliveryPoint
    ## [1] "Postboks 5685 Sluppen"
    ## 
    ## [[4]]$address$city
    ## [1] "Trondheim"
    ## 
    ## [[4]]$address$postalCode
    ## [1] "7485"
    ## 
    ## [[4]]$address$country
    ## [1] "NO"
    ## 
    ## 
    ## [[4]]$electronicMailAddress
    ## [1] "roald.vang@nina.no"
    ## 
    ## [[4]]$userId
    ## [1] "0000-0002-4006-8689"

Creating a Darwin Core Archive File
-----------------------------------

### Creating the Data Tables

So far we’ve talked about how to import data being provided as a Darwin
Core archive file but a key feature of the Living Norway package is to
make it easier for researchers to go from their data (stored as data
frames) to a complete Darwin Core archive. To demonstrate this, we use
the data frames created that we extracted in the code blocks above and
use this as a starting point for creating a Darwin core archive file.
For most researchers this is a common starting point as their data sets
are often represented by a collection of data tables that are either
already data frame or that can be easily read into data frames. So, from
this data frame starting point, we have two tables: ‘TOVEEventTableDF’
and ‘TOVEOccTableDF’. Our first decision, is to designate one of the
tables as the core data table. In this instance we already know that it
is ‘TOVEEventDF’ but, in the case where you are processing your own data
sets, the core data table is always the one that the sampling unit is
based around. For most ecological experimental designs, the table
denoting the sampling events (handled in the Living Norway package by
the GBIFEvent class) is a natural core table. Under this format, each
sampling event and its details, such as location and time of sampling,
is described in the core table. Often what was recorded at each sampling
event is described in the extension files. In situations where the only
thing measured at each sampling event is the occurrence of a species
then the table describing these occurrences would be designated as the
core data table (corresponding to the GBIFOccurrence class in the Living
Norway package). In some situations the dataset may not be based around
occurrences or sampling events but simply a check list of species (or
other taxonomic groups=. This latter case can be handled by using a core
data table that lists these taxa and is handled in the Living Norway
package with the ‘GBIFTaxon’ class.

So we’ve decided that the core data table should be the
‘TOVEEventTableDF’ data frame and that this data table is an event-based
core. To initialise a GBIF-complaint event table we can use the
‘initializeGBIFEvent’ function. This function requires two arguments:
the data frame making up the table and a column (given as either a
column name or column number) to represent the ID information. If the
table is going to be used as a core table then this ID column must
contain unique values for each row and will serve as a key to link
extension data tables to the core table. After these two mandatory
arguments are given then the user must specify how the columns (if any)
relate to definitions in the Darwin Core standard for that data table
type. This can be done in one of two ways: either the data frame can
have column names that correspond to Darwin Core terms relevant to the
data table type and then the user can simply add the argument
‘nameAutoMap = TRUE’ to the initialisation function and it will look for
any column names that correspond to Darwin Core terms, or the user can
add arguments with names corresponding to each Darwin Core term and set
that argument either as a column name or column number. The
‘getGBIFEventMembers’ function returns a list of all the Darwin Core
terms associated with GBIF-compliant event data tables.

    # Look at the Darwin Core terms associated with event data tables (here we've shortened it to the first 6 entries so that the output is not too long)
    getGBIFEventMembers()[1:6]

    ## $`http://purl.org/dc/terms/type`
    ## http://purl.org/dc/terms/type - Type (DEPRECATED)
    ## The nature or genre of the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/type
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Is replaced by: http://purl.org/dc/elements/1.1/type
    ##  Notes:
    ##      To provide a string literal value for type, use dc:type rather than this term. In accordance with the Darwin Core RDF guide, rdf:type should be used instead of this term to indicate an IRI value for type.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2009-12-07_1
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_20
    ##  Miscellaneous information:
    ##      This term is deprecated and should no longer be used.
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/modified`
    ## http://purl.org/dc/terms/modified - Date Modified
    ## The most recent date-time on which the resource was changed.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/modified
    ##  Version IRI: http://dublincore.org/usage/terms/history/#modified-003
    ##  Type: Property
    ##  Date modified: 2020-08-12
    ##  Notes:
    ##      Recommended best practice is to use a date that conforms to ISO 8601-1:2019.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##  Examples:
    ##      1963-03-08T14:07-0600 (8 Mar 1963 at 2:07pm in the time zone six hours earlier than UTC). 2009-02-20T08:40Z (20 February 2009 8:40am UTC). 2018-08-29T15:19 (3:19pm local time on 29 August 2018). 1809-02-12 (some time during 12 February 1809). 1906-06 (some time in June 1906). 1971 (some time in the year 1971). 2007-03-01T13:00:00Z/2008-05-11T15:30:00Z (some time during the interval between 1 March 2007 1pm UTC and 11 May 2008 3:30pm UTC). 1900/1909 (some time during the interval between the beginning of the year 1900 and the end of the year 1909). 2007-11-13/15 (some time in the interval between 13 November 2007 and 15 November 2007).
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/language`
    ## http://purl.org/dc/terms/language - Language
    ## A language of the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/language
    ##  Version IRI: http://dublincore.org/usage/terms/history/#languageT-001
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Notes:
    ##      Recommended best practice is to use an IRI from the Library of Congress ISO 639-2 scheme http://id.loc.gov/vocabulary/iso639-2
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/license`
    ## http://purl.org/dc/terms/license - License
    ## A legal document giving official permission to do something with the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/license
    ##  Version IRI: http://dublincore.org/usage/terms/history/#license-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-11-06_17
    ##  Examples:
    ##      http://creativecommons.org/publicdomain/zero/1.0/legalcode, http://creativecommons.org/licenses/by/4.0/legalcode
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/rightsHolder`
    ## http://purl.org/dc/terms/rightsHolder - Rights Holder
    ## A person or organization owning or managing rights over the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/rightsHolder
    ##  Version IRI: http://dublincore.org/usage/terms/history/#rightsHolder-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Examples:
    ##      The Regents of the University of California
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/accessRights`
    ## http://purl.org/dc/terms/accessRights - Access Rights
    ## Information about who can access the resource or an indication of its security status.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/accessRights
    ##  Version IRI: http://dublincore.org/usage/terms/history/#accessRights-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Notes:
    ##      Access Rights may include information regarding access or restrictions based on privacy, security, or other policies.
    ##  Examples:
    ##      not-for-profit use only, https://www.fieldmuseum.org/field-museum-natural-history-conditions-and-suggested-norms-use-collections-data-and-images
    ##  Miscellaneous information:
    ##      not in ABCD

    # Call the initialisation function using the two different methods:
    # 1. Using the automatic mapping method
    newTOVEEventTable <- initializeGBIFEvent(TOVEEventTableDF, "id", nameAutoMap = TRUE)
    # 2. Using the manual mapping method
    newTOVEEventTable <- initializeGBIFEvent(TOVEEventTableDF, "id",
      # What follows is a list of arguments giving Darwin Core terms followed by the column name (or number)
      # in the data frame that corresponds to those terms.  In this example it doesn't make much sense to
      # call the initialisation function in this manner because all the column names correspond to
      # Darwin terms anyway (so much easier to use the first method).  However, this alternative method
      # can be useful if the column names are different from the Darwin Core terms that they represent or
      # for data frame that don't have column names (in which case column numbers can be given as the
      # argument values instead).
      type = "type",
      modified = "modified",
      datasetName = "datasetName",
      ownerInstitutionCode = "ownerInstitutionCode",
      informationWithheld = "informationWithheld",
      dataGeneralizations = "dataGeneralizations",
      eventID = "eventID",
      samplingProtocol = "samplingProtocol",
      sampleSizeValue = "sampleSizeValue",
      sampleSizeUnit = "sampleSizeUnit",
      samplingEffort = "samplingEffort",
      eventDate = "eventDate",
      eventTime = "eventTime",
      year = "year",
      month = "month",
      day = "day",
      locationID = "locationID",
      country = "country",
      countryCode = "countryCode",
      stateProvince = "stateProvince",
      municipality = "municipality",
      locality = "locality",
      minimumElevationInMeters = "minimumElevationInMeters",
      maximumElevationInMeters = "maximumElevationInMeters",
      decimalLatitude = "decimalLatitude",
      decimalLongitude = "decimalLongitude",
      geodeticDatum = "geodeticDatum",
      coordinateUncertaintyInMeters = "coordinateUncertaintyInMeters")
    # We can then check to see if the terms are mapped correctly
    # Terms with NA in the column index represent Darwin Core terms associated with the event data table that are not mapped
    # Not all terms need to be mapped to make a valid Darwin Core archive
    newTOVEEventTable$getTermMapping()

    ##                                                                  columnIndex
    ## http://purl.org/dc/terms/type                                              2
    ## http://purl.org/dc/terms/modified                                          3
    ## http://purl.org/dc/terms/language                                         NA
    ## http://purl.org/dc/terms/license                                          NA
    ## http://purl.org/dc/terms/rightsHolder                                     NA
    ## http://purl.org/dc/terms/accessRights                                     NA
    ## http://purl.org/dc/terms/bibliographicCitation                            NA
    ## http://purl.org/dc/terms/references                                       NA
    ## http://rs.tdwg.org/dwc/terms/institutionID                                NA
    ## http://rs.tdwg.org/dwc/terms/datasetID                                    NA
    ## http://rs.tdwg.org/dwc/terms/institutionCode                              NA
    ## http://rs.tdwg.org/dwc/terms/datasetName                                   4
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                          5
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                           6
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                           7
    ## http://rs.tdwg.org/dwc/terms/dynamicProperties                            NA
    ## http://rs.tdwg.org/dwc/terms/eventID                                       8
    ## http://rs.tdwg.org/dwc/terms/parentEventID                                NA
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                              9
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                              10
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                               11
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                               12
    ## http://rs.tdwg.org/dwc/terms/eventDate                                    13
    ## http://rs.tdwg.org/dwc/terms/eventTime                                    14
    ## http://rs.tdwg.org/dwc/terms/startDayOfYear                               NA
    ## http://rs.tdwg.org/dwc/terms/endDayOfYear                                 NA
    ## http://rs.tdwg.org/dwc/terms/year                                         15
    ## http://rs.tdwg.org/dwc/terms/month                                        16
    ## http://rs.tdwg.org/dwc/terms/day                                          17
    ## http://rs.tdwg.org/dwc/terms/verbatimEventDate                            NA
    ## http://rs.tdwg.org/dwc/terms/habitat                                      NA
    ## http://rs.tdwg.org/dwc/terms/fieldNumber                                  NA
    ## http://rs.tdwg.org/dwc/terms/fieldNotes                                   NA
    ## http://rs.tdwg.org/dwc/terms/eventRemarks                                 NA
    ## http://rs.tdwg.org/dwc/terms/locationID                                   18
    ## http://rs.tdwg.org/dwc/terms/higherGeographyID                            NA
    ## http://rs.tdwg.org/dwc/terms/higherGeography                              NA
    ## http://rs.tdwg.org/dwc/terms/continent                                    NA
    ## http://rs.tdwg.org/dwc/terms/waterBody                                    NA
    ## http://rs.tdwg.org/dwc/terms/islandGroup                                  NA
    ## http://rs.tdwg.org/dwc/terms/island                                       NA
    ## http://rs.tdwg.org/dwc/terms/country                                      19
    ## http://rs.tdwg.org/dwc/terms/countryCode                                  20
    ## http://rs.tdwg.org/dwc/terms/stateProvince                                21
    ## http://rs.tdwg.org/dwc/terms/county                                       NA
    ## http://rs.tdwg.org/dwc/terms/municipality                                 22
    ## http://rs.tdwg.org/dwc/terms/locality                                     23
    ## http://rs.tdwg.org/dwc/terms/verbatimLocality                             NA
    ## http://rs.tdwg.org/dwc/terms/verbatimElevation                            NA
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters                     24
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters                     25
    ## http://rs.tdwg.org/dwc/terms/verbatimDepth                                NA
    ## http://rs.tdwg.org/dwc/terms/minimumDepthInMeters                         NA
    ## http://rs.tdwg.org/dwc/terms/maximumDepthInMeters                         NA
    ## http://rs.tdwg.org/dwc/terms/minimumDistanceAboveSurfaceInMeters          NA
    ## http://rs.tdwg.org/dwc/terms/maximumDistanceAboveSurfaceInMeters          NA
    ## http://rs.tdwg.org/dwc/terms/locationAccordingTo                          NA
    ## http://rs.tdwg.org/dwc/terms/locationRemarks                              NA
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinates                          NA
    ## http://rs.tdwg.org/dwc/terms/verbatimLatitude                             NA
    ## http://rs.tdwg.org/dwc/terms/verbatimLongitude                            NA
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinateSystem                     NA
    ## http://rs.tdwg.org/dwc/terms/verbatimSRS                                  NA
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                              26
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                             27
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                                28
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters                29
    ## http://rs.tdwg.org/dwc/terms/coordinatePrecision                          NA
    ## http://rs.tdwg.org/dwc/terms/pointRadiusSpatialFit                        NA
    ## http://rs.tdwg.org/dwc/terms/footprintWKT                                 NA
    ## http://rs.tdwg.org/dwc/terms/footprintSRS                                 NA
    ## http://rs.tdwg.org/dwc/terms/footprintSpatialFit                          NA
    ## http://rs.tdwg.org/dwc/terms/georeferencedBy                              NA
    ## http://rs.tdwg.org/dwc/terms/georeferencedDate                            NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceProtocol                         NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceSources                          NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceVerificationStatus               NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceRemarks                          NA
    ## http://rs.tdwg.org/dwc/terms/geologicalContextID                          NA
    ## http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem                  NA
    ## http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem                   NA
    ## http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem                   NA
    ## http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem                    NA
    ## http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem                 NA
    ## http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem                  NA
    ## http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries                  NA
    ## http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries                   NA
    ## http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage                     NA
    ## http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage                      NA
    ## http://rs.tdwg.org/dwc/terms/lowestBiostratigraphicZone                   NA
    ## http://rs.tdwg.org/dwc/terms/highestBiostratigraphicZone                  NA
    ## http://rs.tdwg.org/dwc/terms/lithostratigraphicTerms                      NA
    ## http://rs.tdwg.org/dwc/terms/group                                        NA
    ## http://rs.tdwg.org/dwc/terms/formation                                    NA
    ## http://rs.tdwg.org/dwc/terms/member                                       NA
    ## http://rs.tdwg.org/dwc/terms/bed                                          NA
    ##                                                                                     columnName
    ## http://purl.org/dc/terms/type                                                             type
    ## http://purl.org/dc/terms/modified                                                     modified
    ## http://purl.org/dc/terms/language                                                         <NA>
    ## http://purl.org/dc/terms/license                                                          <NA>
    ## http://purl.org/dc/terms/rightsHolder                                                     <NA>
    ## http://purl.org/dc/terms/accessRights                                                     <NA>
    ## http://purl.org/dc/terms/bibliographicCitation                                            <NA>
    ## http://purl.org/dc/terms/references                                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/institutionID                                                <NA>
    ## http://rs.tdwg.org/dwc/terms/datasetID                                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/institutionCode                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/datasetName                                           datasetName
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                         ownerInstitutionCode
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                           informationWithheld
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                           dataGeneralizations
    ## http://rs.tdwg.org/dwc/terms/dynamicProperties                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/eventID                                                   eventID
    ## http://rs.tdwg.org/dwc/terms/parentEventID                                                <NA>
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                                 samplingProtocol
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                                   sampleSizeValue
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                                     sampleSizeUnit
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                                     samplingEffort
    ## http://rs.tdwg.org/dwc/terms/eventDate                                               eventDate
    ## http://rs.tdwg.org/dwc/terms/eventTime                                               eventTime
    ## http://rs.tdwg.org/dwc/terms/startDayOfYear                                               <NA>
    ## http://rs.tdwg.org/dwc/terms/endDayOfYear                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/year                                                         year
    ## http://rs.tdwg.org/dwc/terms/month                                                       month
    ## http://rs.tdwg.org/dwc/terms/day                                                           day
    ## http://rs.tdwg.org/dwc/terms/verbatimEventDate                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/habitat                                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/fieldNumber                                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/fieldNotes                                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/eventRemarks                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/locationID                                             locationID
    ## http://rs.tdwg.org/dwc/terms/higherGeographyID                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/higherGeography                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/continent                                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/waterBody                                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/islandGroup                                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/island                                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/country                                                   country
    ## http://rs.tdwg.org/dwc/terms/countryCode                                           countryCode
    ## http://rs.tdwg.org/dwc/terms/stateProvince                                       stateProvince
    ## http://rs.tdwg.org/dwc/terms/county                                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/municipality                                         municipality
    ## http://rs.tdwg.org/dwc/terms/locality                                                 locality
    ## http://rs.tdwg.org/dwc/terms/verbatimLocality                                             <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimElevation                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters                 minimumElevationInMeters
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters                 maximumElevationInMeters
    ## http://rs.tdwg.org/dwc/terms/verbatimDepth                                                <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumDepthInMeters                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/maximumDepthInMeters                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumDistanceAboveSurfaceInMeters                          <NA>
    ## http://rs.tdwg.org/dwc/terms/maximumDistanceAboveSurfaceInMeters                          <NA>
    ## http://rs.tdwg.org/dwc/terms/locationAccordingTo                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/locationRemarks                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinates                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimLatitude                                             <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimLongitude                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinateSystem                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimSRS                                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                                   decimalLatitude
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                                 decimalLongitude
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                                       geodeticDatum
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters       coordinateUncertaintyInMeters
    ## http://rs.tdwg.org/dwc/terms/coordinatePrecision                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/pointRadiusSpatialFit                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintWKT                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintSRS                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintSpatialFit                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferencedBy                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferencedDate                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceProtocol                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceSources                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceVerificationStatus                               <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceRemarks                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/geologicalContextID                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/lowestBiostratigraphicZone                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/highestBiostratigraphicZone                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/lithostratigraphicTerms                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/group                                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/formation                                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/member                                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/bed                                                          <NA>

    # We can also check that the correct ID column is being used
    #  Returns the index of the ID column
    newTOVEEventTable$getIDIndex()

    ## [1] 1

    #  Returns the name of the ID column (if the data table has column names)
    newTOVEEventTable$getIDName()

    ## [1] "id"

The next step is to perform the same term mapping for each of the
extension data tables. In this instance we know that our extension data
table should be of ‘GBIFOccurrence’. However, how do you find the
relevant extension data type for your extension data? GBIF supports a
large number of extension data types and to go into them all would be
outside the scope of this document. However, the
‘getGBIFExtensionClasses’ function will retrive the definition
information associated with each extension class with a small
description. More detailed descriptions of the extension classes can be
found on the [Darwin Core Validator
website](https://tools.gbif.org/dwca-validator/extensions.do) but the
output from the ‘getGBIFExtensionClasses’ function will at least give
some hints as to which extension class may be suitable for your data
type.

    # Look at some of the supported GBIF extension classes (here we've shorted it to the first six entries so that the output is not too long)
    getGBIFExtensionClasses()[1:6]

    ## $GBIFMultimedia
    ## http://rs.tdwg.org/ac/terms/Multimedia - Multimedia
    ## The Audubon Core is a set of vocabularies designed to represent metadata for biodiversity multimedia resources and collections. These vocabularies aim to represent information that will help to determine whether a particular resource or collection will be fit for some particular biodiversity science application before acquiring the media. Among others, the vocabularies address such concerns as the management of the media and collections, descriptions of their content, their taxonomic, geographic, and temporal coverage, and the appropriate ways to retrieve, attribute and reproduce them.
    ## 
    ##  IRI: http://rs.tdwg.org/ac/terms/Multimedia
    ##  Version IRI: http://rs.tdwg.org/ac/terms/Multimedia
    ##  Type: class
    ##  Date modified: 2015-03-19
    ##  Notes:
    ##      The Audubon Core is a set of vocabularies designed to represent metadata for biodiversity multimedia resources and collections. These vocabularies aim to represent information that will help to determine whether a particular resource or collection will be fit for some particular biodiversity science application before acquiring the media. Among others, the vocabularies address such concerns as the management of the media and collections, descriptions of their content, their taxonomic, geographic, and temporal coverage, and the appropriate ways to retrieve, attribute and reproduce them.
    ##  Miscellaneous information:
    ##      GBIF core/extension class
    ##  Vocabulary URI:
    ##      http://terms.tdwg.org/wiki/Audubon_Core_Term_List
    ## 
    ## $GBIFChronometricAge
    ## http://rs.tdwg.org/chrono/terms/ChronometricAge - ChronometricAge
    ## Extension to Occurrence Core to capture chronometric age information to be used only in cases where the collecting event is not contemporaneous with the time when the dwc:Organism was alive in its context. Collection event information can be reported in dwc:eventDate. See also the normative term list document at https://tdwg.github.io/chrono/list/ and the human-friendly Quick Reference Guide at https://tdwg.github.io/chrono/terms/.
    ## 
    ##  IRI: http://rs.tdwg.org/chrono/terms/ChronometricAge
    ##  Version IRI: http://rs.tdwg.org/chrono/terms/ChronometricAge
    ##  Type: class
    ##  Date modified: 2021-03-27
    ##  Notes:
    ##      Extension to Occurrence Core to capture chronometric age information to be used only in cases where the collecting event is not contemporaneous with the time when the dwc:Organism was alive in its context. Collection event information can be reported in dwc:eventDate. See also the normative term list document at https://tdwg.github.io/chrono/list/ and the human-friendly Quick Reference Guide at https://tdwg.github.io/chrono/terms/.
    ##  Miscellaneous information:
    ##      GBIF core/extension class
    ##  Vocabulary URI:
    ##      https://github.com/tdwg/chrono/blob/master/vocabulary/term_versions.csv
    ## 
    ## $GBIFIdentification
    ## http://rs.tdwg.org/dwc/terms/Identification - Identification
    ## A taxonomic determination (e.g., the assignment to a taxon).
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/Identification
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/Identification-2018-09-06
    ##  Type: Class
    ##  Date modified: 2018-09-06
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      A subspecies determination of an organism.
    ##  Miscellaneous information:
    ##      DataSets/DataSet/Units/Unit/Identifications/Identification
    ## 
    ## $GBIFMeasurementOrFact
    ## http://rs.tdwg.org/dwc/terms/MeasurementOrFact - Measurement or Fact
    ## A measurement of or fact about an rdfs:Resource (http://www.w3.org/2000/01/rdf-schema#Resource).
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/MeasurementOrFact
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/MeasurementOrFact-2018-09-06
    ##  Type: Class
    ##  Date modified: 2018-09-06
    ##  Notes:
    ##      Resources can be thought of as identifiable records or instances of classes and may include, but need not be limited to dwc:Occurrence, dwc:Organism, dwc:MaterialSample, dwc:Event, dwc:Location, dwc:GeologicalContext, dwc:Identification, or dwc:Taxon.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      The weight of an organism in grams. The number of placental scars. Surface water temperature in Celsius.
    ##  Miscellaneous information:
    ##      Datasets/Dataset/Units/Unit/MeasurementsOrFacts or DataSets/DataSet/Units/Unit/Gathering/SiteMeasurementsOrFacts
    ## 
    ## $GBIFResourceRelationship
    ## http://rs.tdwg.org/dwc/terms/ResourceRelationship - Resource Relationship
    ## A relationship of one rdfs:Resource (http://www.w3.org/2000/01/rdf-schema#Resource) to another.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://rs.tdwg.org/dwc/terms/ResourceRelationship
    ##  Version IRI: http://rs.tdwg.org/dwc/terms/version/ResourceRelationship-2018-09-06
    ##  Type: Class
    ##  Date modified: 2018-09-06
    ##  Notes:
    ##      Resources can be thought of as identifiable records or instances of classes and may include, but need not be limited to dwc:Occurrence, dwc:Organism, dwc:MaterialSample, dwc:Event, dwc:Location, dwc:GeologicalContext, dwc:Identification, or dwc:Taxon.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-10-26_15
    ##  Examples:
    ##      An instance of an Organism is the mother of another instance of an Organism. A uniquely identified Occurrence represents the same Occurrence as another uniquely identified Occurrence. A MaterialSample is a subsample of another MaterialSample.
    ##  Miscellaneous information:
    ##      DataSets/DataSet/Units/Unit/Associations
    ## 
    ## $GBIFEOLMediaExtension
    ## http://www.eol.org/schema/transfer#/EOLMediaExtension - EOLMediaExtension
    ## This extension draws from Audubon Core, Dublin Core and others to gather information about text and multimedia. It was designed to contain all the metadata that is required to be indexed by the Encyclopedia of Life (EOL), but this extension is hopefully general enough to be useful to all text and media providers and consumers. The original extension was offline; this is a copy recovered from the Internet Archive.  The issue date is estimated.
    ## 
    ##  IRI: http://eol.org/schema/media/Document
    ##  Version IRI: http://eol.org/schema/media/Document
    ##  Type: class
    ##  Date modified: 2010-01-01
    ##  Notes:
    ##      This extension draws from Audubon Core, Dublin Core and others to gather information about text and multimedia. It was designed to contain all the metadata that is required to be indexed by the Encyclopedia of Life (EOL), but this extension is hopefully general enough to be useful to all text and media providers and consumers. The original extension was offline; this is a copy recovered from the Internet Archive.  The issue date is estimated.
    ##  Miscellaneous information:
    ##      GBIF core/extension class
    ##  Vocabulary URI:
    ##      http://eol.org/info/cp_archives

We can initialise the occurrence extension table for our data set in a
similar manner to how we initialised the event core data type.

    # Look at the Darwin Core terms associated with occurrence data tables (here we've shortened it to the first 6 entries so that the output is not too long)
    getGBIFOccurrenceMembers()[1:6]

    ## $`http://purl.org/dc/terms/type`
    ## http://purl.org/dc/terms/type - Type (DEPRECATED)
    ## The nature or genre of the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/type
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Is replaced by: http://purl.org/dc/elements/1.1/type
    ##  Notes:
    ##      To provide a string literal value for type, use dc:type rather than this term. In accordance with the Darwin Core RDF guide, rdf:type should be used instead of this term to indicate an IRI value for type.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2009-12-07_1
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_20
    ##  Miscellaneous information:
    ##      This term is deprecated and should no longer be used.
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/modified`
    ## http://purl.org/dc/terms/modified - Date Modified
    ## The most recent date-time on which the resource was changed.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/modified
    ##  Version IRI: http://dublincore.org/usage/terms/history/#modified-003
    ##  Type: Property
    ##  Date modified: 2020-08-12
    ##  Notes:
    ##      Recommended best practice is to use a date that conforms to ISO 8601-1:2019.
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##  Examples:
    ##      1963-03-08T14:07-0600 (8 Mar 1963 at 2:07pm in the time zone six hours earlier than UTC). 2009-02-20T08:40Z (20 February 2009 8:40am UTC). 2018-08-29T15:19 (3:19pm local time on 29 August 2018). 1809-02-12 (some time during 12 February 1809). 1906-06 (some time in June 1906). 1971 (some time in the year 1971). 2007-03-01T13:00:00Z/2008-05-11T15:30:00Z (some time during the interval between 1 March 2007 1pm UTC and 11 May 2008 3:30pm UTC). 1900/1909 (some time during the interval between the beginning of the year 1900 and the end of the year 1909). 2007-11-13/15 (some time in the interval between 13 November 2007 and 15 November 2007).
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/language`
    ## http://purl.org/dc/terms/language - Language
    ## A language of the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/language
    ##  Version IRI: http://dublincore.org/usage/terms/history/#languageT-001
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Notes:
    ##      Recommended best practice is to use an IRI from the Library of Congress ISO 639-2 scheme http://id.loc.gov/vocabulary/iso639-2
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2019-12-01_19
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/license`
    ## http://purl.org/dc/terms/license - License
    ## A legal document giving official permission to do something with the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/license
    ##  Version IRI: http://dublincore.org/usage/terms/history/#license-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Executive committee decisions:
    ##      http://rs.tdwg.org/decisions/decision-2014-11-06_17
    ##  Examples:
    ##      http://creativecommons.org/publicdomain/zero/1.0/legalcode, http://creativecommons.org/licenses/by/4.0/legalcode
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/rightsHolder`
    ## http://purl.org/dc/terms/rightsHolder - Rights Holder
    ## A person or organization owning or managing rights over the resource.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/rightsHolder
    ##  Version IRI: http://dublincore.org/usage/terms/history/#rightsHolder-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Examples:
    ##      The Regents of the University of California
    ##  Miscellaneous information:
    ##      not in ABCD
    ## 
    ## $`http://purl.org/dc/terms/accessRights`
    ## http://purl.org/dc/terms/accessRights - Access Rights
    ## Information about who can access the resource or an indication of its security status.
    ## 
    ##  Defined in: https://dwc.tdwg.org/
    ##  IRI: http://purl.org/dc/terms/accessRights
    ##  Version IRI: http://dublincore.org/usage/terms/history/#accessRights-002
    ##  Type: Property
    ##  Date modified: 2008-01-14
    ##  Notes:
    ##      Access Rights may include information regarding access or restrictions based on privacy, security, or other policies.
    ##  Examples:
    ##      not-for-profit use only, https://www.fieldmuseum.org/field-museum-natural-history-conditions-and-suggested-norms-use-collections-data-and-images
    ##  Miscellaneous information:
    ##      not in ABCD

    # Call the initialisation function
    newTOVEOccTable <- initializeGBIFOccurrence(TOVEOccTableDF, "id", nameAutoMap = TRUE)
    # We can then check to see if the terms are mapped correctly
    # Terms with NA in the column index represent Darwin Core terms associated with the event data table that are not mapped
    # Not all terms need to be mapped to make a valid Darwin Core archive
    newTOVEOccTable$getTermMapping()

    ##                                                                  columnIndex
    ## http://purl.org/dc/terms/type                                              2
    ## http://purl.org/dc/terms/modified                                          3
    ## http://purl.org/dc/terms/language                                         NA
    ## http://purl.org/dc/terms/license                                          NA
    ## http://purl.org/dc/terms/rightsHolder                                     NA
    ## http://purl.org/dc/terms/accessRights                                     NA
    ## http://purl.org/dc/terms/bibliographicCitation                            NA
    ## http://purl.org/dc/terms/references                                       NA
    ## http://rs.tdwg.org/dwc/terms/institutionID                                NA
    ## http://rs.tdwg.org/dwc/terms/collectionID                                 NA
    ## http://rs.tdwg.org/dwc/terms/datasetID                                    NA
    ## http://rs.tdwg.org/dwc/terms/institutionCode                              NA
    ## http://rs.tdwg.org/dwc/terms/collectionCode                                4
    ## http://rs.tdwg.org/dwc/terms/datasetName                                  NA
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                         NA
    ## http://rs.tdwg.org/dwc/terms/basisOfRecord                                 5
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                          NA
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                          NA
    ## http://rs.tdwg.org/dwc/terms/dynamicProperties                            NA
    ## http://rs.tdwg.org/dwc/terms/materialSampleID                             NA
    ## http://rs.tdwg.org/dwc/terms/occurrenceID                                  6
    ## http://rs.tdwg.org/dwc/terms/catalogNumber                                 7
    ## http://rs.tdwg.org/dwc/terms/occurrenceRemarks                             8
    ## http://rs.tdwg.org/dwc/terms/recordNumber                                 NA
    ## http://rs.tdwg.org/dwc/terms/recordedBy                                   NA
    ## http://rs.gbif.org/terms/1.0/recordedByID                                 NA
    ## http://rs.tdwg.org/dwc/terms/individualCount                              NA
    ## http://rs.tdwg.org/dwc/terms/organismQuantity                              9
    ## http://rs.tdwg.org/dwc/terms/organismQuantityType                         10
    ## http://rs.tdwg.org/dwc/terms/sex                                          NA
    ## http://rs.tdwg.org/dwc/terms/lifeStage                                    NA
    ## http://rs.tdwg.org/dwc/terms/reproductiveCondition                        NA
    ## http://rs.tdwg.org/dwc/terms/behavior                                     NA
    ## http://rs.tdwg.org/dwc/terms/establishmentMeans                           NA
    ## http://rs.tdwg.org/dwc/terms/occurrenceStatus                             NA
    ## http://rs.tdwg.org/dwc/terms/preparations                                 NA
    ## http://rs.tdwg.org/dwc/terms/disposition                                  NA
    ## http://rs.tdwg.org/dwc/terms/otherCatalogNumbers                          NA
    ## http://rs.tdwg.org/dwc/terms/associatedMedia                              NA
    ## http://rs.tdwg.org/dwc/terms/associatedReferences                         NA
    ## http://rs.tdwg.org/dwc/terms/associatedSequences                          NA
    ## http://rs.tdwg.org/dwc/terms/associatedTaxa                               NA
    ## http://rs.tdwg.org/dwc/terms/organismID                                   NA
    ## http://rs.tdwg.org/dwc/terms/organismName                                 NA
    ## http://rs.tdwg.org/dwc/terms/organismScope                                NA
    ## http://rs.tdwg.org/dwc/terms/associatedOccurrences                        NA
    ## http://rs.tdwg.org/dwc/terms/associatedOrganisms                          NA
    ## http://rs.tdwg.org/dwc/terms/previousIdentifications                      NA
    ## http://rs.tdwg.org/dwc/terms/organismRemarks                              NA
    ## http://rs.tdwg.org/dwc/terms/eventID                                      11
    ## http://rs.tdwg.org/dwc/terms/parentEventID                                NA
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                             NA
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                              NA
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                               NA
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                               NA
    ## http://rs.tdwg.org/dwc/terms/eventDate                                    NA
    ## http://rs.tdwg.org/dwc/terms/eventTime                                    NA
    ## http://rs.tdwg.org/dwc/terms/startDayOfYear                               NA
    ## http://rs.tdwg.org/dwc/terms/endDayOfYear                                 NA
    ## http://rs.tdwg.org/dwc/terms/year                                         NA
    ## http://rs.tdwg.org/dwc/terms/month                                        NA
    ## http://rs.tdwg.org/dwc/terms/day                                          NA
    ## http://rs.tdwg.org/dwc/terms/verbatimEventDate                            NA
    ## http://rs.tdwg.org/dwc/terms/habitat                                      NA
    ## http://rs.tdwg.org/dwc/terms/fieldNumber                                  NA
    ## http://rs.tdwg.org/dwc/terms/fieldNotes                                   NA
    ## http://rs.tdwg.org/dwc/terms/eventRemarks                                 NA
    ## http://rs.tdwg.org/dwc/terms/locationID                                   NA
    ## http://rs.tdwg.org/dwc/terms/higherGeographyID                            NA
    ## http://rs.tdwg.org/dwc/terms/higherGeography                              NA
    ## http://rs.tdwg.org/dwc/terms/continent                                    NA
    ## http://rs.tdwg.org/dwc/terms/waterBody                                    NA
    ## http://rs.tdwg.org/dwc/terms/islandGroup                                  NA
    ## http://rs.tdwg.org/dwc/terms/island                                       NA
    ## http://rs.tdwg.org/dwc/terms/country                                      NA
    ## http://rs.tdwg.org/dwc/terms/countryCode                                  NA
    ## http://rs.tdwg.org/dwc/terms/stateProvince                                NA
    ## http://rs.tdwg.org/dwc/terms/county                                       NA
    ## http://rs.tdwg.org/dwc/terms/municipality                                 NA
    ## http://rs.tdwg.org/dwc/terms/locality                                     NA
    ## http://rs.tdwg.org/dwc/terms/verbatimLocality                             NA
    ## http://rs.tdwg.org/dwc/terms/verbatimElevation                            NA
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters                     NA
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters                     NA
    ## http://rs.tdwg.org/dwc/terms/verbatimDepth                                NA
    ## http://rs.tdwg.org/dwc/terms/minimumDepthInMeters                         NA
    ## http://rs.tdwg.org/dwc/terms/maximumDepthInMeters                         NA
    ## http://rs.tdwg.org/dwc/terms/minimumDistanceAboveSurfaceInMeters          NA
    ## http://rs.tdwg.org/dwc/terms/maximumDistanceAboveSurfaceInMeters          NA
    ## http://rs.tdwg.org/dwc/terms/locationAccordingTo                          NA
    ## http://rs.tdwg.org/dwc/terms/locationRemarks                              NA
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinates                          NA
    ## http://rs.tdwg.org/dwc/terms/verbatimLatitude                             NA
    ## http://rs.tdwg.org/dwc/terms/verbatimLongitude                            NA
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinateSystem                     NA
    ## http://rs.tdwg.org/dwc/terms/verbatimSRS                                  NA
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                              NA
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                             NA
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                                NA
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters                NA
    ## http://rs.tdwg.org/dwc/terms/coordinatePrecision                          NA
    ## http://rs.tdwg.org/dwc/terms/pointRadiusSpatialFit                        NA
    ## http://rs.tdwg.org/dwc/terms/footprintWKT                                 NA
    ## http://rs.tdwg.org/dwc/terms/footprintSRS                                 NA
    ## http://rs.tdwg.org/dwc/terms/footprintSpatialFit                          NA
    ## http://rs.tdwg.org/dwc/terms/georeferencedBy                              NA
    ## http://rs.tdwg.org/dwc/terms/georeferencedDate                            NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceProtocol                         NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceSources                          NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceVerificationStatus               NA
    ## http://rs.tdwg.org/dwc/terms/georeferenceRemarks                          NA
    ## http://rs.tdwg.org/dwc/terms/geologicalContextID                          NA
    ## http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem                  NA
    ## http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem                   NA
    ## http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem                   NA
    ## http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem                    NA
    ## http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem                 NA
    ## http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem                  NA
    ## http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries                  NA
    ## http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries                   NA
    ## http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage                     NA
    ## http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage                      NA
    ## http://rs.tdwg.org/dwc/terms/lowestBiostratigraphicZone                   NA
    ## http://rs.tdwg.org/dwc/terms/highestBiostratigraphicZone                  NA
    ## http://rs.tdwg.org/dwc/terms/lithostratigraphicTerms                      NA
    ## http://rs.tdwg.org/dwc/terms/group                                        NA
    ## http://rs.tdwg.org/dwc/terms/formation                                    NA
    ## http://rs.tdwg.org/dwc/terms/member                                       NA
    ## http://rs.tdwg.org/dwc/terms/bed                                          NA
    ## http://rs.tdwg.org/dwc/terms/identificationID                             NA
    ## http://rs.tdwg.org/dwc/terms/identifiedBy                                 NA
    ## http://rs.gbif.org/terms/1.0/identifiedByID                               NA
    ## http://rs.tdwg.org/dwc/terms/dateIdentified                               NA
    ## http://rs.tdwg.org/dwc/terms/identificationReferences                     NA
    ## http://rs.tdwg.org/dwc/terms/identificationRemarks                        NA
    ## http://rs.tdwg.org/dwc/terms/identificationQualifier                      NA
    ## http://rs.tdwg.org/dwc/terms/identificationVerificationStatus             NA
    ## http://rs.tdwg.org/dwc/terms/typeStatus                                   NA
    ## http://rs.tdwg.org/dwc/terms/taxonID                                      NA
    ## http://rs.tdwg.org/dwc/terms/scientificNameID                             NA
    ## http://rs.tdwg.org/dwc/terms/acceptedNameUsageID                          NA
    ## http://rs.tdwg.org/dwc/terms/parentNameUsageID                            NA
    ## http://rs.tdwg.org/dwc/terms/originalNameUsageID                          NA
    ## http://rs.tdwg.org/dwc/terms/nameAccordingToID                            NA
    ## http://rs.tdwg.org/dwc/terms/namePublishedInID                            NA
    ## http://rs.tdwg.org/dwc/terms/taxonConceptID                               NA
    ## http://rs.tdwg.org/dwc/terms/scientificName                               12
    ## http://rs.tdwg.org/dwc/terms/acceptedNameUsage                            NA
    ## http://rs.tdwg.org/dwc/terms/parentNameUsage                              NA
    ## http://rs.tdwg.org/dwc/terms/originalNameUsage                            NA
    ## http://rs.tdwg.org/dwc/terms/nameAccordingTo                              NA
    ## http://rs.tdwg.org/dwc/terms/namePublishedIn                              NA
    ## http://rs.tdwg.org/dwc/terms/namePublishedInYear                          NA
    ## http://rs.tdwg.org/dwc/terms/higherClassification                         NA
    ## http://rs.tdwg.org/dwc/terms/kingdom                                      13
    ## http://rs.tdwg.org/dwc/terms/phylum                                       14
    ## http://rs.tdwg.org/dwc/terms/class                                        15
    ## http://rs.tdwg.org/dwc/terms/order                                        16
    ## http://rs.tdwg.org/dwc/terms/family                                       17
    ## http://rs.tdwg.org/dwc/terms/genus                                        18
    ## http://rs.tdwg.org/dwc/terms/subgenus                                     NA
    ## http://rs.tdwg.org/dwc/terms/specificEpithet                              NA
    ## http://rs.tdwg.org/dwc/terms/infraspecificEpithet                         19
    ## http://rs.tdwg.org/dwc/terms/taxonRank                                    NA
    ## http://rs.tdwg.org/dwc/terms/verbatimTaxonRank                            NA
    ## http://rs.tdwg.org/dwc/terms/scientificNameAuthorship                     NA
    ## http://rs.tdwg.org/dwc/terms/vernacularName                               20
    ## http://rs.tdwg.org/dwc/terms/nomenclaturalCode                            NA
    ## http://rs.tdwg.org/dwc/terms/taxonomicStatus                              NA
    ## http://rs.tdwg.org/dwc/terms/nomenclaturalStatus                          NA
    ## http://rs.tdwg.org/dwc/terms/taxonRemarks                                 NA
    ##                                                                            columnName
    ## http://purl.org/dc/terms/type                                                    type
    ## http://purl.org/dc/terms/modified                                            modified
    ## http://purl.org/dc/terms/language                                                <NA>
    ## http://purl.org/dc/terms/license                                                 <NA>
    ## http://purl.org/dc/terms/rightsHolder                                            <NA>
    ## http://purl.org/dc/terms/accessRights                                            <NA>
    ## http://purl.org/dc/terms/bibliographicCitation                                   <NA>
    ## http://purl.org/dc/terms/references                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/institutionID                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/collectionID                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/datasetID                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/institutionCode                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/collectionCode                            collectionCode
    ## http://rs.tdwg.org/dwc/terms/datasetName                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/ownerInstitutionCode                                <NA>
    ## http://rs.tdwg.org/dwc/terms/basisOfRecord                              basisOfRecord
    ## http://rs.tdwg.org/dwc/terms/informationWithheld                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/dataGeneralizations                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/dynamicProperties                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/materialSampleID                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/occurrenceID                                occurrenceID
    ## http://rs.tdwg.org/dwc/terms/catalogNumber                              catalogNumber
    ## http://rs.tdwg.org/dwc/terms/occurrenceRemarks                      occurrenceRemarks
    ## http://rs.tdwg.org/dwc/terms/recordNumber                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/recordedBy                                          <NA>
    ## http://rs.gbif.org/terms/1.0/recordedByID                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/individualCount                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/organismQuantity                        organismQuantity
    ## http://rs.tdwg.org/dwc/terms/organismQuantityType                organismQuantityType
    ## http://rs.tdwg.org/dwc/terms/sex                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/lifeStage                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/reproductiveCondition                               <NA>
    ## http://rs.tdwg.org/dwc/terms/behavior                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/establishmentMeans                                  <NA>
    ## http://rs.tdwg.org/dwc/terms/occurrenceStatus                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/preparations                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/disposition                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/otherCatalogNumbers                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedMedia                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedReferences                                <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedSequences                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedTaxa                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/organismID                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/organismName                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/organismScope                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedOccurrences                               <NA>
    ## http://rs.tdwg.org/dwc/terms/associatedOrganisms                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/previousIdentifications                             <NA>
    ## http://rs.tdwg.org/dwc/terms/organismRemarks                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/eventID                                          eventID
    ## http://rs.tdwg.org/dwc/terms/parentEventID                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/samplingProtocol                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/sampleSizeValue                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/sampleSizeUnit                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/samplingEffort                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/eventDate                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/eventTime                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/startDayOfYear                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/endDayOfYear                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/year                                                <NA>
    ## http://rs.tdwg.org/dwc/terms/month                                               <NA>
    ## http://rs.tdwg.org/dwc/terms/day                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimEventDate                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/habitat                                             <NA>
    ## http://rs.tdwg.org/dwc/terms/fieldNumber                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/fieldNotes                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/eventRemarks                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/locationID                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/higherGeographyID                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/higherGeography                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/continent                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/waterBody                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/islandGroup                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/island                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/country                                             <NA>
    ## http://rs.tdwg.org/dwc/terms/countryCode                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/stateProvince                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/county                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/municipality                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/locality                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimLocality                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimElevation                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumElevationInMeters                            <NA>
    ## http://rs.tdwg.org/dwc/terms/maximumElevationInMeters                            <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimDepth                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumDepthInMeters                                <NA>
    ## http://rs.tdwg.org/dwc/terms/maximumDepthInMeters                                <NA>
    ## http://rs.tdwg.org/dwc/terms/minimumDistanceAboveSurfaceInMeters                 <NA>
    ## http://rs.tdwg.org/dwc/terms/maximumDistanceAboveSurfaceInMeters                 <NA>
    ## http://rs.tdwg.org/dwc/terms/locationAccordingTo                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/locationRemarks                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinates                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimLatitude                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimLongitude                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimCoordinateSystem                            <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimSRS                                         <NA>
    ## http://rs.tdwg.org/dwc/terms/decimalLatitude                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/decimalLongitude                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/geodeticDatum                                       <NA>
    ## http://rs.tdwg.org/dwc/terms/coordinateUncertaintyInMeters                       <NA>
    ## http://rs.tdwg.org/dwc/terms/coordinatePrecision                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/pointRadiusSpatialFit                               <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintWKT                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintSRS                                        <NA>
    ## http://rs.tdwg.org/dwc/terms/footprintSpatialFit                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferencedBy                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferencedDate                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceProtocol                                <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceSources                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceVerificationStatus                      <NA>
    ## http://rs.tdwg.org/dwc/terms/georeferenceRemarks                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/geologicalContextID                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEonOrLowestEonothem                         <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEonOrHighestEonothem                          <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEraOrLowestErathem                          <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEraOrHighestErathem                           <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestPeriodOrLowestSystem                        <NA>
    ## http://rs.tdwg.org/dwc/terms/latestPeriodOrHighestSystem                         <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestEpochOrLowestSeries                         <NA>
    ## http://rs.tdwg.org/dwc/terms/latestEpochOrHighestSeries                          <NA>
    ## http://rs.tdwg.org/dwc/terms/earliestAgeOrLowestStage                            <NA>
    ## http://rs.tdwg.org/dwc/terms/latestAgeOrHighestStage                             <NA>
    ## http://rs.tdwg.org/dwc/terms/lowestBiostratigraphicZone                          <NA>
    ## http://rs.tdwg.org/dwc/terms/highestBiostratigraphicZone                         <NA>
    ## http://rs.tdwg.org/dwc/terms/lithostratigraphicTerms                             <NA>
    ## http://rs.tdwg.org/dwc/terms/group                                               <NA>
    ## http://rs.tdwg.org/dwc/terms/formation                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/member                                              <NA>
    ## http://rs.tdwg.org/dwc/terms/bed                                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/identificationID                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/identifiedBy                                        <NA>
    ## http://rs.gbif.org/terms/1.0/identifiedByID                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/dateIdentified                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/identificationReferences                            <NA>
    ## http://rs.tdwg.org/dwc/terms/identificationRemarks                               <NA>
    ## http://rs.tdwg.org/dwc/terms/identificationQualifier                             <NA>
    ## http://rs.tdwg.org/dwc/terms/identificationVerificationStatus                    <NA>
    ## http://rs.tdwg.org/dwc/terms/typeStatus                                          <NA>
    ## http://rs.tdwg.org/dwc/terms/taxonID                                             <NA>
    ## http://rs.tdwg.org/dwc/terms/scientificNameID                                    <NA>
    ## http://rs.tdwg.org/dwc/terms/acceptedNameUsageID                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/parentNameUsageID                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/originalNameUsageID                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/nameAccordingToID                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/namePublishedInID                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/taxonConceptID                                      <NA>
    ## http://rs.tdwg.org/dwc/terms/scientificName                            scientificName
    ## http://rs.tdwg.org/dwc/terms/acceptedNameUsage                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/parentNameUsage                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/originalNameUsage                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/nameAccordingTo                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/namePublishedIn                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/namePublishedInYear                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/higherClassification                                <NA>
    ## http://rs.tdwg.org/dwc/terms/kingdom                                          kingdom
    ## http://rs.tdwg.org/dwc/terms/phylum                                            phylum
    ## http://rs.tdwg.org/dwc/terms/class                                              class
    ## http://rs.tdwg.org/dwc/terms/order                                              order
    ## http://rs.tdwg.org/dwc/terms/family                                            family
    ## http://rs.tdwg.org/dwc/terms/genus                                              genus
    ## http://rs.tdwg.org/dwc/terms/subgenus                                            <NA>
    ## http://rs.tdwg.org/dwc/terms/specificEpithet                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/infraspecificEpithet                infraspecificEpithet
    ## http://rs.tdwg.org/dwc/terms/taxonRank                                           <NA>
    ## http://rs.tdwg.org/dwc/terms/verbatimTaxonRank                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/scientificNameAuthorship                            <NA>
    ## http://rs.tdwg.org/dwc/terms/vernacularName                            vernacularName
    ## http://rs.tdwg.org/dwc/terms/nomenclaturalCode                                   <NA>
    ## http://rs.tdwg.org/dwc/terms/taxonomicStatus                                     <NA>
    ## http://rs.tdwg.org/dwc/terms/nomenclaturalStatus                                 <NA>
    ## http://rs.tdwg.org/dwc/terms/taxonRemarks                                        <NA>

### Creating Metadata

In Darwin Core archive files the standard format for handling metadata
is [EML](https://eml.ecoinformatics.org/), a flavour of XML specifically
designed for the handling of ecological metadata. We can extract the EML
file for the TOV-E data from the Darwin Core archive file using the
following code:

    # Extract the EML file from the Darwin Core archive file
    unzip(localDataLoc, "eml.xml", exdir = tempDirLoc)
    # Print the first few lines of the EML file to get an idea of the structure of the file
    cat(readLines(con = file.path(tempDirLoc, "eml.xml"), n = 20, encoding = "UTF-8"), sep = "\n")

    ## <eml:eml xmlns:eml="eml://ecoinformatics.org/eml-2.1.1"
    ##          xmlns:dc="http://purl.org/dc/terms/"
    ##          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    ##          xsi:schemaLocation="eml://ecoinformatics.org/eml-2.1.1 http://rs.gbif.org/schema/eml-gbif-profile/1.1/eml.xsd"
    ##          packageId="4a00502d-6342-4294-aad1-9727e5c24041/v1.4" system="http://gbif.org" scope="system"
    ##          xml:lang="eng">
    ## 
    ## <dataset>
    ##   <alternateIdentifier>4a00502d-6342-4294-aad1-9727e5c24041</alternateIdentifier>
    ##   <alternateIdentifier>https://ipt.nina.no/resource?r=tove_birdsampling</alternateIdentifier>
    ##   <title xml:lang="eng">TOV-E Bird monitoring sampling data</title>
    ##       <creator>
    ##     <individualName>
    ##         <givenName>John Atle</givenName>
    ##       <surName>Kålås</surName>
    ##     </individualName>
    ##     <organizationName>Norwegian Institute for Nature Research</organizationName>
    ##     <positionName>Senior Researcher</positionName>
    ##     <address>
    ##         <deliveryPoint>Postboks 5685 Sluppen</deliveryPoint>

It is also possible to look at the entire EML file in a seperate browser
by running the following code:

    browseURL(file.path(tempDirLoc, "eml.xml"))

From the EML file we can generate a DwCMetadata object by calling the
‘initializeDwCMetadata’ function. This function takes one argument,
which is the location of the file to import the metadata information
from. This can be an EML file or a Darwin Core archive file.

    # Initialise the metadata from the EML file extracted from the Darwin Core archive
    newTOVEMetadata <- initializeDwCMetadata(file.path(tempDirLoc, "eml.xml"),
      fileType = "eml" # This line is not required if the file has the ".xml" file extension
    )
    # Alternatively the metadata object can be imported directly from the Darwin Core archive file
    newTOVEMetadata <- initializeDwCMetadata(localDataLoc,
      fileType = "darwincore" # This line is not required if the file has the ".zip" file extension
    )

However, these methods assume that the researcher already has an EML
file that can be used for initialisation of the metadata object. In many
instances, the researcher will not have the EML readily available, and
in situations where the researcher is unfamiliar with the standard, the
process to create an EML can be rather laborious. To help alleviate
this, the Living Norway adds a number of functions to aid in the
creation of EML files. Instead of formatting the metadata according to
the EML standard, the researcher can instead use [R
markdown](https://rmarkdown.rstudio.com/) to create a text document
describing the dataset. In this text document the researcher can simply
add tagging functions to sections of text that they wish to be exported
to the EML file.

R markdown is a simple text-based documentation language and can be
thought of as an extension of simple text files with some extra support
for formatting and display of text elements. In addition R markdown
allows for the embedding of R code within the document which can be used
to draw figures or make tables from data. This can be very useful for
describing or displaying aspects of data sets.

A very simple minimal example of the use of markdown to generate create
metadata documentation can be found at the [Living Norway Git
Repository](https://raw.githubusercontent.com/LivingNorway/LivingNorwayR/master/vignettes/LNWorkshopExample_TOV-E_Metadata.rmd).

    # Initialise the metadata from the R markdown file hosted at TODO
    download.file("https://raw.githubusercontent.com/LivingNorway/LivingNorwayR/master/vignettes/LNWorkshopExample_TOV-E_Metadata.rmd",
      file.path(tempDirLoc, "LNWorkshopExample_Metadata.rmd"))
    createdTOVEMetadata <- initializeDwCMetadata(file.path(tempDirLoc, "LNWorkshopExample_Metadata.rmd"),
      fileType = "rmarkdown" # This line is not required if the file has the ".rmd" or ".md" file extension
    )
    # Export the newly created metadata as an EML file
    createdTOVEMetadata$exportToEML(file.path(tempDirLoc, "newMetadata.xml"))

    ## NULL

and again the created metadata can be viewed in a browser using the
following command:

    browseURL(file.path(tempDirLoc, "newMetadata.xml"))

### Putting it All Together

Now we have all the components that we need to package the data tables
and the metadata together into one Darwin Core archive object. This can
be done through calling the `initializeDwCArchive` function giving the
core table as the first argument, a list of all the extension tables as
the second argument, and a `DwCMetadata` object as the third argument.

    newTOVEArchive <- initializeDwCArchive(newTOVEEventTable, list(newTOVEOccTable), newTOVEMetadata)

Finally, we can then export it as a to whichever location we wish to
store it to.

    newTOVEArchive$exportAsDwCArchive(file.path(tempDirLoc, "newDwCArchive.zip"))

This Darwin Core archive file can now serve as a useful interchange
format that ensures that all the data and metadata are packaged together
and that they are both described used known biodiversity standards. Thus
satisfying the basic tenants of FAIR data sharing and allowing your data
to be indexed by biodiversity databases such as GBIF.
