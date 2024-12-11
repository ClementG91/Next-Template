# Next.js 15 Authentication Template

This project is a Next.js application template with robust authentication, using Next Auth, Shadcn UI, Aceternity UI, Prisma, and PostgreSQL.

## Features

- **Secure Authentication**: Next Auth integration with support for multiple providers (Discord, Google, and Credentials).
- **Elegant User Interface**: Shadcn UI components for accessible and aesthetic UI.
- **Attractive UI Effects**: Aceternity UI integration for enhanced visual effects.
- **Database Management**: Prisma ORM for type-safe database access with PostgreSQL.
- **Email Verification**: Custom email verification system for enhanced security.
- **Role-based Access Control**: User roles (USER, ADMIN, MODERATOR) for granular permissions.
- **Form Handling**: React Hook Form for efficient form management.
- **Data Validation**: Zod for robust schema validation.
- **Theming**: Next-themes for easy theme switching and dark mode support.
- **Dashboard**: User-specific dashboard with profile information and statistics.
- **Responsive Design**: Fully responsive layout using Tailwind CSS.
- **API Routes**: Secure API routes for protected content and user management.

## Key Libraries

- Next.js 15
- React 19
- Next Auth
- Prisma
- Zod
- React Hook Form
- Tailwind CSS
- Next-themes
- Lucide React / React Icons (for icons)
- Nodemailer (for email sending)
- bcrypt (for password hashing)
- Framer Motion (for animations)
- Recharts (for dashboard charts)

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- PostgreSQL database (e.g., Neon)

### Google OAuth

1. **Create a Google Project:**
   To set up Google authentication, you need to create a Google project on the [Google Cloud Console](https://console.cloud.google.com/).

   Once your project is created, follow these steps:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Select your project or create a new one.
   - In the navigation menu, choose "APIs & Services" > "Credentials."
   - Click "Create Credentials" and select "OAuth client ID."
   - Configure your client ID by providing the required information. Make sure to add the appropriate redirect URL (likely `http://localhost:3000/api/auth/callback/google` and `http://localhost:3000/dashboard` during development).
   - Once your client ID is created, copy the values for `GOOGLE_CLIENT_SECRET` and `GOOGLE_CLIENT_ID` into your `.env` file.

2. **Google API Permissions:**
   You may also need to configure permissions for accessing the Google API.
   To do this, navigate to the "Credentials" section of your Google Cloud project and set the necessary permissions.

### GitHub OAuth

1. **Create a GitHub OAuth Application:**
   To configure GitHub authentication, you'll need to create a GitHub OAuth application.

   Here's how to do it:

   - Go to [GitHub Developer Settings](https://github.com/settings/developers).
   - Under "OAuth Apps," click "New OAuth App."
   - Configure your application by providing the required information, including the authorization callback URL (likely `http://localhost:3000/api/auth/callback/github` and `http://localhost:3000/dashboard` during development).
   - Once your application is created, copy the values for `GITHUB_ID` and `GITHUB_SECRET` into your `.env` file.

2. **Set Application Permissions:**
   In the settings for your GitHub OAuth application, you can define the necessary access permissions for your application. Make sure to configure these permissions based on your application's requirements.

After following these steps for Google and GitHub, you should have successfully configured OAuth authentication for your Next.js application. Don't forget to refer to Google's and GitHub's specific documentation guides for additional details if needed.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/ClementG91/Next-Template.git
   cd Next-Template
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Copy the `.env.example` file to `.env` and fill in the necessary variables.

4. Set up the database:

   a. Push the Prisma schema to your database:

   ```
   npx prisma db push
   ```

   b. Generate Prisma client:

   ```
   npx prisma generate
   ```

5. Build the application:
   ```
   npm run build
   ```

## Getting Started

To start the development server:

```
npm run dev
```

For deploying on Vercel, use the following command to install dependencies with legacy peer dependencies:

```
npm install --legacy-peer-deps
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/`: Contains application routes and page components (Next.js 13+ App Router).
- `actions/`: Contains server actions that handle business logic and data fetching, replacing traditional API routes for improved security and performance.
- `components/`: Reusable React components, including UI components and layout elements.
- `lib/`: Utility functions and configurations (e.g., nodemailer setup).
- `prisma/`: Prisma schema and migrations.
- `public/`: Publicly accessible static files.
- `types/`: TypeScript type definitions.

## Deployment

This project is designed to be easily deployed on platforms like Vercel. Make sure to set up your environment variables in your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
