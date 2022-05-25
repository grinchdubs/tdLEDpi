# tdLEDpi
Art-net LED interface using Raspberry for sending DMX information from Touchdesigner

## What's Needed
	- Raspberry Pi 1-3+ wired to network with Ethernet
	- Neopixel Led strip
	- 5v power for the neopixels
	- A computer running latest version of Touchdesinger


1. Install Raspbian Lite Latest version and Setup SSH
	* https://hackernoon.com/raspberry-pi-headless-install-462ccabd75d0
    
2. Change Password with 
```
passwd
```

3. Install Vim and Fish
```
sudo apt-get install -y vim fish
chsh -s /usr/bin/fish
echo /usr/bin/fish | sudo tee -a /etc/shells
```

4. Change Hostname
	* Change `raspberrypi` to unique hostname in /etc/hostname and /etc/hosts
```
sudo vim /etc/hostname
sudo vim /etc/hosts
```

5. Expand Filesys
```
sudo raspi-config
```
	* Advanced > Expand FS

6. Update
	* Main Menu > Update
```
sudo reboot
```

7. Install pip
```
sudo apt-get install -y python3-pip
```

8. Install needed Python Libs
```
sudo pip3 install rpi_ws281x adafruit-circuitpython-neopixel  
			or
sudo python3 -m pip install --force-reinstall adafruit-blinka
```

9. Install ola
```
sudo apt-get install -y ola
```

10. Install node/npm
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
```
    
11. Install OPC
```
npm install node-opc-server
cd node_modules/node-opc-server/opc-server
npm install
sudo node index.js
```

12. Modify ola Configs
	* Add last 2 lines to /etc/ola/ola-openpixelcontrol.conf
```
enabled = true
target = 127.0.0.1:7890
target_127.0.0.1:7890_channel = 0
```
	
13. Browse to OLA
	* Reload config
	* Add universe
	* Input = Artnet
	* Output = Open Pixel Control
    

14. Wire the pi to LED
![](led_strips_raspi_NeoPixel_powered_bb.jpg)

15. Config TD
	* Open provided TOE
	* In the DMXout Chop at select universe 1 and add RPi IP address to Network address field
	
## How to Use

### Number of LEDs
At the moment this setup will control 100 LED's with the default config. To change the number of LED's being controlled modify the 'index.js' script in the folder 'node_modules/node-opc-server/opc-server'. on the 5th libe down you will find the NUM_LED line, change the values at the end of the line to reflect the amoung of LED's you would like to control.

### DMX controller
The top 3 parameters will control 1 fixture at a time and control the color of each fixture. In the dmxout format 'Packet Per Sample', this will control 1 pixel at a time. So at the moment you will have to control the color 1 pixel at a time.

The following controls are a bit self explanatory

### TopToDMXMath
This base comp is partly taken from one of the DMXoutChop snippets and can be used to control what I believe is the whole universe. This I still need to confirm. I have a basic VU going into it that is triggered from an audiofilein.

## Known Issues
- I havent been able to get this to work with the Raspberry Pi 4 yet. For whatever reason it causes a kernel panic at step number 11 when starting the node.js server and requires a hard reboot to run any commands.



