from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
bcrypt = Bcrypt()
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)

    booking = db.relationship("Booking", back_populates="user")
    review = db.relationship("Review", back_populates="user")

    serialize_rules=("-booking.user", "-review.user",)

    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 2:
            raise ValueError("Username must be at least two characters long")
        return username

    @validates('password')
    def validate_password(self, key, password):
        if len(password) < 4:
            raise ValueError("Password must be at least four characters long")
        return password

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    
class Limo(db.Model, SerializerMixin):
    __tablename__ = "limos"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    price_per_hour = db.Column(db.Integer)

    booking = db.relationship("Booking", back_populates="limo")

    serialize_rules=("-booking.limo",)

class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    limo_id = db.Column(db.Integer, db.ForeignKey("limos.id"))

    user = db.relationship("User", back_populates="booking")
    limo = db.relationship("Limo", back_populates="booking")

    serialize_rules=("-user.booking", "limo.booking",)

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    user = db.relationship("User", back_populates="review")

    serialize_rules=("-user.review",)