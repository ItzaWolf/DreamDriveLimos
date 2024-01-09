#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime
# Remote library imports

# Local imports
from app import app
from models import db, User, Limo, Booking, Review

user_data = [
    {
        "username": "KB",
        "password_hash": "3517"
    }
]

all_limos = [
    {
        "type":{
            "Sedans & SUV Limousines":{
                "name":{
                    "Cadillac XTS Sedan":{
                        "id": 1,
                        "description": "Ride in style no matter where you’re headed. Our Cadillac XTS Sedan provides a luxurious and comfortable ride whether you’re by yourself or with friends. With its spacious interior, smooth ride and advanced features, the Sunset Limo’s Cadillac XTS Sedan offers you a premium experience that will make cruising around the Denver area unforgettable.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/IMG_5685-1024x473.png",
                        "price_per_hour": 75
                    },
                    "Cadillac CT 6":{
                        "id": 2,
                        "description":"Make a statement when you use Sunset Limo’s Cadillac CT6. Its powerful engine, sleek design and advanced features makes this vehicle the perfect choice for your small party. No matter where you’re headed in the Denver area, ride in style and spacious comfort with our Cadillac CT6.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/IMG_6528-1024x473.png",
                        "price_per_hour": 89
                    },
                    "Chevy Suburban":{
                        "id": 3,
                        "description":"Take your group around Denver in our Chevy Suburban. This vehicle is spacious and comfortable, with ample seat choices for up to 6 people. Sunset Limo’s Chevy Suburban has a powerful engine, great safety features and an entertainment system for a fun and smooth ride.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/04/2021-chevrolet-suburban-ogi1.webp",
                        "price_per_hour": 85
                    },
                    "Cadillac Escalade":{
                        "id": 4,
                        "description":"Make a grand entrance with Sunset Limo’s Stretch Cadillac Escalade. Cruise around the Denver area in style and luxury with up to 6 friends. Its classy interior, ample legroom, and advanced entertainment features offers a premium party experience for you and your friends.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Escalade-Sedan-1024x576.png",
                        "price_per_hour": 95
                    }
                }
            },
            "Stretch Limousines": {
                "name":{
                    "Porsche Cayenne":{
                        "id": 5,
                        "description":"Cruise the Denver area in style and luxury when you rent Sunset Limo’s Stretch Porsche Cayenne. It has a sporty design, powerful engine and is loaded with features so your party will be one to remember. Roomy enough for 14 passengers, this Stretch Porsche Cayenne will have you and your guests riding in comfort and class.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Porsche2AJPG-1024x669.jpg",
                        "price_per_hour": 165
                    },
                    "Cadillac XT5":{
                        "id": 6,
                        "description":"Party in style and comfort in Sunset Limo’s 12-14 passenger Cadillac XT5. Not only will your guests find the ride to be elegant and smooth, with the entertainment features your party transportation will be unforgettable. Enjoy the legroom, the comfort and the amenities.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset14-2DJPG-1024x683.jpg",
                        "price_per_hour": 175
                    },
                    "Infiniti Qx80":{
                        "id": 7,
                        "description":"Ride in style and luxury in Sunset Limo’s Stretch Infiniti Qx80. Our advanced features, comfortable interior, and powerful engine make this an ideal ride for your party of up to 20. No matter where you’re headed in the Denver area, you and your guests will have an unforgettable experience while you’re on your way.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/SunsetInfiniti1AJPG-1024x683.jpg",
                        "price_per_hour": 195
                    },
                    "Cadillac Escalade Pinky":{
                        "id": 8,
                        "description":"Make a statement when you ride in “Pinky” — Sunset Limo’s bright pink Stretch Cadillac Escalade. Your group of up to 20 will be turning heads as they travel around the Denver area. With the spacious interior and advanced entertainment system, your party will be riding in style and luxury, while they enjoy the party ride of a lifetime.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/PINKY_3-1024x576.png",
                        "price_per_hour": 230
                    },
                    "Chrysler 300":{
                        "id": 9,
                        "description":"Make a grand entrance with Sunset Limo’s Stretch Chrysler 300. Cruise around the Denver area in style and luxury with up to 10 friends. Its classy interior, ample legroom, and advanced entertainment features offers a premium party experience for you and your friends.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/08/Sunset5-1CJPG-2048x1366.jpg",
                        "price_per_hour": 120
                    }
                }
            },
            "Sprinters": {
                "name":{
                    "Mercedes Limo Sprinter":{
                        "id": 10,
                        "description":"Sit back and enjoy the ride in our spacious Limo Sprinter Van. Sunset Limo will help you cruise the Denver area with up to 14 passengers in complete comfort. Relax and let us take care of the transportation while you and your friends have an unforgettable party experience.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset16-1EAJPG-1-2048x1321.jpg",
                        "price_per_hour": 155
                    },
                    "Executive Sprinter":{
                        "id": 11,
                        "description":"Sunset Limo’s Executive Sprinter provides a spacious and smooth ride for up to 12 passengers. Make your experience more memorable while you’re traveling in the Denver area. With our Executive Sprinter, you’ll have room to move, space to socialize and all of the advanced features you could want for your party ride.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/11/Sunset11-Sprinter1C-2048x1364.jpg",
                        "price_per_hour": 130
                    },
                    "Limo Sprinter":{
                        "id": 12,
                        "description":"Cruise the Denver area in comfort when you use Sunset Limo’s Executive Van. Our spacious and comfortable van seats up to 12 passengers, with space for socialization and fun. Not only is it equipped with safety features, you’ll also find it loaded with entertainment options that will be sure to wow your whole party.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/SunsetSprinter17-3BJPG-2048x1498.jpg",
                        "price_per_hour": 140
                    }
                }
            },
            "Party Buses": {
                "name":{
                    "20 Passenger Limo Bus":{
                        "id": 13,
                        "description":"Perfect for any event, day or night, Sunset Limo’s 20 passenger Limo Bus will have you cruising around the Denver area in comfort and style. No matter where you’re headed, all of your guests will be impressed with the space and amenities in our Limo Bus.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset35-13JPG.jpg",
                        "price_per_hour": 115
                    },
                    "26-30 Passenger Limo Bus":{
                        "id": 14,
                        "description":"Your party bus awaits! Sunset Limo’s 26-30 passenger Limo Bus is an ideal way to transport you and your guests. With audio entertainment amenities, ample seating and a professional driver, your party will be able to sit back, relax and enjoy a day trip or night on the town in the Denver area.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/image1-2048x1152.jpeg",
                        "price_per_hour": 125
                    },
                    "36-40 Passenger Limo Bus":{
                        "id": 15,
                        "description":"Jump aboard your luxury party ride. With Sunset Limo’s 36-40 passenger Limo Bus, you’ll be cruising the Denver area in style and comfort. Ideal for any occasion, this bus is equipped with audio entertainment, comfortable seating and a professional driver so your experience is relaxed and luxurious from start to finish.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset42-4B-1-2048x1349.jpg",
                        "price_per_hour": 145
                    },
                    "46-50 Passenger Limo Bus":{
                        "id": 16,
                        "description":"Transport your party in one of Sunset Limo’s spacious Limo Busses. Seating up to 50 guests, this limo bus is the ideal way to get your party where they want to go. Whether you’re out in Denver for the day or night, this limo bus will have you and your guests feeling comfortable, while still keeping the party going.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset44-2JPG-2048x1351.jpg",
                        "price_per_hour": 160
                    }
                }
            },
            "Luxury Coaches": {
                "name":{
                    "27 Passenger Luxury Mini Coach":{
                        "id": 17,
                        "description":"Sunset Limo’s Luxury Coach is an ideal way to travel for the night with your 27 passenger party. With room to move, dance and socialize you’ll forget that you’re on the road. Our Luxury Coach is equipped with a sound system and other great amenities for you and your guest to have a great time together.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/27-pass-coach-2048x946.png",
                        "price_per_hour": 225
                    },
                    "51 Passenger Luxury Coach":{
                        "id": 18,
                        "description":"Cruise the Denver area with up to 51 passengers on one of Sunset Limo’s Luxury Coach busses. Our professional drivers will get you where you need to be in comfort and style. The spacious interior, the fun lighting and the disco floor make this ride as much of a party as the rest of your night.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/51-pass-coach-1-1-2048x946.png",
                        "price_per_hour": 350
                    },
                    "57 Passenger Luxury coach":{
                        "id": 19,
                        "description":"If you’re traveling or spending a night on the town with a big group, use Sunset Limo’s Luxury Coach busses. With comfortable seating for up to 57 people, entertainment system and a professional driver, your party will be transported in comfort and safety.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset27-4BJPG-2048x1384.jpg",
                        "price_per_hour": 365
                    },
                    "54 Passenger Luxury Coach with Lavatory":{
                        "id": 20,
                        "description":"Fully enjoy yourself while you ride around the Denver area with Sunset Limo. Our 54 passenger Luxury Coach Bus is the epitome of comfort with spacious seating, entertainment, and a lavatory. With us you’ll be creating memories that you and your party will never forget.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/54-Passenger-1-2048x946.png",
                        "price_per_hour": 390
                    },
                    "56 Passenger Luxury Coach with Lavatory":{
                        "id": 21,
                        "description":"Ride around the Denver area in complete luxury in one of Sunset Limo’s Luxury motor coaches. This bus can comfortably host up to 56 passengers and is equipped with audio entertainment, a flat screen and a lavatory. Learn how it feels to party in style and complete comfort.",
                        "image_url":"https://www.sunsetlimo.com/wp-content/uploads/2023/02/Sunset51-2AJPG-2048x1372.jpg",
                        "price_per_hour": 400
                    }
                }
            }
        }
    }
]

