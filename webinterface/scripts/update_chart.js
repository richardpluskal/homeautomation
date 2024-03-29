var chart=0;

function updateChart(data)
{
	var first_date=formatDateTimeString(data[0].date_time,1);
	var last_date=formatDateTimeString(data[data.length-1].date_time,1);

	var chart_data=	
	{
		panel_temp:data.map(function(e) {return e.panel_temp;}),
		tank_temp:data.map(function(e) {return e.tank_temp;}),
		pump:data.map(function(e) {return e.pump;}),
		heater:data.map(function(e) {return e.heater;}),
		label:data.map(function(e) {return formatDateTimeString(e.date_time,2);}),
		title:(first_date==last_date)?first_date:(first_date+" - "+last_date)
	};
    
	if(chart==0)
	{
		createNewChart(chart_data);
	}
	else
	{
		chart.data.labels.pop();
		chart.data.datasets.forEach((dataset)=>{dataset.data.pop()});

		chart.data.labels=chart_data.label;
	
		chart.data.datasets[0].data=chart_data.panel_temp;
		chart.data.datasets[1].data=chart_data.tank_temp;
		chart.data.datasets[2].data=chart_data.pump;
		chart.data.datasets[3].data=chart_data.heater;		

		chart.options.title.text=chart_data.title;

		chart.update();
	}
}

function createNewChart(data)
{
	var ctx=document.getElementById('chart').getContext('2d');
	chart = new Chart(ctx,
	{
    		type: 'line',
    		data: 
		{
			labels:data.label,
        		datasets: 
			[	
				{
            				label: "Teplota panelu",
            				borderColor: 'rgb(255,0,132)',
					fill: false,
					data:data.panel_temp,
					borderWidth: 1,
					pointRadius: 0,
					cubicInterpolationMode: 'default',
					yAxisID: 'temp_axis'
				},
				{
					label: "Teplota vody",
            				borderColor: 'rgb(0,99, 132)',
            				fill: false,
					data:data.tank_temp,
					borderWidth: 1,
					pointRadius: 0,
					cubicInterpolationMode: 'default',
					yAxisID: 'temp_axis'
				},
				{
					label: "Sol. ohřev",
            				borderColor: 'rgba(0,132,0,0.1)',
            				backgroundColor: 'rgba(0,132,0,0.1)',
					data:data.pump,
					borderWidth: 0,
					pointRadius: 0,
					cubicInterpolationMode: 'default',
					lineTension: 0,
					yAxisID: 'on_off_axis'
				},
				{
					label: "El. ohřev",
            				borderColor: 'rgba(132,0,0,0.1)',
            				backgroundColor: 'rgba(132,0,0,0.1)',
					data:data.heater,
					borderWidth: 0,
					pointRadius: 0,
					cubicInterpolationMode: 'default',
					lineTension: 0,
					yAxisID: 'on_off_axis'
				}
        		]
    		},
    		options: 
		{
        		title:
			{
            			display:true,
            			text:data.title
        		},
		        scales:
			{
            			xAxes: 
				[	
					{
						scaleLabel:
						{
            						display: true,
            						labelString: 'Čas'
          					},
                				ticks: 
						{
                    					autoSkipPadding: 10
                				}
            				}
				],

				yAxes: 
				[
					{
                				id: 'temp_axis',
                				type: 'linear',
                				position: 'left',
						scaleLabel:
						{
            						display: true,
            						labelString: 'Teplota [°C]'
          					}
            				}, 
					{
                				id: 'on_off_axis',
                				type: 'linear',
						ticks:
						{
							min: 0,
							max: 1,
						},
                				display: false
            				}
				]
        		}
    		}
	});
}