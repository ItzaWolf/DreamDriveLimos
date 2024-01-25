from flask import request, session, make_response, jsonify, render_template
from flask_restful import Resource
from flask_cors import CORS
import datetime
from config import app, db, Api

from models import User, Limo, Booking, Review
api = Api(app)
CORS(app)
app.secret_key = b'$#V\x14\x04\xb8\x12%\xde[8q\xd5\xb7E\x15'

class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            return user.to_dict(rules=('-booking',)), 200
        else:
            return {"message": "User not found"}, 404

    def post(self):
        data = request.get_json()
        existing_user = User.query.filter_by(username=data['username']).first()
        if existing_user:
            return {"message": "Username already exists"}, 409
        new_user = User(
            username = data['username'],
            password_hash = data["password"]
        )
        
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        print(session['user_id'])
        return new_user.to_dict(), 201
    
    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()

        return {}, 204
    

api.add_resource(UserResource, '/user', '/user/<int:user_id>')

class Login(Resource):
    def post(self):
        data = request.get_json() 
        username = data["username"]
        password = data["password"]
        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
        else:
            return "Unauthorized", 401
api.add_resource(Login, '/login', endpoint="login")

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session.clear()
            return {}, 204
        else:
            return {"message": "User not logged in"}, 401

api.add_resource(Logout, '/logout', endpoint="logout")

class EditUserResource(Resource):
    methods = ['PATCH']

    def patch(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {"message": "User not found"}, 404

        data = request.get_json()
        print("Received JSON data:", data)

        if 'username' in data:
            user.username = data['username']
        if 'password' in data:
            user.password_hash = data['password']

        db.session.commit()

        return user.to_dict(), 200
    
api.add_resource(EditUserResource, '/edituser/<int:user_id>')

class LimoResource(Resource):
    def get(self):
        limos = [limo.to_dict() for limo in Limo.query.all()]
        return limos, 200

api.add_resource(LimoResource, '/limos')

class LimoByIdResource(Resource):
    def get(self, limo_id):
        if limo_id:
            limo = Limo.query.get(limo_id)
            if limo:
                return limo.to_dict(), 200
            else:
                return {"message": "Review not found"}, 404
        
api.add_resource(LimoByIdResource, '/limo/<int:limo_id>')

class BookingResource(Resource):
    # def get(self):
    #     bookings = [booking.to_dict(rules=('-user.booking', 'limo.booking',)) for booking in Booking.query.all()]
    #     return bookings, 200
    def get(self):
        user_id = session.get('user_id')
        if user_id is not None:
            bookings = Booking.query.filter_by(user_id=user_id).all()
            return [booking.to_dict() for booking in bookings], 200
        else:
            return {'error': 'User not logged in'}, 401
    
    def post(self):
        data = request.get_json()
        format_data_iso8601 = "%Y-%m-%dT%H:%M:%S.%f%z"

        new_booking = Booking(
            user_id=data['user_id'],
            limo_id=data['limo_id'],
            start_time=datetime.datetime.strptime(data['start_time'], format_data_iso8601),
            end_time=datetime.datetime.strptime(data['end_time'], format_data_iso8601),
        )

        db.session.add(new_booking)
        db.session.commit()

        return new_booking.to_dict(), 201

api.add_resource(BookingResource, '/booking')

class BookingByIdResource(Resource):
    def delete(self, booking_id):
        booking = Booking.query.get(booking_id)
        if not booking:
            return {"message": "Booking not found"}, 404

        db.session.delete(booking)
        db.session.commit()

        return {}, 204

api.add_resource(BookingByIdResource, '/booking/<int:booking_id>')

class ReviewResource(Resource):
    def get(self, review_id=None):
        if review_id:
            review = Review.query.get(review_id)
            if review:
                return review.to_dict(), 200
            else:
                return {"message": "Review not found"}, 404
        else:
            reviews = [r.to_dict() for r in Review.query.all()]
            return reviews, 200
        
    def post(self):
        data = request.get_json()
        new_review = Review(
            user_id=data['user_id'],
            rating=data['rating'],
            comment=data['comment']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    
    def patch(self, review_id):
        review = Review.query.get(review_id)
        if review:
            data = request.get_json()
            if 'rating' in data:
                review.rating = data['rating']
            if 'comment' in data:
                review.comment = data['comment']
            db.session.commit()
            return review.to_dict(), 200
        else:
            return {"message": "Review not found"}, 404
        
    def delete(self, review_id):
        review = Review.query.get(review_id)
        if review:
            db.session.delete(review)
            db.session.commit()
            return {}, 204
        else:
            return {"message": "Review not found"}, 404
                
api.add_resource(ReviewResource, '/review', '/review/<int:review_id>')

# @app.route('/check_session')
# def check_session():
#     user_id = session.get('user_id')
#     if user_id is not None:
#         user = User.query.get(user_id)
#         if user:
#             user_data = user.to_dict()
#             return jsonify(user_data)
#         else:
#             return jsonify({"message": "User not found"}), 404
#     else:
#         return jsonify({})


@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]

    exempt_prefixes = ['/limos', '/limo/']

    if any(request.endpoint.startswith(prefix) for prefix in exempt_prefixes) and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401

@app.before_request
def check_session():
    print(session)
    if session.get("user_id") is None:
        session["user_id"] = None
        print(session["user_id"])
    else:
        print("There is a session")
        print(session["user_id"])

class CheckSession(Resource):

    def get(self):
        user_id = session.get('user_id')

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200

        return {'message': 'No user session'}, 200  # Change this to 200 if you want to indicate that the request was successful without a user session

api.add_resource(CheckSession, '/check_session', endpoint="check_session")



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

