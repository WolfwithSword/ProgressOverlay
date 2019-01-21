from flask import Flask, flash, Response, redirect, render_template, request, session, abort
import re, json, datetime
import errno, os, sys
import logging
from logging.handlers import RotatingFileHandler
from flask import send_from_directory
from os import path
import socket

from gevent.pywsgi import WSGIServer

hostname = socket.gethostname()
IP = socket.gethostbyname(hostname)

asciiArt = """\n
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
                        .////////*                         \n"""

app=Flask(__name__)


@app.route('/getData')
def get_file():
    # cache_timeout is in seconds from the send_file options
    return send_from_directory("data", "progress.json", cache_timeout=5)

@app.route("/")
def index():
    return render_template("bars.html")

@app.route("/settings")
def settings():
    return render_template("settings.html")

@app.route("/bars")
def bars():
    return render_template("bars.html")

@app.route("/bars.html")
def barshtml():
    return render_template("bars.html")

#@app.route("/log")
#def show_log():
#    data=None
#    with open("static/server.log") as f:
#        data=f.read()
#    return Response(data, mimetype='text/plain')

@app.route("/addBar", methods=['POST'])
def addData():
    bar = request.json
    file = open("data/progress.json",'r')
    data = json.loads(file.read())
    file.close()
    bar['value'] = 0 if bar['value'] == "" else int(bar['value'])
    bar['maxval'] = 0 if bar['maxval'] ==""  else int(bar['maxval'])
	
    if( bar['name'] != "" and bar['value'] != "" and bar['maxval'] != ""):
        i=0
        while(i<len(data['ProgressBars'])):
            x=data['ProgressBars'][i]
            if (x['name'] == bar['name']):
                data['ProgressBars'].pop(i)
                break
            i+=1
        data['ProgressBars'].append(bar)
        saveJSON(data)
        #app.logger.info
        print("Adding Progress Bar {name} with max value {maxvalue}".format(name=bar['name'], maxvalue=bar['maxval']))
    return "OK"

@app.route("/editBar", methods=['POST'])
def editData():
    bar = request.json
    file = open("data/progress.json",'r')
    data = json.loads(file.read())
    file.close()
    i=0
    while(i<len(data['ProgressBars'])):
        x=data['ProgressBars'][i]
        if (x['name'] == bar['name']):
            data['ProgressBars'][i]['value'] = int(bar['value'])
            data['ProgressBars'][i]['completed'] = bar['completed']
            saveJSON(data)
            #app.logger.info
            print("Editing Progress Bar \"{name}\". {val} Total Completed".format(name=bar['name'], val=len(bar['completed'])))
            return "OK"
        i+=1
    return "ERROR"

@app.route("/removeBar", methods=['POST'])
def removeData():
    bar = request.json
    file = open("data/progress.json",'r')
    data = json.loads(file.read())
    file.close()
    i=0
    while(i<len(data['ProgressBars'])):
        x=data['ProgressBars'][i]
        if (x['name'] == bar['name']):
            data['ProgressBars'].pop(i)
            saveJSON(data)
            #app.logger.info
            print("Removing Progress Bar {name}".format(name=bar['name']))
            return "OK"
        i+=1
    return "ERROR"

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

#@app.before_request
#def log_request_info():
#    app.logger.debug('Headers: %s', request.headers)
#    app.logger.debug('Body: %s', request.get_data())
#    app.logger.debug('Json: %s', request.json)

def saveJSON(data):
    file = "data/progress.json"
    with open(file, 'w') as f:
        json.dump(data,f,indent=4, sort_keys=True)
    
if __name__=="__main__":
    print(asciiArt)
    print("\n\nLoading Bars Interface: "+IP+":5000\nSettings Page: "+IP+":5000/settings\n\n")
    #handler = RotatingFileHandler('static/server.log', maxBytes=20000,backupCount=5)
    #handler.setLevel(logging.DEBUG)
    #app.logger.setLevel(logging.ERROR)
    #app.logger.addHandler(handler)
    #log = logging.getLogger("werkzeug")
    #log.setLevel(logging.ERROR)
    #log.addHandler(handler)
    #log.addHandler(logging.StreamHandler(sys.stdout))

    #app.run(host="0.0.0.0", port=5000, extra_files=extra_files)
    http_server = WSGIServer(('',5000), app, log=None)
    http_server.serve_forever()
