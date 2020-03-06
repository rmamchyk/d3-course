var data = [];
for (let i = 0; i < 20; i++) {
    const num = Math.floor(d3.randomUniform(1, 50)());
    data.push(num);
}

d3.select('#chart')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'bar')
    .style('height', d => {
        const height = d * 3;
        return height + 'px'
    });