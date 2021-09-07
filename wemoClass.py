import requests
import json
class wemo:
    def __init__(self):
        self.wemoUrl="https://kottos.wemoscooter.com/v17/scooters"
        self.headers={
            "Content-Type" : "application/json; charset=utf-8",
            "Host": "kottos.wemoscooter.com",
            "Authorization" : "WeMo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MDgyMTAiLCJ1c2VyX2lkIjoiNDA4MjEwIiwidmVyc2lvbiI6IjIuMCIsImlhdCI6MTYzMDc3MzU2MCwiZXhwIjoxNjMxMjA1NTYwfQ.M1qIUncu-IUi6Edfp9byvIDDbn6aPI4nRKgdeGtHUpg"
        }
       
        pass
    def fetch(self):
        res = requests.get(self.wemoUrl,headers=self.headers)
        wemoData = json.loads(res.text)
        wemoData = wemoData["data"]

        motorData = []
        for motor in wemoData:
            motorData.append({  "CarNo" : motor["id"],
                                "lat" : motor["lat"],
                                "lng" : motor["lng"]
                                })
        return motorData

if __name__ == '__main__':
    wemo = wemo()
    wemoData = wemo.fetch()

    for motor in wemoData:
        print (motor["CarNo"])
        print (motor["lat"])
        print (motor["lng"])
        print ("----------------------")
    print("total : {count}".format(count=str(len(wemoData))))
