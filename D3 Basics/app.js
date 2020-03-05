// d3.json('./data.json').then(data => {
//     generate(data)
// });

d3.csv('./data.csv').then(data => {
    generate(data)
});

function generate(dataset) {
    d3.select('body')
        .selectAll('p')
        .data(dataset)
        .enter()
        .append('p')
        .text(d => {
            return `${d.name}: ${d.age}`;
        })
        .style('color', d => {
            if (parseInt(d.age) > 25) {
                return 'red';
            } else {
                return 'blue';
            }
        });
}
