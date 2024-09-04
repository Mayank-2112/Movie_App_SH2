
# FlixCribe

This is a Movie Booking Website system for Cinema Theatres in a city. This is a dummy website and does not accept real money. It allows users to select and book seats for movies with a dynamic seating chart. It features real-time seat selection, price calculation based on seat type, and integrates Stripe for secure payments. Users can view movie details and enjoy a seamless, user-friendly booking experience.


## Production

To run this project:

- You have to run the following commands twice- once in root directory and then in "./frontend" directory

```bash
  npm i
  npm run dev
```
- Hosted on:

```https
https://flixcribe.onrender.com
```



## API Reference

#### APIs used:

```
  TMDB API
  Movieglu API
```


## Features

- "Now Showing" and "Upcoming" Sections
    - These sections help the user to see what movies are currently showing in theatres and what movies will be avaialable later, after their release.
- Summary
    - Details about the movie such as genre, rating, cast, trailer, overview, etc.
- User CRUD
    - Users can update their Name, Email, City and Password in the profile popup after login.
    - Users can also delete their account and logout.
- BookNow page can only be viewed after the user has logged in.


## Admin

- For admin login use the credentials:
```
email: user@gmail.com
password: #user21
```
## Tech Stack

**Client:** React, Redux, CSS3, Vite

**Server:** Node, Express, MongoDB, Firebase

