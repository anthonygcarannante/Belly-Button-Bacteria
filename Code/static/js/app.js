
// Initialize the webpage when it first loads to show default data
function init() {

  var selector = d3.select('#selDataset');

  d3.json("../Code/samples.json").then(data => {
    
    var sampleNames = data.names;
    sampleNames.forEach(sample => {
      selector.append("option")
      .text(sample)
      .property("value", sample);
    })

  var initialSample = sampleNames[0];
  buildChart(initialSample);
  });
}

function buildChart(sample) {

  d3.json("../Code/samples.json").then(data => {
    
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0]

    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    var ytick = otuIds.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    
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

    Plotly.newPlot('bar',barData);

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

    Plotly.newPlot("bubble", bubbleData, bubbleFormat);

  })
}

function optionChanged(newSample) {
  buildChart(newSample);
}

init();