
// Initialize the webpage when it first loads to show default data
function init() {

  d3.json("../StarterCode/samples.json").then(data => {
    
    var sampleName = data.names;

    var initialSample = sampleName[0];

    // console.log(initialSample);
    buildChart(initialSample);
  });
  
  

  // buildChart(initSample);
  // buildMetadata(initSample);
}

function buildMetadata(sample) {

}

function buildChart(sample) {

  d3.json("../StarterCode/samples.json").then(data => {
    
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id);
    var result = resultArray[0]

    var otuIds = result.otuids;
    var otuLabels = result.otuLabels;
    var sampleValues = result.sample_values;

    console.log(sampleValues);

  })
  // console.log(sample);

}



init();