# BillWise

An intelligent invoice management platform leveraging AI to streamline business operations. Built with a modern full-stack architecture, BillWise empowers users to create, manage, and analyze invoices with automated insights and AI-driven features.

## 🚀 Features

- **User Authentication & Authorization**: Secure JWT-based authentication with protected routes
- **Invoice Management**: Full CRUD operations for invoices with intuitive UI
- **AI-Powered Invoice Parsing**: Extract invoice data from unstructured text using Google Gemini AI
- **Automated Reminders**: Generate professional reminder emails for overdue invoices
- **Dashboard Analytics**: AI-generated summaries and insights for business intelligence
- **Responsive Design**: Modern, mobile-first UI built with React and Tailwind CSS
- **File Upload Support**: Handle invoice attachments with Multer middleware

## 🛠 Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs
- **AI Integration**: Google Generative AI (Gemini)
- **File Handling**: Multer for multipart uploads
- **CORS**: Enabled for cross-origin requests

### Frontend

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: Moment.js

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google AI API key (for AI features)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/BillWise.git
   cd BillWise
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   GOOGLE_AI_API_KEY=your_google_ai_api_key
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Database Connection**
   Ensure MongoDB is running and accessible via the `MONGO_URI` in your `.env` file.

## 🚀 Running the Application

### Development Mode

1. **Start Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   Server will run on `http://localhost:5000`

2. **Start Frontend Development Server**

   ```bash
   cd frontend
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

### Production Build

1. **Build Frontend**

   ```bash
   cd frontend
   npm run build
   ```

2. **Start Backend**

   ```bash
   cd backend
   npm start
   ```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Invoices

- `GET /api/invoices` - Get all user invoices
- `POST /api/invoices` - Create new invoice
- `GET /api/invoices/:id` - Get invoice by ID
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### AI Features

- `POST /api/ai/parse-text` - Parse invoice data from text
- `POST /api/ai/generate-reminder` - Generate reminder email
- `GET /api/ai/dashboard-summary` - Get AI-powered dashboard insights

## 🏗 Project Structure

```bash
BillWise/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── invoiceController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Invoice.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── invoiceRoutes.js
│   ├── index.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── invoices/
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Nikhil Ranjankumar** - _Initial work_

## 🙏 Acknowledgments

- Google AI for providing the Gemini API
- The open-source community for the amazing tools and libraries

</content>
