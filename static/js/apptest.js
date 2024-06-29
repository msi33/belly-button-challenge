


// // Build the metadata panel


function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    // let metadatafilter = metadata.filter(sampleID =>sampleID.id==sample);
    let metadatafilter = metadata.filter(sampleid => sampleid.id == sample);
    let result = metadatafilter[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    sampleresult = d3.select("#sample-metadata")

    // var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sampleresult.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    Object.entries(metadatafilter).forEach(([key, value]) => {
      sampleresult.append("h6").text(`${key.toUpperCase()}: ${value}`);

    });
  }

// function to build both charts
function buildCharts(sample) {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

        // Get the samples field
        let samples = data.samples;

        // Filter the samples for the object with the desired sample number
        let samplefilter = samples.filter(sampleid => sampleid.id == sample);

        // Get the otu_ids, otu_labels, and sample_values
        let otu_ids = samplefilter.otu_ids;
        let otu_labels = samplefilter.otu_labels;
        let sample_values = samplefilter.sample_values;


        // Build a Bubble Chart
        let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          type: "bubble"
        }

        // Render the Bubble Chart
        let data = [trace1];
        // let layout = {
        //   title: "Top 10 Bacteria Cultures Found",
        //   margin: { l: 100, r: 100, t: 100, b: 100 }
        // };
        // plotly.newPlot("plot", data, layout)
        plotly.newPlot("plot", data)

        // Build a Bar Chart
        // Don't forget to slice and reverse the input data appropriately
        // For the Bar Chart, map the otu_ids to a list of strings for your yticks
        let slicedIds = otu_ids.slice(0, sample);
        slicedIds.reverse();
        let trace2 = {
          x: slicedIds.map(Object => Object.otu_ids),
          y: sample_values,
          text: otu_labels,
          type: "bar"
        }
        let data = [trace2];
        // Render the Bar Chart
        plotly.newPlot("plot", data);

      });
    }

// Function to run on page load
function init() {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

        //  Get the names field
        let names = data.names;

        // Use d3 to select the dropdown with id of `#selDataset`
        let dropdownMenu = d3.select('#selDataset');

        // Use the list of sample names to populate the select options
        // Hint: Inside a loop, you will need to use d3 to append a new
        // option for each sample name.
        names.forEach((mimi) => {
          dropdownMenu.append("option")
            .text(mimi)
            .property("value", mimi)
        })


        //  Get the first sample from the list
        let firstSample = names[0];


        // Build charts and metadata panel with the first sample
        buildBarChart(firstSample);
        buildMetadata(firstSample);


      });
    }

// Function for event listener
function optionChanged(newSample) {
      //   // Build charts and metadata panel each time a new sample is selected
      buildBarChart(newSample);
      buildMetadata(newSample);
    })

  // // Initialize the dashboard
  init();

