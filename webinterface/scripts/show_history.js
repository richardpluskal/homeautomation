function showHistory(start_date,end_date)
{
    var d_start=document.getElementById(start_date).innerHTML;
    var d_end=document.getElementById(end_date).innerHTML;
    
    var s_day=d_start.slice(0,2);
    var s_month=d_start.slice(3,5);
    var s_year=d_start.slice(6,10);
    
    var e_day=d_end.slice(0,2);
    var e_month=d_end.slice(3,5);
    var e_year=d_end.slice(6,10);
    
    var from=s_year+"-"+s_month+"-"+s_day;
    var to=e_year+"-"+e_month+"-"+e_day;
    
    showPeriod(from,to);
}