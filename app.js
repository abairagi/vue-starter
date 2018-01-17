'use strict';

Vue.component('list', {
	template: "<li><slot></slot></li>"
});

Vue.component('task-list', {
	props: ['data1'],
template: `<div><list v-for='task in tasks' :class='{"red":task.isNew, "blue": !task.isNew}'>{{task.letter}}: Frequency = {{task.frequency || 0}}</list></div>`,
	data(){
		return {tasks : this.data1};
	}
});
Vue.component('bar-chart', {
	props:['data'],
	template: `<svg width="960" height="500"></svg>`,
	data(){
		var svg = d3.select("svg"),
		margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;

		var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
			y = d3.scaleLinear().rangeRound([height, 0]);

		var g = svg.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		var data = this.data;
		
		  x.domain(data.map(function(d) { return d.letter; }));
		  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

		  g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .call(d3.axisBottom(x));

		  g.append("g")
			  .attr("class", "axis axis--y")
			  .call(d3.axisLeft(y).ticks(10, "%"))
			.append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", "0.71em")
			  .attr("text-anchor", "end")
			  .text("Frequency");

		  g.selectAll(".bar")
			.data(data)
			.enter().append("rect")
			  .attr("class", "bar")
			  .attr("x", function(d) { return x(d.letter); })
			  .attr("y", function(d) { return y(d.frequency); })
			  .attr("width", x.bandwidth())
			  .attr("height", function(d) { return height - y(d.frequency); });
	}
	
});
new Vue ({
				 el: '#vue-app',
				 data: {
					 newTask : "",
					 data : [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}]
				 },
				 methods: {
					 addTask(){
						this.data.unshift({letter:this.newTask, isNew: true});
						this.newTask = '';						
					 }
				 }
			 }) 