function updateSchematic(data)
{
	document.getElementById("panel_temp").innerHTML=data.panel_temp+"°C";
	document.getElementById("tank_temp").innerHTML=data.tank_temp+"°C";
	document.getElementById("pump").innerHTML=data.pump=="1"?"Zapnuto":"Vypnuto";
	document.getElementById("heater").innerHTML=data.heater=="1"?"Zapnuto":"Vypnuto";

	var now=new Date();

	var hour=now.getHours();
	var minute=now.getMinutes();

	document.getElementById("date_time").innerHTML=hour+":"+((minute<10)?"0":"")+minute;
}