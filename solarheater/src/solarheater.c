#include<stdio.h>

#include<libsolarheater.h>

#include<string.h>

#define PLC_ADDR_LENGTH 16

char plcAddr[PLC_ADDR_LENGTH];

int LoadConfig();

solar_heater_data data;

int main(void)
{
	printf("Content-Type: text/html\n\n");
	printf("\n\n");

	if(LoadConfig()!=0)
	{
		printf("<br>LoadConfig failed.<br>\n");
		return -1;
	}

	status_code status=GetSolarSystemData(plcAddr,&data);

	switch(status)
	{
		case STATUS_OK:
			printf("{\"panel_temp\": %d,\"tank_temp\": %d,\"pump\": %d,\"heater\": %d}",
				data.panel_temp,data.tank_temp,data.status_bits&0x0002?1:0,data.status_bits&0x0001?1:0);
		break;
		case TCP_CONN_FAILED:
			printf("TCP connection failed\n");
		break;
		case PLC_CONN_FAILED:
			printf("PLC connection failed\n");
		break;
		case DATA_READ_FAILED:
			printf("Data read failed\n");
		break;
		case INVALID_IP:
			printf("Invalid IP\n");
		break;
		default:
			printf("Unknown error\n");
		break;
	}

	return 0;
}

int LoadConfig()
{
	FILE* configFile=fopen("solar_heater_config","r");

	if(configFile==NULL)
	{
		return -1;
	}

	fgets(plcAddr,PLC_ADDR_LENGTH-1,configFile);
	plcAddr[strcspn(plcAddr,"\n")]=0;

	fclose(configFile);

	return 0;
}
