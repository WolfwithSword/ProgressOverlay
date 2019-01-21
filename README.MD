# ProgressOverlay
A simple achievement tracker and counter, compatible as a Browser source in OBS.

Unique features include:

	* Dynamically adding and removing progress bars
	* Can track individual achievements via settings page. Values update within 5 seconds.
	* Ran as a webserver, allowing settings to be changed on any local device
	* OBS Compatible Browser Source overlay - Customize your progress tracking!

Preview

![alt-text](https://imgur.com/Z0P9NcZ.png)

* *Note: The background will be transparent in OBS with the pre-filled custom CSS*


Settings Page:
![alt-text](https://imgur.com/PPqk3ac.png)


ProgressOverlay runs as a webserver on the local machine. To access the pages, you may go to the address of the machine with port offset of 5000 or do localhost:5000 (to get to settings page, the path is /settings).

View the included README.txt for more detailed information.


# OBS Setup
To set this up in OBS:
1. Add new browser source (Sources -> Add -> Browser). Name it *ProgressOverlay*
2. Configure the following values:
	* URL: localhost:5000
	* Width: 150  (Seems to work fine)
	* Height: 1080 (Or max height for convenience)
	* FPS: *any*
	* Custom CSS: *body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }*
