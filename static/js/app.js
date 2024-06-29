// Define the json URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Build the metadata panel
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    console.log(data)

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    metadatafilter = metadata.filter(sampleid => sampleid.id == sample);
    // console.log(metadatafilter);
    metadataresults = metadatafilter[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let metapanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metapanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadataresults).forEach(([key, value]) => {
      metapanel.append("p").text(`${key}:${value}`)
    })
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json(url).then((data) => {
    console.log(data);

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleResult = samples.filter(sampleid => sampleid.id == sample);

    // let samplefilter = samples.filter(sampleid => sampleid.id === sample);

    // console.log(samplefilter);
    let samplefilterresult = sampleResult[0];
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = samplefilterresult.otu_ids;
    let otu_labels = samplefilterresult.otu_labels;
    let sample_values = samplefilterresult.sample_values

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        opacity: [0.6],
        size: sample_values

      }
    };
    let bubbleData = [trace1];

    let layout = {
      title: 'Bacteria Culture Per Sample',
      showlegend: false,
      height: 600,
      hovermode: 'closest',
      xaxis: { title: 'out ID' },
    };

    // Render the Bubble Chart
    // plotly.newPlot("plot", bubbleData, layout);
    Plotly.newPlot("bubble", bubbleData, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let slicedIds = otu_ids.slice(0, 10).reverse();
    let sample_valuesSliced = sample_values.slice(0, 10).reverse();
    let otu_labelsSliced = otu_labels.slice(0, 10).reverse();
    // console.log(otu_labelsSliced,slicedIds,sample_valuesSliced)

    let trace2 = {
      x: sample_valuesSliced,
      y: slicedIds.map((id) => `OTU ${id}`),
      text: otu_labelsSliced,
      type: 'bar',
      orientation: 'h',
    };
    let bardata = [trace2];
    let barlayout = {
      title: 'Top 10 Bacteria Cultures'
    };

    // Render the Bar 
    Plotly.newPlot("bar", bardata, barlayout);

    // plotly.newPlot("bar", bardata, barlayout);

  });
}

// Function to run on page load

function init() {
  d3.json(url).then((data) => {
    // console.log(data)

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    Object.values(names).forEach(item => {
      dropdown.append('option').text(item)
    });

    // Get the first sample from the list
    let selectedvalues = names[0]


    // Build charts and metadata panel with the first sample
    buildMetadata(selectedvalues),
      buildCharts(selectedvalues),
      init

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  d3.selectAll('#selDataset').on('change',
    buildMetadata(newSample),
    buildCharts(newSample),
    init
  )

}

// Initialize the dashboard
init();
