# Welcome to DreamDrive Limo Rentals!

Full stack website app that allows users to view limos, book a limo for a specific time-block, and leave reviews on limo experience.
Developed frontend using React.js and Vanilla CSS for a modern and interactive user interface.
Powered backend by Flask, a Python web framework, ensuring robust server-side functionality.
Incorporated SQLAlchemy ORM for efficient database interactions, secure user authentication and session management.
Used Bootstrap CSS to style the front end for simplified user navigation.

## Installation & Running Frontend server

In order to get our frontend server running we first need to install the dependencies! (PS: I would recommend creating two terminals now so we can run both ends of the servers, as they are dependent on each other!)

```bash
cd client/
```

```bash
npm install
```
After this we can start our front end from the client directory at anytime using:
```bash
npm run dev
```

## Installation & Running Backend server

Similar to before we need to install the dependcies for the backend!
First we will install our python environment!

```bash
pipenv install
```
Now we will enter our python envirement!

```bash
pipenv shell
```
Now that we are in our envirement all we need to do is go to the backend server and run it!
```bash
cd server/
```

```bash
python app.py
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

All of the images were pulled from
[Sunsetlimos](https://www.sunsetlimo.com/)!
I give all credit for all the photos used!
Please make sure to check them out as they inspired quite a bit of the website!