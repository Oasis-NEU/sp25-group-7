from fastapi import FastAPI, Query
import requests
import os


API_KEY = os.getenv("API_KEY")
HEADERS = {
    "accept": "application/json",
    "Authorization": f"Bearer {API_KEY}"
}
app = FastAPI()

@app.api_route("/", methods=["GET", "HEAD"])
async def root():
    return {"message": "FastAPI is running!"}

@app.get("/bars/search/")
def bars_by_search_city(city, limit = 20):
    """
    returns info of bars by specific search city 

    :city: str, name of city, split space by %20 in hyperlink
    :limit: int, limit number of search returns
    """
    
    url = f"https://api.yelp.com/v3/businesses/search?location={city}&term=bar&sort_by=best_match&limit={limit}"
    response = requests.get(url, headers=HEADERS).json()
    return get_info(response)

@app.get("/bars/location/")
def bars_by_user_loc(lat, lon, limit = 20):
    """
    returns info of bars by user lat lon, can track live user loc

    :lat: float, latitude position
    :lon: float, longtitude position
    :limit: int, limit number of search returns
    """

    url = f"https://api.yelp.com/v3/businesses/search?latitude={lat}&longitude={lon}&sort_by=best_match&limit={limit}"
    response = requests.get(url, headers=HEADERS).json()
    return get_info(response)

def bars_open_now():
    pass

def get_info(response):
    """
    returns preliminary info, called in other routes about bars

    :response: str, yelp API call link
    """
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    info = []

    for i in range(len(response.get('businesses', []))):  # Safely access 'businesses' key
    
        business = response["businesses"][i]
        hours = {}

        # Check if 'business_hours' exists and contains data
        if "business_hours" in business and business["business_hours"]:
            # Only attempt to access the first element if the list is not empty
            business_hour = business["business_hours"][0] if business["business_hours"] else {}
            for entry in business_hour.get('open', []):
                day_index = int(entry['day'])
                hours[days[day_index]] = f"{entry['start'][:2]}:{entry['start'][2:4]} - {entry['end'][:2]}:{entry['end'][2:4]}"

            # Safely get "is_open_now" only if business_hours contains data
            open_now = business_hour.get("is_open_now", "N/A")
        else:
            hours = {}
            open_now = "N/A"

        # Construct the business information
        temp = {
            'name': business.get("name", "N/A"),
            'image': business.get("image_url", "N/A"),
            'rating': business.get("rating", "N/A"),
            'latitude': business.get('coordinates', {}).get('latitude', "N/A"),
            'longitude': business.get('coordinates', {}).get('longitude', "N/A"),
            'address': ", ".join(business.get('location', {}).get('display_address', [])),
            'phone': business.get('display_phone', "N/A"),
            'Hours': hours,
            'open_now': open_now,
            'menu': business.get("attributes", {}).get("menu_url", "N/A")
        }
        info.append(temp)
    
    return info



@app.get("/")
def root():
    return {"message": "Yelp Bar Search API is Running!"} 

### run this
#uvicorn routes:app --host 0.0.0.0 --port 8000 --reload