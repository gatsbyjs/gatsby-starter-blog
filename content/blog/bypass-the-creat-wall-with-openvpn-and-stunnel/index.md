---
title: "Bypass the Great Wall with OpenVPN and Stunnel"
date: "2022-09-10T22:12:00Z"
description: ""
---

Getting past the Great Wall of China's internet restrictions is no easy feat. Today, China invests significantly in analyzing and detecting unusual packets to prevent its citizens from accessing certain parts of the Internet. To avoid having data transmitted via OpenVPN inspected and blocked by Chinese authorities, this study outlines how to set up OpenVPN and Stunnel for discreet data transmission.

## OpenVPN Architecture

First of all, let's take a look at the architecture. There are 2 parts forming the OpenVPN tunnel: 

```
OpenVPN Server Service
(The Server: port 1194)
          |
          |
          |
OpenVPN Client Service
    (Your Devices)
```

When the connection is established, a new interface is created on your devices, which is used for your requests and traffics. 

### OpenVPN Server

Here are the settings of OpenVPN on the server side (Ubuntu 22.04 LTS): 

```bash
# This port is defined as the opening port on the server side. 
port 1194

# It's common to use udp here for the faster speed. 
# However, here I set it tcp for the sake of Stunnel. 
proto tcp

# Please just use tun of the layer 3 protocol. 
# What's wrong with tap, please refer to: 
# https://serverfault.com/questions/21157/should-i-use-tap-or-tun-for-openvpn
dev tun

# The ca certificate, server certificate, and server key
ca /etc/openvpn/easy-rsa/ca.crt
cert /etc/openvpn/easy-rsa/keys/server.crt
key /etc/openvpn/easy-rsa/keys/server.key

#  Diffie–Hellman Key
dh /etc/openvpn/easy-rsa/keys/dh.pem

# Here defines the VPN subnet, 
# and the server would assign IPs to clients according to that. 
server 10.8.0.0 255.255.255.0

# Here record assigned IPs that clients get. 
ifconfig-pool-persist /var/log/openvpn/ipp.txt

# A route is pushed to all clients to 
# set the VPN Server as the Default Gateway. 
push "redirect-gateway def1"

# Ping every 10 seconds, assume that remote peer is down 
# if no ping received during a 120 second time period
keepalive 10 120

# The key is used for authentication of TLS HMAC to increase security. 
tls-auth /etc/openvpn/ta.key 0

# The cipher protocol used for the server and clients. 
cipher AES-256-GCM

# The message digest algorithm used for HMAC authentication
auth SHA256

# Do not re-read the key after the restart caused by a timeout. 
persist-key

# Keep the tun/tap device open even after the restart caused by a timeout. 
persist-tun

# Log
status /var/log/openvpn/openvpn-status.log

# Level of log
verb 3
```

### OpenVPN Client

Here are the settings of OpenVPN on the client side (Ubuntu 22.04 LTS): 

```bash
# This device is a client. 
client

# The following settings are similar to those of the server
dev tun
proto tcp
remote server.example.com 1194

persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
tls-auth ta.key 1
cipher AES-256-GCM
auth SHA256
verb 3

# Don't cache --askpass or --auth-user-pass passwords.
auth-nocache

# Do not bind to local address and port.
nobind

# This line is critical for OpenVPN via Stunnel. 
# It tells the client to connect to the OpenVPN server 
# directly via the internet instead of Stunnel. 
route server.example.com 255.255.255.255 net_gateway
```

## Stunnel Architecture

OK, here we are for the OpenVPN plus Stunnel. Before we start it, let's see the architect: 

```
OpenVPN Server Service --- Stunnel Server Service
     (Port 1194)                |(Port 443) |
                                |           |
                                |           |
                                |           |
                                |(Port 1194)|
OpenVPN Client Service --- Stunnel Client Service
```

As you see, a Stunnel was constructed, and the portal of the OpenVPN server is ported to `localhost:1194`. All that you need to do is create a Stunnel and connect to the OpenVPN portal on your localhost. 

