# BLW Railways - Train Booking System

A full-stack web application for booking train tickets with a modern React frontend and Node.js backend.

## 🚀 Features

- **Train Management**: Add, view, and manage train schedules
- **Ticket Booking**: Book tickets with passenger details
- **Booking Management**: View and cancel bookings
- **Real-time Updates**: Live seat availability updates
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Dotenv** for environment variables

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/blw-railways.git
cd blw-railways
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
npm install
```

#### Backend Dependencies
```bash
cd server
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/blw-railways
PORT=5000
NODE_ENV=development
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `blw-railways`

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

### 5. Seed the Database
```bash
cd server
npm run seed
```

### 6. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
```
Backend will run on: http://localhost:5000

#### Start Frontend (in a new terminal)
```bash
npm run dev
```
Frontend will run on: http://localhost:5173

## 📁 Project Structure

```
project/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── App.tsx            # Main App component
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── index.js           # Server entry point
│   └── seedData.js        # Database seeding script
├── package.json           # Frontend dependencies
└── README.md             # Project documentation
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## 🌐 API Endpoints

### Trains
- `GET /api/trains` - Get all trains
- `POST /api/trains` - Add new train
- `PUT /api/trains/:id` - Update train
- `DELETE /api/trains/:id` - Delete train

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/search` - Search booking by ID or email
- `DELETE /api/bookings/:id` - Cancel booking

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Backend (Railway/Heroku)
1. Push code to GitHub
2. Connect repository to Railway/Heroku
3. Add environment variables
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the styling framework 

## 🔧 The Issue:

Your frontend is still trying to connect to `localhost:5000` instead of your Railway backend URL. Let's check and fix this.

## 🔍 Step 1: Test Your Backend Directly

First, let's verify if your Railway backend is actually working. Open a new browser tab and visit:

```
https://blw-railways-production.up.railway.app/api/test
```

**What do you see?**
- ✅ If you see `{"message": "Backend server is running!"}` - backend is working
- ❌ If you see an error or nothing - backend has issues

## 🔍 Step 2: Check Railway Backend Status

Go to your Railway dashboard and check:
1. **Is your backend still showing "ACTIVE"?**
2. **Are there any error messages in the logs?**
3. **Click "View logs"** to see if there are any startup errors

## 🔍 Step 3: Check Browser Console

1. **Open your Vercel frontend**
2. **Press F12** to open developer tools
3. **Go to Console tab**
4. **Look for any error messages** when the page loads
5. **Tell me what errors you see**

## 🔍 Step 4: Add Environment Variables to Railway

Your backend might be failing because it doesn't have the MongoDB connection. Let's add it:

1. **Go to Railway dashboard**
2. **Click "Variables" tab**
3. **Add these environment variables:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blw-railways?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   ```

## 🔍 Step 5: Check CORS Configuration

The issue might be CORS (Cross-Origin Resource Sharing). Let me check your backend CORS settings:
