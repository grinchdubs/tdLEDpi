# tdLEDpi
Art-net LED interface using Raspberry and Touchdesigner

Step 1. Install Raspbian Lite Latest version and Setup SSH
https://hackernoon.com/raspberry-pi-headless-install-462ccabd75d0
    
Step 3. Change Password with 
```
passwd
```

Step 4. Install Vim and Fish
```
sudo apt-get install -y vim fish
chsh -s /usr/bin/fish
echo /usr/bin/fish | sudo tee -a /etc/shells
```

Step 5. Change Hostname
Change raspberrypi to unique hostname in /etc/hostname and /etc/hosts
```
sudo vim /etc/hostname
sudo vim /etc/hosts
```

Step 6. Expand Filesys
```
sudo raspi-config
```
Advanced > Expand FS

Step 7. Update
Main Menu > Update
```
sudo reboot
```

Step #. Install pip
```
sudo apt-get install -y python3-pip
```

Step #. Install need Python Libs
```
sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel
			or
sudo python3 -m pip install --force-reinstall adafruit-blinka
```

Step 8. Install ola
```
sudo apt-get install -y ola
```

Step 9. Install node/npm
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs
```
    
Step 10. Install OPC
```
npm install node-opc-server
cd node_modules/node-opc-server/opc-server
npm install
sudo node index.js
```

Step 11. Modify ola Configs
* Add last 2 lines to /etc/ola/ola-openpixelcontrol.conf
```
enabled = true
target = 127.0.0.1:7890
target_127.0.0.1:7890_channel = 0
```
	
Setp 12. Browse to OLA
* Reload config
* Add universe
* Input = Artnet
* Output = Open Pixel Control
    

Step 13. Config TD
* Open provided TOE
* In the DMXout Chop at select universe 1 and add Rpi address to Network address field

