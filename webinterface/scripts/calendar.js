function showCalendar(date_name,display_name)
{                        
    document.getElementById(display_name).style.display='block'
    
    var input_date=document.getElementById(date_name).innerHTML; 
           
    var day=input_date.slice(0,2);
    var month=input_date.slice(3,5);
    var year=input_date.slice(6,10);
    
    shown_day=day;
    shown_month=month;
    shown_year=year;
    
    var date=new Date(year,month-1,day);
    
    drawTable(date,date_name,display_name);
}

function drawTable(date,date_name,display_name)
{                                
    var display=document.getElementById(display_name);
    var input_date=document.getElementById(date_name).innerHTML; 
         
    var date_name_str="'"+date_name+"'";
    var display_name_str="'"+display_name+"'";   
    
    var day=date.getDate();
    var month=date.getMonth()+1;
    var year=date.getFullYear();
    
    var selected_day=input_date.slice(0,2);
    var selected_month=input_date.slice(3,5);
    var selected_year=input_date.slice(6,10);
        
    var current_month=new Date().getMonth()+1;
    
    var days_in_month=getNumberOfDays(date);
    var first_day_in_month=getFirstDayOfMonth(date);
    
    var table="";
    
    var day_index=1;
    
    display.innerHTML="";
 
    var str="<div class='caption' id=\"month\" onClick=\"displayMonths("+date_name_str+","+display_name_str+","+current_month+")\">"+month_names[month-1]+"</div>";  
    str+="<div class='caption' id=\"year\" onClick=\"displayYears("+date_name_str+","+display_name_str+","+current_month+")\">"+year+"</div>";     
     
    table+="<table class='calendarTable' cellspacing='0'>";

    table+="<tr><td class='previous' onClick=\"changeMonth("+date_name_str+","+display_name_str+",-1)\"><</td><td colspan='5'>"+str+"</td><td class='next' onClick=\"changeMonth("+date_name_str+","+display_name_str+",1)\">></td></tr>";
    
    table+="<tr class='calendarDays'><td>po</td><td>út</td><td>st</td><td>èt</td><td>pá</td><td>so</td><td>ne</td></tr>";
    
    for(i=0;i<6;i++)
    {
        table+="<tr>";
        for(j=0;j<7;j++)
        {
            if ((i==0)&&(j<first_day_in_month))
            {    
                table+="<td class=\"empty\"></td>";
            }
            else
            {
                table+="<td class=\"day ";
                
                if(isToday(day_index,month,year))
                {
                    table+="today";
                }
                
                if((day==day_index)&&(month==selected_month)&&(year==selected_year))
                {
                    table+=" selectedDay";
                }
                
                table+="\" onClick=\"selectDay("+day_index+","+date_name_str+","+display_name_str+")\">"+day_index+"</td>";
                
                if(++day_index>days_in_month)
                {
                    break;
                }
                
            }             
        }
        table+="</tr>";
        
        if(day_index>days_in_month)
        {
            break;
        }
    }

    table+="</table>"; 
    display.innerHTML+=table;
    display.innerHTML+="<div class=\"separator\"></div>";
    display.innerHTML+="<div class=\"todayButton\" onClick=\"showToday("+date_name_str+","+display_name_str+")\">dnes</div>";
    display.innerHTML+="<div class=\"separator\"></div>";  
}

function getNumberOfDays(date)
{
    return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
}

function getFirstDayOfMonth(date)
{
    var temp_date=new Date(date);
    temp_date.setDate(1);
    
    var day=temp_date.getDay();	

    return (day==0)?6:(day-1); //the first day of a week has index 0 and it is Monday, not Sunday
}

function selectDay(day,date_field,display_name)
{
    var input_date=document.getElementById(date_field).innerHTML;
      
    if (day<10)
        day='0'+day;
           
    document.getElementById(date_field).innerHTML=day+"."+shown_month+"."+shown_year; 
    document.getElementById(display_name).style.display='none';    
}

