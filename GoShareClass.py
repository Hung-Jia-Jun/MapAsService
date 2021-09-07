import requests
import json
class GoShare:
    def __init__(self):
        self.GoShareUrl="https://rental.ridegoshareapi.com/v2/cities/514f2d1d-9faf-490b-b9b2-fe8ce4dce584/scooters"
        self.headers={
            "Content-Type" : "application/json; charset=utf-8",
            "Host": "rental.ridegoshareapi.com",
            "User-Agent" : "GoShare/2.7.6"
        }
       
        pass
    def fetch(self):
        res = requests.get(self.GoShareUrl,headers=self.headers)
        goshareData = json.loads(res.text)
        goshareData = goshareData["upsert_lst"]

        motorData = []
        for motor in goshareData:
            motorData.append({  "CarNo" : motor["plate"],
                                "lat" : motor["lat"],
                                "lng" : motor["lng"]
                                })
        return motorData

if __name__ == '__main__':
    GoShare = GoShare()
    GoShareData = GoShare.fetch()

    for motor in GoShareData:
        print (motor["CarNo"])
        print (motor["lat"])
        print (motor["lng"])
        print ("----------------------")
    print("total : {count}".format(count=str(len(GoShareData))))