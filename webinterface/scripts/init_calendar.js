function initCalendar()
{
    var today=new Date();
    
    var day=today.getDate();
    if(day<10)
	day='0'+day;

    var month=today.getMonth()+1;
    if(month<10)
        month='0'+month;
    
    var year=today.getFullYear();
    
    document.getElementById("date_from").innerHTML=day+"."+month+"."+year;
    document.getElementById("date_to").innerHTML=day+"."+month+"."+year;
}