function displayMonths(date_name,display_name,current_month)
{
    var display=document.getElementById(display_name);
    
    var input_date=document.getElementById(date_name).innerHTML; 
    
    var input_month=parseInt(input_date.slice(3,5),10);
    
    var date_name_str="'"+date_name+"'";
    var display_name_str="'"+display_name+"'";
    
    var table="";
    var month="1";      
    table+="<table class='monthsTable' cellspacing='0'>"    
    for(i=1;i<=3;i++)
    {
        table+="<tr>";
        for(j=1;j<=4;j++)
        {
            table+="<td class=\"months ";
            
            if(input_month==month)
            {
                table+="selectedMonth";
            }
            
            if(current_month==month)
            {
                table+=" currentMonth";
            }
            
            table+="\" onClick=\"selectMonth("+month+","+date_name_str+","+display_name_str+")\">"+month_names[month-1]+"</td>";
            month++;   
        }
        
        table+="</tr>";
    }
    
    table+="</table>";
    
    display.innerHTML=table;
}

function selectMonth(month,date_name,display_name)
{
    var input_date=document.getElementById(date_name).innerHTML;
  
    var day="01";
    var year=input_date.slice(6,10);
    
    if(month<10)
        month='0'+month;
            
    document.getElementById(date_name).innerHTML=day+"."+month+"."+year;
    showCalendar(date_name,display_name);
}

function isToday(date,month,year)
{
    var today=new Date();   
    
    if((date==today.getDate())&&(month==today.getMonth()+1)&&(year==today.getFullYear()))    
    {
        return true;
    }
                
    return false;
}

function showToday(date_field,display_name)
{
    var today=new Date();
     
    var day=today.getDate();
    if(day<10)
        day='0'+day;

    var month=today.getMonth()+1;
    if(month<10)
        month='0'+month;
    
    var year=today.getFullYear();
    
    document.getElementById(date_field).innerHTML=day+"."+month+"."+year; 
    document.getElementById(display_name).style.display='none'; 
}

function changeMonth(date_field,display_name,direction)
{
    switch(direction)
    {
     case -1:
        shown_month--;
        break;
    case 1:
        shown_month++;
        break;
    default:
        break;
    }
    
    shown_day="01";
    
    var date=new Date(shown_year,shown_month-1,shown_day);
     
    shown_month=date.getMonth()+1;
    if(shown_month<10)
        shown_month='0'+shown_month;
        
    shown_year=date.getFullYear();
    
    drawTable(date,date_field,display_name);    
}

function displayYears(date_name,display_name,current_month)
{
    var display=document.getElementById(display_name);
    
    var input_date=document.getElementById(date_name).innerHTML; 
    
    var input_month=parseInt(input_date.slice(3,5),10);
    
    var date_name_str="'"+date_name+"'";
    var display_name_str="'"+display_name+"'";
    
    var table="";
    var year="2019";      
    table+="<table class='monthsTable' cellspacing='0'>"    
    for(i=1;i<=3;i++)
    {
        table+="<tr>";
        for(j=1;j<=4;j++)
        {
            table+="<td class=\"months ";
            
            if(input_month==month)
            {
                table+="selectedMonth";
            }
            
            if(current_month==month)
            {
                table+=" currentMonth";
            }
            
            table+="\" onClick=\"selectYear("+year+","+date_name_str+","+display_name_str+")\">"+year+"</td>";
            year++;   
        }
        
        table+="</tr>";
    }
    
    table+="</table>";
    
    display.innerHTML=table;
}

function selectYear(year,date_name,display_name)
{
    var input_date=document.getElementById(date_name).innerHTML;
  
    var day="01";
    var month="01";
            
    document.getElementById(date_name).innerHTML=day+"."+month+"."+year;
    showCalendar(date_name,display_name);
}

document.onclick=hide;

function hide(e)
{
     if(e.target.localName=="body")
        {
            var list=document.getElementsByClassName("calendar");
            for(i in list)
            {
                if(list[i].style!=undefined)
                    list[i].style.display='none'; 
            }
        }     
}

var month_names=["Leden","Únor","Bøezen","Duben","Kvìten","Èerven","Èervenec","Srpen","Záøí","Øíjen","Listopad","Prosinec"];

var shown_day;
var shown_month;
var shown_year;