$(document).ready( function () {         	
	var Day = function(date) {
		this.tempIn = [];
		this.tempOut = [];
		this.humid = [];
		this.time = [];
	};
	Days = {}; // object all days
	Day.getConditions = function(){
		$.ajax({
			url: "http://oreol-clean.com/getData.php",
			type: "POST",
			dataType: "json",
			success: function(data){				
				Days = {};
				var lastResult = data[data.length-1];                       
				$('#wrapper').html(lastResult.date_time+'<br>'+'Temperature oustside: '+lastResult.sensor_temp+'<br>'+'Temperature inside: '+lastResult.sensor_temp2+'<br>'+'Humidity inside: '+lastResult.sensor_humidity+'<br>')
				$.each(data, function(i, obj){					
					$.each(obj, function(elem, value){												
						if (elem == 'date_time'){							
							var date = new Date(value);
							day = date.getDate()+'.'+(date.getMonth()+1);														
							if (!(day in Days) ){
								Days[day] = new Day;								
							}
							if (value in Days[day].time){
								return false
							}
							Days[day].time.push(value);		
						}
						if (elem == 'sensor_temp'){
							Days[day].tempOut.push(value);
						}
						if (elem == 'sensor_temp2'){
							Days[day].tempIn.push(value);
						}
						if (elem == 'sensor_humidity'){
							Days[day].humid.push(value);
						}						
					})	
				})
				var tempIn = [];
				var tempOut = [];
				$.each(Days, function(i, obj){
					tempIn.push(parseFloat(obj.tempIn[Math.floor(obj.tempIn.length/2)]));
					tempOut.push(parseFloat(obj.tempOut[Math.floor(obj.tempOut.length/2)]));
				})
					
				drawChart(Object.keys(Days), tempIn, tempOut);
				console.log(Days);
			},			
			error: function () {
				alert("Request is denied!")	
			}
		});
		setTimeout(Day.getConditions, 300000);
	}
	Day.getConditions();
	timeX();
	/*function democlearInterval(){
		window.clearInterval(timer);
		timer = null;
	}*/	
	function timeX(){
		var timer;
		if (!timer){
			timeStatus();
			timer = window.setInterval(timeStatus, 1000);
		}
	}
	function timeStatus(){
		var clock = document.getElementById("clock");
		var date = new Date()	
		clock.innerHTML = date.toLocaleTimeString();										
	}
	
	
	function drawChart(arrDate, tempIn, tempOut, humid) {
		$('#container').highcharts({
			chart: {
				type: 'area'
			},
			title: {
				text: 'Weather in Kremenchuk for October 2014'
			},
			subtitle: {
				text: 'Source: Artem Polischuk\'s sensor'
			},
			xAxis: {
				categories: arrDate,
				tickmarkPlacement: 'on',
				title: {
					enabled: false
				}
			},
			yAxis: {
				title: {
					text: 'Temperature'
				},
				labels: {
					formatter: function () {
						return this.value;
					}
				}
			},
			tooltip: {
				shared: true,
				valueSuffix: ' degrees'
			},
			plotOptions: {
				area: {
					stacking: 'normal',
					lineColor: '#666666',
					lineWidth: 1,
					marker: {
						lineWidth: 1,
						lineColor: '#666666'
					}
				}
			},
			series: [{
				name: 'Temperature inside',
				data: tempIn
			}, {
				name: 'Temperature outside',
				data: tempOut
			/*}, {
				name: 'Humidity inside',
				data: [163, 203, 276, 408, 547, 729, 628]
			}, {
				name: 'America',
				data: [18, 31, 54, 156, 339, 818, 1201]
			}, {
				name: 'Oceania',
				data: [2, 2, 2, 6, 13, 30, 46]*/
			}]
		});
	};	
}) 	

