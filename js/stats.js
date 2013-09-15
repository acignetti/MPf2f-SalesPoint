function showPieChart() {

	$('div#content').load('stats.html', function() {
		
		generatePieChart();
	})
}

function generatePieChart() {
new Morris.Line({
  // ID of the element in which to draw the chart.
  element: 'sales-chart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
   data: [
    { y: '2013-09-09',  a: 5 },
    { y: '2013-09-10',   a: 7 },
    { y: '2013-09-11',  a: 11 },
    { y: '2013-09-12',   a: 4 },
    { y: '2013-09-13',  a: 5 },
    { y: '2013-09-14', a: 8 },
    { y: '2013-09-15',  a: 3 }
  ],
  xkey: 'y',
  ykeys: ['a'],
  labels: ['Ventas']
});

}