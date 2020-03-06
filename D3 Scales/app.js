var data = [];
for (let i = 0; i < 5; i++) {
    const num = Math.floor(d3.randomUniform(1, 50)());
    data.push(num);
}

const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
const BAR_PADDING = 5;

// create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

// bind data and create bars
svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return i * (CHART_WIDTH / data.length);
    })
    .attr('y', d => {
        return CHART_HEIGHT - d * 5;
    })
    .attr('width', CHART_WIDTH / data.length - BAR_PADDING)
    .attr('height', d => {
        return d * 5;
    })
    .style('fill', '#7ED26D');

// create labels
svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => {
        return d;
    })
    .attr('x', (d, i) => {
        return i * (CHART_WIDTH / data.length) +
                    (CHART_WIDTH / data.length - BAR_PADDING) / 2;
    })
    .attr('y', d => {
        return CHART_HEIGHT - d * 5 + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle');
