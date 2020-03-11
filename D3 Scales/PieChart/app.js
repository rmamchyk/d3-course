// Data
var data = [ 35, 6, 20, 47, 19];
var chart_width = 600;
var chart_height = 600;
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Pie Layout
const pie = d3.pie();

// Arc
const outer_radius = chart_width / 2;
const inner_radius = 200;
const arc = d3.arc()
  .innerRadius(inner_radius) 
  .outerRadius(outer_radius);

// Create SVG Element
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Groups
const arcs = svg.selectAll('g.arc')
  .data(pie(data))
  .enter()
  .append('g')
  .attr('class', 'arc')
  .attr('transform', `translate(${outer_radius}, ${chart_height / 2})`);

// Arcs
arcs.append('path')
  .attr('fill', (d, i) => color(i))
  .attr('d', arc);

// Labels
arcs.append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.value);
