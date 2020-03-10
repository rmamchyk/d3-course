const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const PADDING = 50;

const data = [
    { date: '07/01/2017', num: 20 },
    { date: '07/02/2017', num: 37 },
    { date: '07/03/2017', num: 25 },
    { date: '07/04/2017', num: 45 },
    { date: '07/05/2017', num: 23 },
    { date: '07/06/2017', num: 33 },
    { date: '07/07/2017', num: 49 },
    { date: '07/08/2017', num: 40 },
    { date: '07/09/2017', num: 36 },
    { date: '07/10/2017', num: 27 },
];

const timeParse = d3.timeParse('%m/%d/%Y');
const timeFormat = d3.timeFormat('%b %e')

// Loop through each date
data.forEach(item => {
    item.date = timeParse(item.date);
});

// Create SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

// Create Scales
const xScale = d3.scaleTime()
    .domain([
        d3.min(data, d => d.date),
        d3.max(data, d => d.date)
    ])
    .range([PADDING, CHART_WIDTH - PADDING * 2]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([CHART_HEIGHT - PADDING, PADDING]);

const rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, 25]);

// Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return xScale(d.date)
    })
    .attr('cy', d => {
        return yScale(d.num)
    })
    .attr('r', d => {
        return rScale(d.num)
    })
    .attr('fill', '#d1ab0e');

// Create Labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => {
        return timeFormat(d.date);
    })
    .attr('x', d => {
        return xScale(d.date);
    })
    .attr('y', d => {
        return yScale(d.num)
    });
