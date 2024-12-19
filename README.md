# E-commerce App

## Description

This project is a modern e-commerce application built using **Next.js** with **App Router**, **Redux Toolkit** for state management, and **Ant Design** combined with **Tailwind CSS** for the UI. The application provides functionalities such as adding products, viewing product lists, managing a shopping cart, and more.

## Features

- **Authentication**: Login with role-based tabs (Admin and Customer).
- **Product Management**:
  - Add new products with fields such as name, category, price, description, and images.
  - View products by category.
  - Responsive product cards with read-more functionality.
- **Cart Management**:
  - Add/remove products to/from the cart.
  - View and update cart quantities.
  - Display total price dynamically.
- **API Integration**:
  - Fetch products and categories from external APIs.
  - Handle data via Redux slices with `createAsyncThunk` for API calls.
- **Responsive Design**:
  - Optimized for mobile, tablet, and desktop views.
  - Dynamic layouts using Tailwind's grid and flex utilities.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Framework**: [Ant Design](https://ant.design/) and [Tailwind CSS](https://tailwindcss.com/)
- **API**: Integration with REST APIs.
- **Icons**: [Ant Design Icons](https://ant.design/components/icon/)

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/joellebayeh/E-commerce-App.git
   cd E-commerce-App
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Development Server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

4. **Build for Production**:

   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
├── app
│   ├── add-product
│   │   ├── page.tsx
│   ├── components
│   │   ├── CategorySelect.tsx
│   │   ├── login.tsx
│   │   ├── loginForm.tsx
│   │   ├── LogoutButton.tsx
│   │   ├── navbar.tsx
│   │   └── productCard.tsx
│   ├── product-list
│   │   ├── cart
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── redux
│   │   ├── slices
│   │   │   ├── addProductSlice.ts
│   │   │   ├── authSlice.ts
│   │   │   ├── categorySlice.ts
│   │   │   ├── productListSlice.ts
│   │   │   └── userSlice.ts
│   │   └── store.ts
│   ├── screens
│   │   └── endpoints.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── global.css
├── package.json
└── README.md
```

## Key Files

- **`redux/store.ts`**: Configures the Redux store.
- **`redux/slices/`**: Contains Redux slices for handling state logic.
- **`app/screens/`**: Includes all API url.
- **`app/components/`**: Reusable components.

---

Enjoy building with this e-commerce app! If you have any questions, feel free to reach out.

