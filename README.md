# MovieMart

MovieMart is a movie streaming platform where users can watch their favorite movies. It provides a seamless experience with various features like movie wishlists, premium subscriptions, secure payments, and multilingual support.

## Features

### Home Page
- A landing page that introduces the web application, its purpose, goals, and functionality.

### Products
- Browse available movies for streaming.
- Search and filter movies (by genre, rating, etc.).
- View movie details, including photos and descriptions.
- Add movies to a wishlist (for premium users).

### Wishlist (for Premium Users)
- Users can add movies they want to watch later.
- Ability to update or remove movies from the wishlist.

### Cart
- Add premium subscription plans to the cart.
- View and manage selected subscription plans.
- Proceed to checkout and complete payments via Stripe.

### Orders
- View a list of previous orders.
- See detailed order information.

### Premium Subscription
- Monthly and yearly subscription plans.
- Premium users can access exclusive content and create wishlists.
- Payments processed via Stripe.

### Blog
- Read articles related to movies and streaming trends.
- Search for articles.

### Contact
- Static contact information.
- A contact form to send messages (with validation and error messages).
- Messages are sent to an email.

### Login & Profile
- User authentication and registration.
- Social login (GitHub and Google authentication).
- Password recovery.
- Profile management (edit profile information).

### Interface & Localization
- Multilingual support (Georgian & English).
- Dark and light mode options.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend & Database:** Supabase
- **Payments:** Stripe
- **Testing:** Cypress

## Additional Requirements
- The website is fully responsive.
- All forms include validation and error messages.
- Pre-commit and pre-push hooks are implemented.

## Running the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/guranda26/moviemart-app.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Fill in the necessary API keys for Supabase and Stripe.
4. Start the development server:
   ```sh
   npm run dev
   ```

## Testing
Run Cypress tests:
```sh
npm run test:e2e
```