
CC=mips-openwrt-linux-musl-gcc

CFLAGS= -I/home/rich/openwrt-sdk-18.06.1-ar71xx-generic_gcc-7.3.0_musl.Linux-x86_64/staging_dir/target-mips_24kc_musl/usr/include/modbus

LDFLAGS= -L/home/rich/openwrt-sdk-18.06.1-ar71xx-generic_gcc-7.3.0_musl.Linux-x86_64/staging_dir/target-mips_24kc_musl/usr/lib

LIBS= -lmodbus

libsolarheater.so: libsolarheater.c
	$(CC) $(CFLAGS) -fPIC -shared libsolarheater.c -o libsolarheater.so $(LDFLAGS) $(LIBS)



