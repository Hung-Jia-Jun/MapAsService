import requests
import json
class iRent:
    def __init__(self):
        self.irentUrl="https://irentcar-app.azurefd.net/api/MotorRent"
        self.Data = {"ShowALL":'1'}
        self.headers={
            "Content-Type" : "application/json; charset=utf-8",
            "Host": "irentcar-app.azurefd.net",
        }
       
        pass
    def fetch(self):
        res = requests.post(self.irentUrl,json=self.Data,headers=self.headers)
        iRentData = json.loads(res.text)
        iRentData = iRentData["Data"]["MotorRentObj"]

        motorData = []
        for motor in iRentData:
            motorData.append({  "CarNo" : motor["CarNo"],
                                "lat" : motor["Latitude"],
                                "lng" : motor["Longitude"]
                                })
        return motorData
if __name__ == '__main__':
    iRent = iRent()
    iRentData = iRent.fetch()

    for motor in iRentData:
        print (motor["CarNo"])
        print (motor["lat"])
        print (motor["lng"])
        print ("----------------------")
    print("total : {count}".format(count=str(len(iRentData))))
