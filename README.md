# Jarir Bookstore Management Frontend

A modern and responsive bookstore management system frontend built with React, Tailwind CSS, Redux Toolkit, and shadcn/ui. This application provides an intuitive interface for managing books, inventory, orders, customers, and reports.

## 🚀 Features

- 📚 Book Management

  - Add, edit, delete, and view books
  - Book categorization
  - Search and filtering

- 📦 Inventory Management

  - Stock tracking
  - Inventory updates
  - Low-stock alerts

- 👥 Customer Management

  - Customer profiles
  - Purchase history
  - Customer information management

- 🛒 Order Management

  - Create and manage orders
  - Order status tracking
  - Order history

- 📊 Dashboard & Analytics

  - Sales overview
  - Inventory reports
  - Business insights

- 🔐 Authentication & Authorization

  - Secure login system
  - Role-based access control
  - Protected routes

- 📱 Fully Responsive Design
  - Mobile-friendly interface
  - Tablet support
  - Desktop optimization

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- shadcn/ui
- Axios
- React Hook Form
- Zod
- Lucide React

### Backend Integration

- REST API
- JWT Authentication

## 📂 Project Structure

```bash
jarir-bookstore-management-frontend/
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── images/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Loader.jsx
│   │   │   ├── DataTable.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── forms/
│   │   ├── charts/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   └── DashboardStats.jsx
│   │   │
│   │   ├── Books/
│   │   │   ├── BookList.jsx
│   │   │   ├── AddBook.jsx
│   │   │   └── EditBook.jsx
│   │   │
│   │   ├── Categories/
│   │   ├── Inventory/
│   │   ├── Orders/
│   │   ├── Customers/
│   │   ├── Reports/
│   │   ├── Users/
│   │   ├── Settings/
│   │   └── Authentication/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── ForgotPassword.jsx
│   │
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── Router.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   │
│   │   ├── api/
│   │   │   ├── baseApi.js
│   │   │   ├── authApi.js
│   │   │   ├── booksApi.js
│   │   │   ├── ordersApi.js
│   │   │   └── customersApi.js
│   │   │
│   │   └── features/
│   │       ├── auth/
│   │       ├── books/
│   │       ├── inventory/
│   │       ├── orders/
│   │       └── customers/
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── bookService.js
│   │   └── orderService.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── usePagination.js
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   ├── context/
│   │   └── AuthProvider.jsx
│   │
│   ├── constants/
│   │   ├── roles.js
│   │   ├── routes.js
│   │   └── apiEndpoints.js
│   │
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── currencyFormatter.js
│   │   ├── localStorage.js
│   │   └── validationSchemas.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── components.json
├── eslint.config.js
├── tailwind.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### Clone Repository

git clone https://github.com/your-username/jarir-bookstore-management-frontend.git

### Navigate to Project

cd jarir-bookstore-management-frontend

### Install Dependencies

bun install

### Start Development Server

bun dev

## 🔑 Environment Variables

Create a .env file in the root directory and add:

VITE_API_URL=http://localhost:5000/api

## 📦 Build Project

npm run build

## 🧪 Run Preview

npm run preview

## 📸 Main Modules

- Dashboard
- Book Management
- Inventory Management
- Customer Management
- Order Management
- Reports & Analytics
- User Authentication

## 🎯 Future Enhancements

- Barcode Scanner Integration
- Advanced Reporting
- Multi-language Support
- Dark Mode
- Real-time Notifications
- Cloud Storage Integration

## 🤝 Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed using React, Redux Toolkit, Tailwind CSS, and shadcn/ui to create a scalable and modern bookstore management system.

# jarir-bookstore-management-frontend
