# Pet Shop Frontend

Responsive e-commerce frontend for a pet shop built with React, Redux Toolkit, React Router, Ant Design, and CSS Modules.

## Related Repository

Backend repository: [pet-shop-backend](https://github.com/rusrus0110-star/pet-shop-backend)

## Overview

This project is a frontend web application for an online pet shop. It includes product browsing, category navigation, discounted products, product details, cart management, order placement, custom 404 handling, and cart persistence with localStorage.

The interface combines custom responsive styling with selected Ant Design components for forms and actions.

## Tech Stack

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- Ant Design
- React Hook Form
- CSS Modules

## Main Features

### Navigation and Pages

- Home page
- Categories page
- Category products page
- All products page
- Sale page
- Product details page
- Shopping cart page
- Custom 404 page

### Product Catalog

- Browse products by category
- Open product details
- View discounted products
- Show current price, old price, and discount badge

### Filters and Sorting

- Filter by price range
- Filter discounted items
- Sort products by:
  - default
  - price: low to high
  - price: high to low

### Product Details

- Product image
- Price block with discount support
- Quantity selector
- Add to cart
- Added state after product is in cart
- “Go to cart” and “Continue shopping” actions
- Expandable description with “Read more”

### Cart

- Add products from cards
- Add selected quantity from product page
- Increase and decrease quantity in cart
- Remove items from cart
- Sticky order summary
- Cart total calculation
- Cart counter in the header
- Cart state persistence in localStorage

### Order Form

- Form inputs built with Ant Design
- Validation for required fields
- Order button with controlled submit flow
- Success modal / overlay after successful order placement

### Error Handling

- Custom 404 page for invalid routes
- Invalid product or category IDs can be redirected to the Not Found page
- Empty filtered results show an inline empty-state message instead of 404

## Ant Design Usage

Ant Design is used in the project for selected UI parts instead of the whole interface.

Currently it is used for:

- order form inputs
- order action button

The rest of the UI is styled with custom CSS Modules to match the provided design layout more precisely.

## Project Structure

```text
src/
├── app/
│   ├── providers/
│   └── styles/
├── assets/
├── entities/
│   ├── category/
│   └── product/
├── features/
│   ├── cart/
│   ├── filters/
│   ├── order/
│   └── sale-request/
├── pages/
│   ├── AllProductsPage/
│   ├── CartPage/
│   ├── CategoriesPage/
│   ├── CategoryProductsPage/
│   ├── HomePage/
│   ├── NotFoundPage/
│   ├── ProductPage/
│   └── SalePage/
├── shared/
│   ├── api/
│   ├── config/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   └── ui/
├── widgets/
│   ├── Breadcrumbs/
│   ├── CategoriesPreview/
│   ├── ContactSection/
│   ├── DiscountBanner/
│   ├── Footer/
│   ├── Header/
│   ├── ProductFilters/
│   ├── ProductsGrid/
│   └── SalePreview/
└── main.jsx

```

Example User Flow

Add Product to Cart
Open a product page
Select quantity
Click Add to cart
Product is added to Redux cart
Header counter updates
Cart is saved in localStorage
Place an Order
Open the cart page
Review products and total
Fill in:
Name
Phone number
Email
Click Order
Success confirmation appears
Cart is cleared after successful completion
State Management

Redux Toolkit is used for:

cart state
filters state
order-related state
sale request state

The cart is persisted in localStorage, so cart items remain after page reload until the order is completed or the cart is cleared.

Notes
The project uses custom responsive layout and styling with CSS Modules.
Ant Design is integrated selectively, not as the main layout framework.
Invalid routes are handled with a custom Not Found page.
Empty filter results are handled as a normal UI state.
Future Improvements
backend order submission
server-side cart sync
authentication
wishlist
improved mobile filter UI
toast notifications
full checkout flow
