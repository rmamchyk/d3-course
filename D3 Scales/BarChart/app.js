// const data = [];
// for (let i = 0; i < 15; i++) {
//     const num = Math.floor(d3.randomUniform(1, 50)());
//     data.push(num);
// }

const data = [
    { key: 0, num: 6 },
    { key: 1, num : 20 },
    { key: 2, num : 21 },
    { key: 3, num : 14 },
    { key: 4, num : 2 },
    { key: 5, num : 30 },
    { key: 6, num : 7 },
    { key: 7, num : 16 },
    { key: 8, num : 25 },
    { key: 9, num : 5 },
    { key: 10, num : 11 },
    { key: 11, num : 28 },
    { key: 12, num : 10 },
    { key: 13, num : 26 },
    { key: 14, num : 9 }
];

const key = d => d.key;

const CHART_WIDTH = 800;
const CHART_HEIGHT = 400;
let SORT_FLAG = false;

// Create SVG element
const svg = d3.select('#chart')
    .append('svg')
    .attr('width',
     CHART_WIDTH)
    .attr('height', CHART_HEIGHT);

// Create Scales
const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([0, CHART_WIDTH])
    .paddingInner(0.05);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([0, CHART_HEIGHT]);


// Bind data and create bars
svg.selectAll('rect')
    .data(data, key)
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
        return xScale(i);
    })
    .attr('y', d => {
        return CHART_HEIGHT - yScale(d.num);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', d => {
        return yScale(d.num);
    })
    .style('fill', '#7ED26D')
    .on('mouseover', function(d){
        d3.select(this)
            .transition()
            .style('fill', '#0c9cdf');

        // Show Tooltip
        const x = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
        const y = parseFloat(d3.select(this).attr('y')) / 2 + CHART_HEIGHT / 2;

        d3.select('#tooltip')
            .style('left', x + 'px')
            .style('top', y + 'px')
            .style('display', 'block')
            .text(d.num);
    })
    .on('mouseout', function() {
        d3.select(this)
            .transition('change_color_back')
            .style('fill', '#7ED26D');

        // Hide tooltip
        d3.select('#tooltip')
            .style('display', 'none');
    })
    .on('click', function() {
        SORT_FLAG = !SORT_FLAG;

        svg.selectAll('rect')
            .sort(function(a, b) {
                return SORT_FLAG ?
                    d3.ascending(a.num, b.num) :
                    d3.descending(a.num, b.num);
            })
            .transition('sort')
            .duration(1000)
            .attr('x', (d, i) => {
                return xScale(i);
            });

        svg.selectAll('text')
            .sort(function(a, b) {
                return SORT_FLAG ?
                    d3.ascending(a.num, b.num) :
                    d3.descending(a.num, b.num);
            })
            .transition()
            .duration(1000)
            .attr('x', (d, i) => {
                return xScale(i) + xScale.bandwidth() / 2;
            })
    });

// Create labels
svg.selectAll('text')
    .data(data, key)
    .enter()
    .append('text')
    .text(d => {
        return d.num;
    })
    .attr('x', (d, i) => {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr('y', d => {
        return CHART_HEIGHT - yScale(d.num) + 15;
    })
    .attr('font-size', 14)
    .attr('fill', '#fff')
    .attr('text-anchor', 'middle')
    .style('pointer-events', 'none');

// Events
// Update Data
d3.select('.update').on('click', () => {
    // data.reverse();
    data[0].num = 50;

    // Update scales
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data, d => d.num)]);

    svg.selectAll('rect')
        .data(data, key)
        .transition()
        // .delay((d, i) => {
        //     return i / data.length * 1000;
        // })
        .duration(1000)
        // .ease(d3.easeElasticOut)
        .attr('y', d => {
            return CHART_HEIGHT - yScale(d.num);
        })
        .attr('height', d => {
            return yScale(d.num);
        });

    svg.selectAll('text')
        .data(data, key)
        .transition()
        // .delay((d, i) => {
        //     return i / data.length * 1000;
        // })
        .duration(1000)
        // .ease(d3.easeElasticOut)
        .text(d => d.num)
        .attr('x', (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', d => {
            return CHART_HEIGHT - yScale(d.num) + 15;
        });
});


// Add Data
d3.select('.add').on('click', () => {
    // Add new data
    const new_num = Math.floor(Math.random() * d3.max(data, d => d.num));
    data.push({
        key: data[data.length-1].key + 1,
        num: new_num
    });

    // Update scales
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data, d => d.num)]);

    // Select bars
    const bars = svg.selectAll('rect')
        .data(data, key);

    // Add new bar
    bars.enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', CHART_HEIGHT)
        .attr('width', xScale.bandwidth())
        .attr('height', 0)
        .style('fill', '#7ED26D')
        .merge(bars)
        .transition()
        .duration(1000)
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => CHART_HEIGHT - yScale(d.num))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(d.num))

    // Add new labels
    var labels = svg.selectAll('text').data(data, key);
    labels.enter()
        .append('text')
        .text(d => d.num)
        .attr('x', (d, i) => {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr('y', CHART_HEIGHT)
        .attr('font-size', 14)
        .attr('fill', '#fff')
        .attr('text-anchor', 'middle')
        .merge(labels)
        .transition()
        .duration(1000)
        .attr('x', (d, i) => {
            return xScale(i ) + xScale.bandwidth() / 2;
        })
        .attr('y', d => {
            return CHART_HEIGHT - yScale(d.num) + 15;
        });
});

// Remove data
d3.select('.remove').on('click', () => {
    // Remove first item
    data.shift();

    // Update scales
    xScale.domain(d3.range(data.length));
    yScale.domain([0, d3.max(data, d => d.num)]);

    // Select Bars
    var bars = d3.selectAll('rect').data(data, key);

    // Update Bars
    bars.transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("y", function(d) {
            return CHART_HEIGHT - yScale(d.num);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d.num);
        });

    // Remove Bar
    bars.exit()
        .transition()
        .attr('x', -xScale.bandwidth())
        .remove();

    // Select Labels
    var labels = d3.selectAll('text').data(data, key);

    // Update Labels
    labels.transition()
        .duration(500)
        .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function(d) {
            return CHART_HEIGHT - yScale(d.num) + 15;
        });

    labels.exit()
        .transition()
        .attr( 'x', -xScale.bandwidth())
        .remove();
});
