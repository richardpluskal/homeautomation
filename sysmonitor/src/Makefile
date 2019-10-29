
CC=mips-openwrt-linux-musl-gcc

DIR=$(STAGING_DIR)/target-mips_24kc_musl/usr/lib
INCL_DIR=$(STAGING_DIR)/target-mips_24kc_musl/usr/include

CFLAGS= -I$(INCL_DIR)/libsolarheater
CFLAGS+= -I$(INCL_DIR)/curl

LDFLAGS+= -L$(DIR) -Wl,-R$(DIR) '-Wl,-R$$ORIGIN'

LIBS= -lsolarheater -lmodbus

sysmonitor: sysmonitor.c
	$(CC) $(CFLAGS) sysmonitor.c -o sysmonitor $(LDFLAGS) $(LIBS) $(LDFLAGS) -lcurl



