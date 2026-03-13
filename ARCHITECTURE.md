# System Architecture & User Flow Diagram

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Router (BrowserRouter)                 │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Routes:                                             │   │
│  │  • /login → UserLogin (Public)                      │   │
│  │  • /admin-login → AdminLogin (Public)               │   │
│  │  • / → Index (Protected - User)                     │   │
│  │  • /admin → AdminDashboard (Protected - Admin)      │   │
│  │  • * → NotFound                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              AuthProvider (Context)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Manages:                                             │   │
│  │  • currentUser (email)                               │   │
│  │  • userRole (user | admin | null)                    │   │
│  │  • isAuthenticated (boolean)                         │   │
│  │  • login() function                                  │   │
│  │  • logout() function                                 │   │
│  │  • localStorage persistence                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           ProductProvider (Context)                  │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │ Manages:                                             │   │
│  │  • products (array)                                  │   │
│  │  • addProduct()                                      │   │
│  │  • updateProduct()                                   │   │
│  │  • deleteProduct()                                   │   │
│  │  • localStorage persistence                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            UI Components & Pages                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  • Navbar (with logout)                              │   │
│  │  • ProductSection (uses ProductContext)              │   │
│  │  • AdminDashboard (full CRUD)                        │   │
│  │  • Login Pages                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
         ┌─────────────────────────────────┐
         │   Browser localStorage          │
         ├─────────────────────────────────┤
         │ Key: "auth"                     │
         │ Value: {user, role}             │
         ├─────────────────────────────────┤
         │ Key: "products"                 │
         │ Value: [product array]          │
         └─────────────────────────────────┘
```

## Customer User Journey

```
┌──────────────────────────────────────────────────────────────────┐
│                    CUSTOMER USER JOURNEY                          │
└──────────────────────────────────────────────────────────────────┘

START
  │
  ├─→ Visit http://localhost:5173
  │   ↓
  ├─→ Redirected to /login (no auth)
  │   ↓
  ├─→ UserLogin Page
  │   • Enter email (any format with @)
  │   • Enter password (any value)
  │   • Click "Sign In"
  │   ↓
  ├─→ AuthContext validates & saves to localStorage
  │   ↓
  ├─→ Redirected to / (Home Page)
  │   ├─→ Navbar shows user email
  │   ├─→ Navbar shows "Logout" button
  │   ├─→ Hero Section visible
  │   ├─→ Product Section (from ProductContext)
  │   ├─→ About Section
  │   ├─→ Contact Section
  │   └─→ Footer
  │   ↓
  ├─→ Browse Products
  │   • Filter by category
  │   • View product details
  │   • Click WhatsApp links
  │   ↓
  ├─→ Can Logout
  │   • Click "Logout" in navbar
  │   • Redirected to /login
  │   • localStorage cleared
  │   ↓
END

Note: If user tries to access /admin → Auto-redirected to /login
```

## Admin User Journey

```
┌──────────────────────────────────────────────────────────────────┐
│                     ADMIN USER JOURNEY                            │
└──────────────────────────────────────────────────────────────────┘

