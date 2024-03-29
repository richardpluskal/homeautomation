function showStatus() 
{
	var today=new Date().toISOString().slice(0,10);

	showPeriod(today,today,true);
}

function showPeriod(date_start,date_end,only_today=false) 
{
	var period={date_from:date_start+" 00:00:00",date_to:date_end+" 23:59:59"};
	
	getDBData(period,only_today?showCurrentData:showData);
}

function showData(xhttp)
{
	dbData=JSON.parse(xhttp.responseText);
	updateChart(dbData);
}

function showCurrentData(xhttp)
{
	dbData=JSON.parse(xhttp.responseText);
	updateSchematic(dbData[dbData.length-1]);
	updateChart(dbData);
}