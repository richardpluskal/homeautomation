# homeautomation

### version 0.1

- Currently only solar water heater monitoring is implemented.

- Solar water heater PLC is connected to Ethernet, communicating with a router running OpenWRT using Modbus/TCP protocol.
  
- The router provides intranet webpage for monitoring and control of solar water heater. Data is udated by AJAX, PLC communication uses CGI with solarheater program.
  
- The router also periodically sends status data to a web server. Cron starts sysmonitor program which collects the data and this data is stored into a database using PHP script running on the server.

- Internet webpage provides current system data as well as history.



### Thanks a lot to authors of [libmodbus](https://libmodbus.org), [curl](https://curl.haxx.se/) and [Chart.js](https://www.chartjs.org/)!