START
  │
  ├─→ Visit http://localhost:5173/admin-login
  │   ↓
  ├─→ AdminLogin Page
  │   • Enter email: admin@neeraja.com
  │   • Enter password: admin123
  │   • Click "Admin Sign In"
  │   ↓
  ├─→ AuthContext validates & saves to localStorage
  │   ↓
  ├─→ Redirected to /admin (AdminDashboard)
  │   ├─→ Header with "Logout" button
  │   │   ↓
  │   ├─→ Statistics Panel
  │   │   • Total products count
  │   │   • Count by category (5 cards)
  │   │   ↓
  │   ├─→ Control Buttons
  │   │   • "Add Product" (Opens dialog)
  │   │   • "Reset to Default" (Opens confirmation)
  │   │   ↓
  │   └─→ Products Table
  │       • List all products
  │       • Each row has:
  │         - Product name
  │         - Category badge
  │         - Price
  │         - Image thumbnail
  │         - Edit button (✏️)
  │         - Delete button (🗑️)
  │
  ├─→ Add New Product
  │   • Click "Add Product"
  │   • Dialog opens with form
  │   • Fill: Name, Price, Category, Image URL
  │   • Click "Add Product"
  │   • Product added to table
  │   • Saved to localStorage
  │   ↓
  ├─→ Edit Product
  │   • Click edit icon (✏️) on product
  │   • Dialog opens with pre-filled form
  │   • Modify any field
  │   • Click "Update Product"
  │   • Changes reflected in table
  │   • Saved to localStorage
  │   ↓
  ├─→ Delete Product
  │   • Click delete icon (🗑️) on product
  │   • Confirmation dialog appears
  │   • Click "Delete" to confirm
  │   • Product removed from table
  │   • Removed from localStorage
  │   ↓
  ├─→ Reset Products
  │   • Click "Reset to Default"
  │   • Confirmation dialog
  │   • Click "Reset"
  │   • All products reset to defaults
  │   • localStorage cleared
  │   ↓
  ├─→ Can Logout
  │   • Click "Logout" in header
  │   • Redirected to /admin-login
  │   • localStorage cleared
  │   ↓
END

Note: If admin tries to access / → Auto-redirected to /admin-login
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                             │
└──────────────────────────────────────────────────────────────────┘

CUSTOMER LOGIN
──────────────────────────────────────────────────────

1. User enters email & password
   ↓
2. AuthContext.login('email@example.com', 'password', 'user')
   ↓
3. Validation:
   • Check email not empty
   • Check password not empty
   • Check email format (contains @)
   ↓
4. SUCCESS:
   • setCurrentUser('email@example.com')
   • setUserRole('user')
   • localStorage.setItem('auth', {user: 'email@example.com', role: 'user'})
   • Return true
   ↓
5. App redirects to /
   ↓
6. ProtectedUserRoute checks:
   • isAuthenticated === true? ✓
   • userRole === 'user'? ✓
   • Allow access to /


ADMIN LOGIN
──────────────────────────────────────────────────────

1. Admin enters email & password
   ↓
2. AuthContext.login('admin@neeraja.com', 'admin123', 'admin')
   ↓
3. Validation:
   • Check email not empty
   • Check password not empty
   • email === 'admin@neeraja.com'? ✓
   • password === 'admin123'? ✓
   ↓
4. SUCCESS:
   • setCurrentUser('admin@neeraja.com')
   • setUserRole('admin')
   • localStorage.setItem('auth', {user: 'admin@neeraja.com', role: 'admin'})
   • Return true
   ↓
5. App redirects to /admin
   ↓
6. ProtectedAdminRoute checks:
   • isAuthenticated === true? ✓
   • userRole === 'admin'? ✓
   • Allow access to /admin


LOGOUT
──────────────────────────────────────────────────────

1. User clicks "Logout" button
   ↓
2. AuthContext.logout()
   ↓
3. Actions:
   • setCurrentUser(null)
   • setUserRole(null)
   • localStorage.removeItem('auth')
   ↓
4. Navigate to /login (customer) or /admin-login (admin)
   ↓
5. isAuthenticated === false
   ↓
6. All protected routes redirect to login
```

## Protected Route Logic

```
┌──────────────────────────────────────────────────────────────────┐
│              PROTECTED ROUTE DECISION FLOW                        │
└──────────────────────────────────────────────────────────────────┘

ACCESSING CUSTOMER PAGE (/)
────────────────────────────────────

User tries to access: /
   ↓
ProtectedUserRoute checks:
   ├─ isAuthenticated === true?
   │  ├─ YES → Check role
   │  │  ├─ userRole === 'admin'?
   │  │  │  ├─ YES → Redirect to /admin-login
   │  │  │  └─ NO → Allow access ✓
   │  └─ NO → Redirect to /login
   └─


ACCESSING ADMIN PAGE (/admin)
────────────────────────────────────

