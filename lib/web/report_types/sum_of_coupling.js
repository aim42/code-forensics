var d3 = require('d3');

var filters      = require('../filters/index.js'),
    DiagramModel = require('../diagrams/bar_chart/vertical_bar_chart_model.js');

module.exports = function(manifest) {
  return {
    metadata: {
      title: 'Sum of coupling analysis',
      description: 'modules most frequently coupled with others in single commits',
      dateRange: manifest.parseDateRange()
    },
    graphModels: [
      {
        id: 'soc',
        dataFile: manifest.dataFiles[0].fileUrl,
        templates: [
          { name: 'controls-template', type: 'ko', id: 'text-filters-control-template', file: 'text-filters-control-template.html' },
        ],
        diagram: {
          type: 'default',
          Model: DiagramModel,
          configuration: {
            style: {
              cssClass: 'bar-chart-diagram',
              width: 960,
              height: 680,
              margin: { top: 30, right: 10, bottom: 0, left: 10 },
              barWidth: 25,
              barColor: '#BFDDFB'
            },
            series: {
              x: { scale: d3.scaleLinear(), labelProperty: 'path', valueProperty: 'path' },
              y: { scale: d3.scaleLinear(), valueProperty: 'soc', labelProperty: '' }
            },
            filters: { pathFilter: new filters.RegExpValue('File path') }
          }
        }
      }
    ]
  };
};