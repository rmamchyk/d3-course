// const data = [];
// for (let i = 0; i < 15; i++) {
//     const num = Math.floor(d3.randomUniform(1, 50)());
//     data.push(num);
// }

const data = [6,20,21,14,2,30,7,16,25,5,11,28,10,26,9];

const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const BAR_PADDING = 5;

// Create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

// Create Scales
const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, CHART_WIDTH])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, CHART_HEIGHT]);


// Bind data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return xScale(i);
    })
    .attr('y', d => {
        return CHART_HEIGHT - yScale(d);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', d => {
        return yScale(d);
    })
    .style('fill', '#7ED26D');

// Create labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => {
        return d;
    })
    .attr('x', (d, i) => {
        return xScale(i ) + xScale.bandwidth() / 2;
    })
    .attr('y', d => {
        return CHART_HEIGHT - yScale(d) + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');

// Events
d3.select('button').on('click', () => {
    data.reverse();

    svg.selectAll('rect')
        .data(data)
        .transition()
        .delay((d, i) => {
            return i / data.length * 1000;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .attr('y', d => {
            return CHART_HEIGHT - yScale(d);
        })
        .attr('height', d => {
            return yScale(d);
        });

    svg.selectAll('text')
        .data(data)
        .transition()
        .delay((d, i) => {
            return i / data.length * 1000;
        })
        .duration(1000)
        .ease(d3.easeElasticOut)
        .text(d => d)
        .attr('x', (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', d => {
            return CHART_HEIGHT - yScale(d) + 15;
        });
})