Admin tries to access: /admin
   ↓
ProtectedAdminRoute checks:
   ├─ isAuthenticated === true?
   │  ├─ YES → Check role
   │  │  ├─ userRole === 'admin'?
   │  │  │  ├─ YES → Allow access ✓
   │  │  │  └─ NO (user role) → Redirect to /admin-login
   │  └─ NO → Redirect to /admin-login
   └─
```

## Data Flow - Adding a Product

```
┌──────────────────────────────────────────────────────────────────┐
│             PRODUCT ADDITION DATA FLOW                            │
└──────────────────────────────────────────────────────────────────┘

Admin opens "Add Product" dialog
   ↓
Fills form:
   • Name: "Silk Saree"
   • Price: "5000"
   • Category: "Sarees"
   • Image: "https://..."
   ↓
Clicks "Add Product" button
   ↓
handleAddProduct() validates:
   ├─ All fields filled? ✓
   └─
   ↓
Creates new Product object:
   {
     id: "1234567890",
     name: "Silk Saree",
     price: 5000,
     category: "Sarees",
     image: "https://..."
   }
   ↓
Calls: ProductContext.addProduct(newProduct)
   ↓
ProductContext:
   1. setProducts([...products, newProduct])
   2. useEffect triggered (dependency: products)
   3. localStorage.setItem('products', JSON.stringify(updated))
   ↓
Rerender:
   • AdminDashboard stats update
   • Products table updates
   • New product visible
   ↓
Dialog closes
   ↓
Form reset to empty
```

## localStorage Structure

```
┌──────────────────────────────────────────────────────────────────┐
│                   LOCALSTORAGE STRUCTURE                          │
└──────────────────────────────────────────────────────────────────┘

KEY: "auth"
─────────────────────────────
Value: JSON string
{
  "user": "admin@neeraja.com",
  "role": "admin"
}

Loaded on:
  • App start
  • AuthProvider initialization
  
Updated on:
  • User login
  • User logout


KEY: "products"
─────────────────────────────
Value: JSON string
[
  {
    "id": "s1",
    "name": "Kanchipuram Silk Saree",
    "price": 4500,
    "category": "Sarees",
    "image": "https://..."
  },
  {
    "id": "s2",
    "name": "Banarasi Silk Saree",
    "price": 3800,
    "category": "Sarees",
    "image": "https://..."
  },
  ...
]

Loaded on:
  • App start
  • ProductProvider initialization

Updated on:
  • Add product
  • Edit product
  • Delete product
  • Reset to defaults
```

## Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                    <App />                             │
├────────────────────────────────────────────────────────┤
│ Providers:                                             │
│  ├─ QueryClientProvider                               │
│  ├─ AuthProvider ─── AuthContext                      │
│  ├─ ProductProvider ─ ProductContext                  │
│  ├─ TooltipProvider                                   │
│  └─ BrowserRouter                                     │
│                                                        │
│  ├─ <Routes>                                           │
│  │  ├─ <Route path="/login" element={<UserLogin />} /> │
│  │  ├─ <Route path="/admin-login" ... />              │
│  │  ├─ <Route path="/" ... /> (Protected)             │
│  │  │   └─ <Index>                                    │
│  │  │       ├─ <Navbar />                             │
│  │  │       ├─ <HeroSection />                        │
│  │  │       ├─ <ProductSection /> ← uses ProductContext
│  │  │       ├─ <AboutSection />                       │
│  │  │       ├─ <ContactSection />                     │
│  │  │       └─ <Footer />                             │
│  │  ├─ <Route path="/admin" ... /> (Protected)        │
│  │  │   └─ <AdminDashboard /> ← uses Auth + Product Context
│  │  └─ <Route path="*" element={<NotFound />} />      │
│  └─ </Routes>                                          │
└────────────────────────────────────────────────────────┘
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Type-safe authentication
- ✅ Secure protected routes
- ✅ Persistent data storage
- ✅ Scalable context-based state management
