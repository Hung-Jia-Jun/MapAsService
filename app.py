from flask import Flask,request,redirect
from flask import render_template,Response
import time
import re
import sys
import os
from flask_sqlalchemy import SQLAlchemy
import threading
import datetime
import os
from flask_migrate import Migrate
from flask_cors import cross_origin,CORS
import string
import random
from flask_socketio import SocketIO, emit
import json
import requests
from irentClass import iRent
from wemoClass import wemo
from GoShareClass import GoShare

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*", async_mode='threading')
@app.route("/")
def index():
	return render_template('map.html')

#取得用戶輸入的網址
@app.route("/fetchAllMotor")
def fetchAllMotor():
    socketio.emit('server_response', { 'data' : '查詢iRent中...','status': "33" })
    _iRent = iRent()
    iRentData = _iRent.fetch()

    socketio.emit('server_response', { 'data' : '查詢Wemo中...','status': "66" })
    _wemo = wemo()
    wemoData = _wemo.fetch()

    socketio.emit('server_response', { 'data' : '查詢GoShare中...','status': "100" })
    _GoShare = GoShare()
    GoShareData = _GoShare.fetch()

    integration=[
                    {
                        "name" : "iRent",
                        "data" : iRentData,
                        "count" : str(len(iRentData)),
                    },
                    {
                        "name" : "wemo",
                        "data" : wemoData,
                        "count" : str(len(wemoData)),
                    },
                    {
                        "name" : "GoShare",
                        "data" : GoShareData,
                        "count" : str(len(GoShareData)),
                    }
                ]
    res_json = json.dumps(integration, ensure_ascii=False)
    socketio.emit('server_response', { 'data' : '查詢完成','status': "100" })
    return Response(response=res_json,
			status=200,
			mimetype="application/json")

# @cross_origin()
@socketio.on('Client_event')
#接收來自前端的訊息
def Client_event(msg):
	print(msg)
	#發送訊息給前端
	# socketio.emit('server_response', { 'data': "OK" })
	return Response(status=200)

# @socketio.on('my event')
# def Client_event(msg):
#     print('received msg: ' + str(msg))

if __name__ == "__main__":
	if "isHeroku" in os.environ:
		port=int(os.environ["PORT"]) 
	else:
		port=8080
	#為何使用8000 port呢?
	#因為小於1024的port需要sudo 才能運行
	#heroku沒有sudo 的執行權限
	#https://stackoverflow.com/questions/45385384/how-can-i-run-as-root-on-heroku
	socketio.run(app, host="0.0.0.0", port=port, use_reloader=False)
	# app.run(host='0.0.0.0',port=8000)