review_data = [
    {
        "user_id": 1,
        "rating": 10,
        "comment": "I loved riding in pinky! Very professional driver, was able to have a very special event... Thanks to DreamDrive!"
    }
]

booking_data = [
    {
        "user_id": 1,
        "start_time": datetime(2022, 5, 12, 12, 0, 0),
        "end_time": datetime(2022, 5, 12, 15, 0, 0), 
        "limo_id": 8
    }
]

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Limo.query.delete()
        Booking.query.delete()
        Review.query.delete()

        print("Data reset")

        for user_info in user_data:
            user = User(username=user_info["username"], password_hash=user_info["password_hash"])
            db.session.add(user)
        db.session.commit()
        print("Finished Seeding User")
        for limo_info in all_limos:
            for limo_type, limos in limo_info["type"].items():
                for limo_name, limo_details in limos["name"].items():
                    # print(limo_name, limo_details, limo_type)
                    limo = Limo(
                        type=limo_type,
                        name=limo_name,
                        description=limo_details["description"],
                        image_url=limo_details["image_url"],
                        price_per_hour=limo_details["price_per_hour"]
                    )
                    db.session.add(limo)
        db.session.commit()
        print("Finished Seeding Limos")
        for review_info in review_data:
            review = Review(
                user_id=review_info["user_id"],
                rating=review_info["rating"],
                comment=review_info["comment"]
            )
            db.session.add(review)
        db.session.commit()
        print("Finished Seeding Reviews")
        for booking_info in booking_data:
            print(booking_info["start_time"], type(booking_info["start_time"]))
            print(booking_info["end_time"], type(booking_info["end_time"]))
            booking = Booking(
                user_id=booking_info["user_id"],
                start_time=booking_info["start_time"],
                end_time=booking_info["end_time"],
                limo_id=booking_info["limo_id"]
        )
        db.session.add(booking)

        db.session.commit()
        print("Finished Seeding Booking")
        print("Seeding Completed! Tables have been compiled!")