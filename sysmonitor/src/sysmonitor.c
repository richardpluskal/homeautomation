#include<stdio.h>

#include<libsolarheater.h>

#include<curl.h>

#include<string.h>

#define PLC_ADDR_LENGTH 16
#define STORE_SITE_ADDR_LENGTH 256
#define STORE_PASSWD_LENGTH 21

char plcAddr[PLC_ADDR_LENGTH];
char storeSiteAddr[STORE_SITE_ADDR_LENGTH];
char storePasswd[STORE_PASSWD_LENGTH];

char storeData[STORE_PASSWD_LENGTH+120]; /*120 should be enough for length of data + description*/

solar_heater_data data;

int LoadConfig();

int GetSolarHeaterData();

void PrepareStoreData();

int UploadData();

int main(void)
{
	printf("Loading configuration...\n\n");

	if(LoadConfig()!=0)
	{
		printf("LoadConfig failed.\n");
		return -1;
	}

	printf("Retrieving solar heater data...\n\n");

	if(GetSolarHeaterData()==0)
	{
		printf("OK\n");
	}
	else
	{
		printf("Data not retrieved.\n");
		return -1;
	}	
	
	printf("Preparing data...\n\n");

	PrepareStoreData();
//	printf("%s\n",storeData);

	printf("Data upload...\n\n");

	if(UploadData()==0)
	{
		return 0;
	}
	else
	{
		return -1;
	}
}

int LoadConfig()
{
	FILE* configFile=fopen("config","r");

	if(configFile==NULL)
	{
		return -1;
	}

	fgets(plcAddr,PLC_ADDR_LENGTH-1,configFile);
	plcAddr[strcspn(plcAddr,"\n")]=0;

	fgets(storeSiteAddr,STORE_SITE_ADDR_LENGTH-1,configFile);
	storeSiteAddr[strcspn(storeSiteAddr,"\n")]=0;

	fgets(storePasswd,STORE_PASSWD_LENGTH-1,configFile);
	storePasswd[strcspn(storePasswd,"\n")]=0;

	fclose(configFile);

	return 0;
}

int GetSolarHeaterData()
{
	switch(GetSolarSystemData(plcAddr,&data))
	{
		case STATUS_OK:
			printf("Kolektor: %u°C\nBojler: %u°C\n\n",data.panel_temp,data.tank_temp);
			printf("Sol. ohřev %s\n",data.status_bits&0x0002?"zapnutý":"vypnutý");
			printf("El. ohřev %s\n",data.status_bits&0x0001?"zapnutý":"vypnutý");
			return 0;
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

	return -1;
}

void PrepareStoreData()
{
	sprintf(storeData,"passwd=%s",storePasswd);

	char buffer[20];

	sprintf(buffer,"&panel=%u",data.panel_temp);
	strcat(storeData,buffer);

	sprintf(buffer,"&tank=%u",data.tank_temp);
	strcat(storeData,buffer);

	sprintf(buffer,"&heater=%s",data.status_bits&0x0001?"ON":"OFF");//lowest bit is set when electric heater is on
	strcat(storeData,buffer);

	sprintf(buffer,"&pump=%s",data.status_bits&0x0002?"ON":"OFF");//2nd lowest bit is set when pump is on
	strcat(storeData,buffer);

	strcat(storeData,"\0");
}

int UploadData()
{
	curl_global_init(CURL_GLOBAL_ALL);

	CURL* curl;
	CURLcode res;

	curl=curl_easy_init();

	if(curl!=NULL)
	{
		curl_easy_setopt(curl,CURLOPT_URL,storeSiteAddr);
		curl_easy_setopt(curl,CURLOPT_POSTFIELDS,storeData);

	 	res = curl_easy_perform(curl);
		
		curl_easy_cleanup(curl);
	}
	else
	{
		printf("Data upload init failed\n");
		curl_global_cleanup();
		return -1;
	}
	
	curl_global_cleanup();

	if(res==CURLE_OK)
	{
		printf("\nData uploaded\n");
		return 0;
	}
	else
	{
		printf("Data upload failed: %s\n",curl_easy_strerror(res));
		return -1;
	}
	
}