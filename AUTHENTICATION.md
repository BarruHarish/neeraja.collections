# Neeraja Collections - Admin & Authentication System

## Overview
The site now has a complete authentication system with two separate login flows:
- **User Login** - Customers access the product catalog
- **Admin Login** - Admins manage products and inventory

## Architecture

### Authentication System

#### AuthContext (`src/context/AuthContext.tsx`)
Manages authentication state globally across the application.

**Features:**
- User authentication with email and password
- Role-based access control (user/admin)
- Persistent authentication using localStorage
- Logout functionality

**Demo Credentials:**
```
Admin Email: admin@neeraja.com
Admin Password: admin123
```

**User Login:**
- Any email with valid format (contains @) can login as a user
- No strict password validation for demo purposes

#### ProductContext (`src/context/ProductContext.tsx`)
Manages product inventory and CRUD operations.

**Features:**
- Add new products
- Update existing products
- Delete products
- Get products by category
- Persist data to localStorage
- Reset to default products

### Components

#### UserLogin (`src/pages/UserLogin.tsx`)
Customer login page with:
- Email and password input
- Form validation
- Error handling
- Link to admin login

#### AdminLogin (`src/pages/AdminLogin.tsx`)
Admin login page with:
- Demo credentials display
- Email and password input
- Form validation
- Link to customer login

#### AdminDashboard (`src/pages/AdminDashboard.tsx`)
Complete admin management interface with:
- **Dashboard Stats** - Shows total products and count by category
- **Product Management**:
  - Add new products
  - Edit existing products
  - Delete products
  - View all products in a table
- **Inventory Control** - Reset to default products
- **Logout** - Secure logout functionality

### Routing & Protected Routes

#### Route Structure
```
/login                 → UserLogin page
/admin-login           → AdminLogin page
/                      → Index (home page) - Protected, requires user login
/admin                 → AdminDashboard - Protected, requires admin login
*                      → NotFound page
```

#### Protected Route Components
- `ProtectedUserRoute` - Redirects to `/login` if not authenticated or if admin tries to access
- `ProtectedAdminRoute` - Redirects to `/admin-login` if not authenticated or if user tries to access

### Data Persistence

All data is stored in browser's localStorage:
- **Products** - Saved to `products` key in localStorage
- **Auth State** - Saved to `auth` key in localStorage

Data persists across browser sessions until cleared.

## User Flow

### Customer User Flow
1. User visits the site (redirected to `/login`)
2. User enters email and password on UserLogin page
3. User is authenticated and redirected to home page (`/`)
4. User can browse products by category
5. User can logout from navbar
6. After logout, user is redirected to login page

### Admin User Flow
1. Admin visits `/admin-login` or clicks "Admin Login" link
2. Admin enters admin credentials (demo: admin@neeraja.com / admin123)
3. Admin is authenticated and redirected to `/admin`
4. Admin sees dashboard with:
   - Total product count
   - Count by category
   - Product table with all items
5. Admin can:
   - Add new products
   - Edit existing products
   - Delete products
   - Reset to default products
6. Admin can logout from top-right button
7. After logout, admin is redirected to admin login page

## Product Management Features

### Add Product
- Modal dialog with form fields
- Fields: Name, Price, Category, Image URL
- Creates new product with unique ID
- Updates localStorage automatically

### Edit Product
- Click edit icon on product row
- Modal pre-fills current product data
- Can update any field
- Saves changes to localStorage

### Delete Product
- Click delete icon on product row
- Confirmation dialog appears
- Irreversible deletion

### Reset Products
- Button on admin dashboard
- Resets all products to default collection
- Requires confirmation
- Clears localStorage products cache

## Technical Stack

- **React** - UI framework
- **React Router** - Routing and protected routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **localStorage** - Data persistence

## Component Usage

### Using Authentication in Components
```tsx
import { useAuth } from '@/context/AuthContext';

const MyComponent = () => {
  const { currentUser, userRole, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) return <div>Not logged in</div>;
  
  return <div>Welcome {currentUser}!</div>;
};
```

### Using Products in Components
```tsx
import { useProducts } from '@/context/ProductContext';

const ProductList = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};
```

## File Structure

```
src/
├── context/
│   ├── AuthContext.tsx         # Authentication state & logic
│   └── ProductContext.tsx      # Product management state
├── pages/
│   ├── Index.tsx               # Home page (protected)
│   ├── UserLogin.tsx           # Customer login page
│   ├── AdminLogin.tsx          # Admin login page
│   ├── AdminDashboard.tsx      # Admin dashboard (protected)
│   └── NotFound.tsx            # 404 page
├── components/
│   ├── Navbar.tsx              # Updated with logout
│   ├── ProductSection.tsx      # Updated to use ProductContext
│   └── ...other components
└── data/
    └── products.ts             # Product type definitions
```

## Security Notes

⚠️ **Important for Production:**
1. **Current Implementation**: Uses hardcoded credentials for demo
2. **For Production**, implement:
   - Backend authentication API with JWT tokens
   - Secure password hashing
   - Role-based authorization on backend
   - HTTPS enforcement
   - Secure session management
   - OAuth/Social login options

3. **Data Security**:
   - Never store sensitive data in localStorage
   - Implement proper access control on backend
   - Validate all user inputs on backend
   - Use environment variables for sensitive config

## Future Enhancements

1. **User Features**:
   - Product search and filtering
   - Product details page
   - Shopping cart
   - Wishlist
   - Order placement
   - User profile

2. **Admin Features**:
   - Product import/export
   - Bulk actions
   - Advanced analytics
   - Order management
   - User management
   - Activity logs

3. **Backend Integration**:
   - Real authentication service
   - Database for products
   - API endpoints
   - Real-time updates
   - Payment processing

4. **Performance**:
   - Image optimization
   - Code splitting
   - Caching strategies
   - Database indexing

## Getting Started

### Installation
```bash
npm install
# or
bun install
```

### Development
```bash
npm run dev
# or
bun dev
```

### Building
```bash
npm run build
# or
bun build
```

## Testing the System

1. **Customer Login Test:**
   - Go to http://localhost:5173/login
   - Enter any email (e.g., customer@example.com)
   - Enter any password
   - Click "Sign In"
   - You should see the home page

2. **Admin Login Test:**
   - Go to http://localhost:5173/admin-login
   - Email: `admin@neeraja.com`
   - Password: `admin123`
   - Click "Admin Sign In"
   - You should see the admin dashboard

3. **Product Management Test:**
   - Login as admin
   - Try adding a product
   - Edit the product
   - Delete the product
   - Refresh page - changes should persist

4. **Protected Routes Test:**
   - Try accessing `/` without login - redirects to `/login`
   - Try accessing `/admin` as customer - redirects to `/admin-login`
   - Login as customer and try accessing `/admin` - redirects to login

---

**Created:** March 13, 2026
**Version:** 1.0.0
