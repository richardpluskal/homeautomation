#include<stdio.h>

#include"modbus.h"

#include"libsolarheater.h"

#include<string.h>

#include<time.h>

#define MODBUS_DATA_LENGTH 4 /*4x2byte word*/
#define MODBUS_REGISTER_ADDR 20
#define MODBUS_TCP_PORT 502

//modbus_data return_data;
uint16_t modbusData[MODBUS_DATA_LENGTH];

int ReadModbusData(modbus_t *mb);
void Delay(unsigned short miliseconds);
int ModbusConnect(modbus_t *mb);
int CheckData();
int CheckIP(char* ip_address);

status_code GetSolarSystemData(char* ip_address,solar_heater_data* data)
{
 	modbus_t *mb;

	if(CheckIP(ip_address)!=0)
	{
		return INVALID_IP;
	}

  	mb=modbus_new_tcp(ip_address,MODBUS_TCP_PORT);

	if(mb==NULL)
	{
		return TCP_CONN_FAILED;
	}

	if(ModbusConnect(mb)!=0)
	{
		modbus_close(mb);
		modbus_free(mb);
		return PLC_CONN_FAILED;
	}

	if(ReadModbusData(mb)!=0)
	{
		modbus_close(mb);
		modbus_free(mb);
		return DATA_READ_FAILED;
	}

	data->panel_temp=modbusData[0];
	data->tank_temp=modbusData[1];
	data->status_bits=modbusData[2];

	modbus_close(mb);
	modbus_free(mb);

	return STATUS_OK;
}

int ReadModbusData(modbus_t *mb)
{
	int dataOK=-1;

	for(int i=0;i<3;i++)
	{
		modbus_read_registers(mb,MODBUS_REGISTER_ADDR,MODBUS_DATA_LENGTH,modbusData);

		if(CheckData()==0)
		{
			dataOK=0;
			break;
		}

		Delay(50);
	}

	return dataOK;
}

int ModbusConnect(modbus_t *mb)
{
	for(int i=0;i<3;i++)
	{
		if(modbus_connect(mb)==0)
		{
			return 0;
		}
	}

	return -1;
}

int CheckData()
{
/*	if(modbusData[1]==(uint16_t) 0);
	{
		return -1;
	}
*/
	return 0;
}

int CheckIP(char* ip_address)
{
	if((strlen(ip_address)<7)||(strlen(ip_address)>15))
	{
		return -1;
	}

	return 0;
}

void Delay(unsigned short miliseconds)
{
	clock_t end=clock()+(miliseconds*(CLOCKS_PER_SEC/1000));

	while(clock()<end)
	{;}
}