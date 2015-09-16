var dayOfWeekChart = dc.rowChart("#day-of-week-chart");

var filteredData = {};
var queryFilter = {};

   var dateFormat = d3.time.format('%m/%d/%Y');
    var numberFormat = d3.format('.2f');


var refresh = function(queryFilter){
  d3.json("/refresh?filter="+JSON.stringify(queryFilter), function(d){
    console.log(d);
    filteredData = d;
    //init();
  });
}

var dayOfWeekDim = {
  filter: function(f){
    if(f){
      queryFilter["dayOfWeekGroup"]=f;
      refresh(queryFilter);
    }
  },
  filterAll: function(){

  }
};
var dayOfWeekGroup = {
   all: function(){
console.log(filteredData);
    return filteredData["dayOfWeekGroup"].values;
   },
   order: function(){

   },
   top: function(){
   }
};

dayOfWeekChart.width(280)
  .height(300)
  .dimension(dayOfWeekDim)
  .group(dayOfWeekGroup)
  .renderLabel(true)
  .elasticX(true)
  .margins({top: 10, right: 20, bottom: 20, left: 20})
dayOfWeekChart.filterHandler(function(dimension, filters){
  if(filters)
      dimension.filter(filters);
  else
      dimension.filter(null);
  return filters; 
});


var yearlyDimension = {
  filter: function(f){
    if(f){
      queryFilter["yearlyDimension"]=f;
      refresh(queryFilter);
    }
  },
  filterAll: function(){

  }
};

var yearlyPerformanceGroup = {
   all: function(){
    console.log(filteredData);
    return filteredData["yearlyPerformanceGroup"].values;
   },
   order: function(){

   },
   top: function(){
   }
};


var yearlyBubbleChart = dc.bubbleChart("#yearly-bubble-chart");
yearlyBubbleChart.width(900)
  .height(250)
  .transitionDuration(1500)
  .margins({top: 10, right: 50, bottom: 30, left: 40})
  .dimension(yearlyDimension)
  .group(yearlyPerformanceGroup)
   .colors(colorbrewer.RdYlGn[9])
  .colorDomain([-500, 500])
  .colorAccessor(function (d) {
            return d.value.absGain;
   })
  .keyAccessor(function (p) {
          return p.value.absGain;
  })
  .valueAccessor(function (p) {
      return p.value.percentageGain;
  })
  .radiusValueAccessor(function (p) {
    return p.value.fluctuationPercentage;
  })
  .renderLabel(true)
  .label(function (p) {
      return p.key;
  })
  .renderTitle(true)
 .maxBubbleRelativeSize(0.3)
        .x(d3.scale.linear().domain([-2500, 2500]))
        .y(d3.scale.linear().domain([-100, 100]))
        .r(d3.scale.linear().domain([0, 4000]))
  .title(function (p) {
      return [
          p.key,
          'Index Gain: ' + numberFormat(p.value.absGain),
          'Index Gain in Percentage: ' + numberFormat(p.value.percentageGain) + '%',
          'Fluctuation / Index Ratio: ' + numberFormat(p.value.fluctuationPercentage) + '%'
      ].join('\n');
  })

function init(){

  d3.json("/refresh?filter={}", function(d){
    filteredData = d;
    dc.renderAll();
    //init();
  });
}

init();
