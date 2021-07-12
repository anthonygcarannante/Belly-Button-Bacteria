
// Initialize the webpage when it first loads to show default data
function init() {

  // Select the dropdown selector class
  var selector = d3.select('#selDataset');

  // Load data
  d3.json("../Code/samples.json").then(data => {
    
    // Create downdown options for all test subjects with the ID number
    var sampleNames = data.names;
    sampleNames.forEach(sample => {
      selector.append("option")
      .text(sample)
      .property("value", sample);
    })

    // Initialize webpage and bar chart with first set of data
    var initialSample = sampleNames[0];
    buildChart(initialSample);
    buildMetadata(initialSample);
  });
}

function buildChart(sample) {

  // Read in Data file
  d3.json("../Code/samples.json").then(data => {
    
    // Store data from the Test Subject chosen from the drop down
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0]

    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    // Format tick markers for y axis
    var ytick = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    // Format and input data for bar chart
    var barLayout = {
      title: `Top Bacteria Found in Test Subject ${sample}`,
    }
    var barData = [
      {
        y: ytick,
        x: sampleValues.slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse(), 
        type: 'bar',
        orientation: 'h',
        marker: {
          color: 'rgb(100, 83, 50)'
        }
      }
    ]

    // Plot bar chart
    Plotly.newPlot('bar',barData, barLayout);

    // Format and input data for bubble chart
    var bubbleFormat = {
      title: "Bacteria Cultures per Sample Recorded",
      margin: {t: 0},
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      margin: {t: 30}
    }
    var bubbleData = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "darkmint"
        }
      }
    ];

    // Plot bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleFormat);

  })
}

// Function to load data based on the dropdown option chosen by the user
function optionChanged(newSample) {
  buildChart(newSample);
  buildMetadata(newSample);
}

function buildMetadata(sample) {
  d3.json("../Code/samples.json").then(data => {
    var metaData = data.metadata;
    var resultArray = metaData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6")
        .text(`${key.toUpperCase()}: ${value}`)
    })
  })
}

init();