function showStatus() 
{
	getSolarHeaterData(showSolarHeaterData);
}

function showSolarHeaterData(xhttp)
{
	dbData=JSON.parse(xhttp.responseText);
	updateSchematic(dbData);
}