Also, In order to test the construction of tunnel, you can use [`tcpdump`](https://www.tcpdump.org/) and [`NetCat`](https://nmap.org/ncat/): 

```bash
# Use tcpdump to capture packets received and 
# transmitted to OpenVPN Server Service on port 1194. 
user@server:~$ sudo tcpdump -i lo port 1194 -n -vvvv

# Use NetCat to transmit data and then 
# the tunnel will send the data to server:1194 
# via an encrypt channel between client:1194 and server:443. 
user@client:~$ echo "test" | nc localhost 1194
```

If you do not want to download and use [`NetCat`](https://nmap.org/ncat/) for testing, you can directly access [`https://localhost:1194`](https://localhost:1194) on your browser and [`tcpdump`](https://www.tcpdump.org/) would also dump packets if everything goes well. 

<!-- https://studentonline.pixnet.net/blog/post/147423964  
https://blog.csdn.net/hou09tian/article/details/100806600  
https://blog.gtwang.org/linux/linux-utility-netcat-examples/   -->

### Stunnel Server

Here are the settings of Stunnel on the server side (Ubuntu 22.04 LTS): 

```bash
pid = /var/run/stunnel4/stunnel.pid
output = /var/log/stunnel4/stunnel.log

setuid = stunnel4
setgid = stunnel4

# https://www.stunnel.org/faq.html
socket = r:TCP_NODELAY=1
socket = l:TCP_NODELAY=1

debug = 7

# Location of the certificate that we created
cert = /etc/stunnel/stunnel.pem

# Name of the connection
[openvpn-localhost]
# The port to listen on
accept = 443
# Connect to the local OpenVPN server
connect = server.example.com:1194
```

### Stunnel Client

Here are the settings of Stunnel on the client side (Ubuntu 22.04 LTS): 

```bash
pid = /var/run/stunnel4/stunnel.pid
output = /var/log/stunnel4/stunnel.log

setuid = stunnel4
setgid = stunnel4

# https://www.stunnel.org/faq.html
socket = r:TCP_NODELAY=1
socket = l:TCP_NODELAY=1

debug = 7

[openvpn-minipc.hopto.org]
client=yes
accept=1194
connect=minipc.hopto.org:443
```

### OpenVPN Client

Here are the settings of OpenVPN on the server side (Ubuntu 22.04 LTS): 

```bash
client
dev tun
proto tcp

# Here the connection to the OpenVPN Server 
# is set to localhost via Stunnel
remote 127.0.0.1 1194

nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
auth-nocache
tls-auth ta.key 1
cipher AES-256-GCM
auth SHA256
verb 3

# if you don't set this route, the route of Stunnel would be 
# affected after the VPN Server pushes a route to the client 
# which set the default gateway to 127.0.0.1:1194. 
route server.example.com 255.255.255.255 net_gateway
```

## References

* [Open Source Community | OpenVPN](https://openvpn.net/community/)
* [stunnel: Home](https://www.stunnel.org/)
* [How To Hide OpenVPN Connections In China - GreyCoder](https://greycoder.com/openvpn-china/)
* [OpenVPN Sheathing](https://silvenga.com/openvpn-sheathing/)
* [Stunnel + OpenVPN Client on Ubuntu | by Jayden Chua | Medium](https://jayden-chua.medium.com/stunnel-openvpn-client-on-ubuntu-d10c355ad129)
* [Stunnel + OpenVPN Server on Ubuntu 18.04 | by Jayden Chua | Medium](https://jayden-chua.medium.com/stunnel-openvpn-server-on-ubuntu-18-04-1837eaf2077d)
* [Windows 10 + Stunnel + OpenVPN. Configuring Windows 10 to use OpenVPN… | by Jayden Chua | Medium](https://jayden-chua.medium.com/windows-10-stunnel-openvpn-cf5c5327c79f)
* [How to install and configure stunnel on Ubuntu | Hamy - The IT Guy](https://hamy.io/post/0012/how-to-install-and-configure-stunnel-on-ubuntu/)
* [ubuntu - How can I test stunnel? - Stack Overflow](https://stackoverflow.com/questions/20194298/how-can-i-test-stunnel)
* [Since China banned Google DNS IP, what is an alternative? - Quora](https://www.quora.com/Since-China-banned-Google-DNS-IP-what-is-an-alternative)
* [windows - Setting DNS servers using OpenVPN client config file - Super User](https://superuser.com/questions/637579/setting-dns-servers-using-openvpn-client-config-file)