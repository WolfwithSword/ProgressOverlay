                     .*/(####(((((/*,
                 .*(##%&&&&&%%%%%%%%##(/,
               *(#%&&&&&&&&&%%%%%%%%%%%%#/*.
             /(%&&&&&&%%#####(((((##%%%%%%%(/,
           *(%%&&&%#((/            ,/((#%%%%%(/.
          (#%&&&%#(,                   /(#%%%%#(*
        .(#%&&(,                         /(%%%%%(*
        (#&&&%#/                         *(%%%%%(*
       *#%&&%/            Welcome          *(%%%%#(.
       (%&&&%(.             To              /(%%%%(*
       (%&&&%(         Loading Bars         *(%%%%(*
       (%&&&%(            Overlay           *(%%%%(*
       (%&&&%(              By              *(%%%%(*
       (#&&&%(*        WolfwithSword        /#%%%%(*
       *(%&&&%(.                           /(%%%%#/
        *(%&%%#(,                         /(%%%%%(*
         /(%%%%%#(                      *(#%%%%#(*
          *(%%%%%%#(.                 *(#%%%%%#(,
           *(#%%%%%%#((*.         ,/(#%%%%%%#(/
             ,(#%%%%%%%%##(((((((##%%%%%%%#(/
               ./(#%%%%%%%%%%%%%%%%%%%%%#(*
                  ./(((##%%%%%%%%%##((/*
                        .////////*
						
Custom Achievement Tracking Loading Bar Circles - Doesn't roll off the tongue well.

Initial Version Created 2018-01-21 by WolfwithSword.

Using: 
			Loading Bars by Loading.io https://loading.io/progress/
			JSColor http://jscolor.com

__________________________________________________________________________
Usage:  Run the EXE. Any device on your local network can access the 
		loading bars interface or the settings page at the URLs displayed.
		It is run on localhost of the host machine.

__________________________________________________________________________
This program uses a Flask App run in an WSGIServer.

If running or building from source, you will need certain packages.
Such as: flask, gevent

__________________________________________________________________________		
The idea is the interface can be used as a browser source overlay in OBS (see setup below).
The settings page can be configured externally, either in another browser tab or another device.

__________________________________________________________________________
OBS Setup: 
	Under Sources -> Add -> Browser. Create New and name it whatever you want.
	Set the following values:
								URL: localhost:5000   OR   <machine_IP>:5000
								Width: 150			(works well for me)
								Height: 1080			(max height preferably to allow multiple)
								FPS: 10			(It doesn't update much so it can be anything, can even do 1)
								Custom CSS: body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }
	Recommend to enable "Refresh Browser when scene becomes active"

__________________________________________________________________________
