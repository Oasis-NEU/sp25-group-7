import requests

HEADERS = {
    "accept": "application/json",
    "authorization": "Bearer _4V4CajSDZHF0MICGv-EdVVeAL_S_a9_Ps9LgtPyVG8Tz8wrpDlOXgPqgV72gcpMDatuU1BGRJ5utwj-YomnmVT92lZGkXNaJsThmxxjLplzJp6C9k0beho9frifZ3Yx"
}



def bars_by_search_city(city, limit = 20):
    
    url = f"https://api.yelp.com/v3/businesses/search?location={city}&term=bar&sort_by=best_match&limit={limit}"
    response = requests.get(url, headers=HEADERS).json()
    return get_info(response)

def bars_by_user_loc(lat, lon, limit = 20):

    url = f"https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lon}&sort_by=best_match&limit={limit}"
    response = requests.get(url, headers=HEADERS).json()
    return get_info(response)

def bars_open_now():
    pass
def get_info(response):
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    hours = {}  

    info = []

    for i in range(len(response['businesses'])):

        for entry in response["businesses"][i]["business_hours"][0]['open']:
            day_index = int(entry['day'])
            hours[days[day_index]] = str(entry['start'][0:2]) + ":" + str(entry['start'][2:4]) + " - " + str(entry['end'][0:2]) + ":" + str(entry['end'][2:4])
        
        temp = {
            'name': response["businesses"][i]["name"],
            'image': response["businesses"][i]["image_url"],
            'rating': response["businesses"][i]["rating"],
            'latitude': float(response["businesses"][i]['coordinates']['latitude']),
            'longitude': float(response["businesses"][i]['coordinates']['longitude']),
            'address': str(response["businesses"][i]['location']['display_address'][0]) + str(response["businesses"][i]['location']['display_address'][1]),
            'phone': response["businesses"][i]['display_phone'],
            'Hours': hours,
            'open_now': response["businesses"][i]["business_hours"][0]["is_open_now"],
            'menu': response["businesses"][i]["attributes"]["menu_url"]
        }
        info.append(temp)
    return info
    

def main():
    resp = bars_by_search_city("Boston")
    print(resp)
if __name__ == "__main__":
    main()