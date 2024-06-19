# Sports Facility Booking Platform

## Project Name

Sports Facility Booking Platform

## Live Deployment Link

[Live Deployment (Server)](https://assignment-3-nosql-backend.vercel.app/)

## GitHub Repository Links

[GitHub Repository (Server)](https://github.com/AR-Raju/sports_facility_booking_platform)

## Features

- **User Management**:
  - Two types of users: Admin and User.
  - Admin can create, update, and delete facilities.
  - Users can book and cancel bookings for facilities.
  - Both Admin and Users can view bookings.
  - Admins can see who made the bookings.
  - Both Admin and Users can view facility details.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AR-Raju/sports_facility_booking_platform.git
   cd sports_facility_booking_platform
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory.
   - Add the following variables with your own values:
     ```env
     MONGO_URI=<your_mongodb_connection_string>
     JWT_ACCESS_SECRET=<your_jwt_secret>
     PORT=<your_preferred_port>
     ```

4. **Run the project**

   - For development:
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm run start:prod
     ```

## Usage

### API Endpoints

- **User Authentication**

  - `POST /api/auth/login`: Login a user
  - `POST /api/auth/signup`: Register a new user

- **Facility Management (Admin)**

  - `POST /api/facility`: Create a new facility
  - `PUT /api/facility/:id`: Update a facility
  - `GET /api/facilities`: Get all facilities

- **Booking Management**

  - `GET /api/check-availability??date=2024-07-16`: Check available bookings on a particular date
  - `POST /api/bookings`: Create a new booking
  - `GET /api/bookings`: Get all bookings
  - `DELETE /api/bookings/:id`: Cancel a booking

### Example Requests

- **Login**
- Admin credential

  ```bash
  curl -X POST https://assignment-3-nosql-backend.vercel.app/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "web@programming-hero.com",
    "password": "programming-hero"
  }'
  ```

- User credential
  ```bash
  curl -X POST https://assignment-3-nosql-backend.vercel.app/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
   "email": "asikur123@example.com",
   "password": "12345"
  }'
  ```
