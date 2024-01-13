from fastapi import FastAPI
from pymongo import MongoClient
import uvicorn
#allow cors
from fastapi.middleware.cors import CORSMiddleware


client =MongoClient("") #add mongodb connection string here

db=client.tax_db
usercollection=db.users

print(usercollection.find_one())
#add cors
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#get all users
@app.get("/users")
def get_users():
    all_users=list(usercollection.find({}))
    all_users_cleaned=[]
    for items in all_users:
        del items['_id']
        all_users_cleaned.append(items)
    return all_users_cleaned

@app.get("/user/{user_id}")
def get_users(user_id:int):
    user=usercollection.find_one({"user":str(user_id)})
    if user is not None:
        del user['_id']
    return user


@app.post("/user")
def set_user(user:dict):
    user_id=usercollection.insert_one(user).inserted_id.__str__()
    return user_id

if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0",port=5000)
