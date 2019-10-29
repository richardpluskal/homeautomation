#ifndef libsolarheater_h__

#define libsolarheater_h__

#include<stdint.h>

typedef struct
{
    uint16_t panel_temp;
    uint16_t tank_temp;
    uint16_t status_bits;
} solar_heater_data;

typedef enum {STATUS_OK=0,TCP_CONN_FAILED,PLC_CONN_FAILED,DATA_READ_FAILED,INVALID_IP} status_code;

status_code GetSolarSystemData(char* ip_address,solar_heater_data* data);

#endif