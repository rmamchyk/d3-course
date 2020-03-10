const data = [
    [ 400, 200 ],
    [ 210,140 ],
    [ 722,300 ],
    [ 70,160 ],
    [ 250,50 ],
    [ 110,280 ],
    [ 699,225 ],
    [ 90, 220 ]
];

const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const PADDING = 50;

// Create SVG Element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

// Create Scales
const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[0])])
    .range([PADDING, CHART_WIDTH - PADDING * 2]);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[1])])
    .range([CHART_HEIGHT - PADDING, PADDING]);

const rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d[1])])
    .range([0, 25]);

// Create Axis
const xAxis = d3.axisBottom(xScale)
    // .ticks(5);
    // .tickValues([0, 150, 250, 600, 700]);
svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${CHART_HEIGHT - PADDING})`)
    .call(xAxis);

const yAxis = d3.axisLeft(yScale)
    .ticks(5);
    // .tickFormat(d => d + '%');
svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${PADDING}, 0)`)
    .call(yAxis);

// Create Circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return xScale(d[0])
    })
    .attr('cy', d => {
        return yScale(d[1])
    })
    .attr('r', d => {
        return rScale(d[1])
    })
    .attr('fill', '#d1ab0e');

// Create Labels
svg.append('g')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => {
        return d.join(',');
    })
    .attr('x', d => {
        return xScale(d[0]);
    })
    .attr('y', d => {
        return yScale(d[1])
    });
