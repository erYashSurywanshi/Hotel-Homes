# Airbnb Clone - Listing and Review Platform

This is a full-stack web application built with Node.js and Express.js, simulating an Airbnb-like platform for creating, viewing, editing, and reviewing listings (e.g., accommodations). Users can sign up, log in, post listings with images, and add reviews. It integrates MongoDB for data persistence, EJS for server-side rendering, and Cloudinary for image storage.

## Features
- **User Authentication**: Register, login, and logout using Passport.js with local strategy.
- **Listings Management**: Create, read, update, delete (CRUD) listings with title, description, price, location, images, and owner association.
- **Reviews System**: Add, view, and delete reviews for listings (with ratings 1-5). Reviews are cascaded deleted when a listing is removed.
- **Image Upload**: Supports image uploads to Cloudinary.
- **Flash Messages**: For success/error notifications.
- **Responsive Views**: EJS templates with CSS styling for listings index, show, new/edit forms, user login/signup, and error pages.

## Tech Stack
- **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM)
- **Database**: MongoDB (via Atlas for cloud hosting)
- **Authentication**: Passport.js with passport-local-mongoose
- **Templating**: EJS with ejs-mate
- **File Upload**: Multer with Cloudinary storage
- **Sessions**: Express-session with MongoDB store
- **Other**: Method-override for PUT/DELETE, Connect-flash for messages, Joi for validation (in schemas)

## Prerequisites
- Node.js (v20.17.0 recommended)
- MongoDB Atlas account (for cloud database) or local MongoDB instance
- Cloudinary account (for image uploads; optional if not using images)

## Installation
1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd Airbnb
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   ATLASDB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/Listing-Host?retryWrites=true&w=majority
   SECRET=your-secret-key-here  # For sessions (generate a strong one)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_KEY=your-cloud-key
   CLOUDINARY_SECRET=your-cloud-secret
   ```
   - Replace placeholders with your actual values.
   - `ATLASDB`: Your MongoDB Atlas connection string.
   - `SECRET`: A secure secret for session encryption.

4. (Optional) Seed the database with sample data:
   - Run `node init/index.js` to populate initial listings/users (if init/data.js has seed data).

## Running the Application
1. Start the server:
   ```
   node app.js
   ```
   - The server will run on `http://localhost:8080`.

2. Access the app:
   - Home: `/` (redirects to listings or login)
   - Listings: `/listings` (index), `/listings/new` (create), `/listings/:id` (show)
   - User: `/login`, `/signup`
   - Reviews: Added via listing show page.

3. In development mode, the app connects to MongoDB and logs "Connected to MongoDB" on success.

## Project Structure
```
.
├── app.js                  # Main Express app setup (routes, middleware, DB connection)
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not committed)
├── model/                  # Mongoose schemas/models
│   ├── listing.js          # Listing model (title, price, location, reviews, owner)
│   ├── review.js           # Review model (comment, rating, author)
│   └── User.js             # User model (email, auth via passport-local-mongoose)
├── Controllers/            # Route handlers (CRUD logic)
│   ├── listing.js
│   ├── review.js
│   └── User.js
├── router/                 # Express routers
│   ├── listing.js          # /listings routes
│   ├── review.js           # /listings/:id/reviews routes
│   └── User.js             # / (auth routes)
├── views/                  # EJS templates
│   ├── listings/           # Listing views (index, show, new, edit)
│   ├── User/               # Auth views (login, signup)
│   ├── err.ejs             # Error page
│   └── includes/           # Shared partials (navbar, footer, flash)
├── public/                 # Static assets
│   └── css/                # Stylesheets (style.css, review.css)
├── utils/                  # Utilities
│   ├── ExpressErrors.js    # Custom error class
│   └── wrapAsync.js        # Async error wrapper
├── schema.js               # Joi schemas for validation (if used)
├── cloudConfig.js          # Cloudinary config
├── init/                   # Database seeding
│   ├── data.js
│   └── index.js
└── .gitignore              # Git ignore rules
```

## API Endpoints (Key Routes)
- `GET /listings`: List all listings
- `POST /listings`: Create new listing (authenticated)
- `GET /listings/:id`: Show listing with reviews
- `PUT /listings/:id`: Update listing
- `DELETE /listings/:id`: Delete listing (cascades reviews)
- `POST /listings/:id/reviews`: Add review
- `DELETE /listings/:id/reviews/:reviewId`: Delete review
- `GET /login`, `POST /login`: User login
- `GET /signup`, `POST /signup`: User registration

## Error Handling
- 404 for unknown routes.
- Custom errors rendered via `err.ejs`.
- Flash messages for user feedback (success/error).

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License
This project is licensed under the ISC License - see the LICENSE file for details (or add one if needed).

## Contact
For questions, open an issue on GitHub.

---

*Note: Ensure your MongoDB Atlas cluster allows connections from your IP. For production, secure the app with HTTPS and proper env management.*
