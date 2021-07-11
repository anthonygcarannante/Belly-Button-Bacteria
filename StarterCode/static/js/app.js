
// Initialize the webpage when it first loads to show default data
function init() {

  var selector = d3.select('#selDataset');

  d3.json("../StarterCode/samples.json").then(data => {
    
    var sampleName = data.names;
    sampleName.forEach(sample => {
      selector.append('option')
        .text(sample)
        .property('value', sample)
    });

    var initialSample = sampleName[0];
    buildChart(initialSample);
  });
}

function buildMetadata(sample) {

}

function buildChart(sample) {

  d3.json("../StarterCode/samples.json").then(data => {
    
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id);
    var result = resultArray[0]

    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    var ytick = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`)
    
    var barData = [
      {
        y: ytick,
        x: sampleValues.slice(0,10).reverse(),
        text: otuLabels.slice(0,10).reverse(), 
        type: 'bar',
        orientation: 'h'
      }
    ]

    Plotly.newPlot('bar',barData);

  })

}

function optionChanged(newSample) {
  buildChart(newSample);
}

init();