# Next.js Authentication Template

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

- Next.js 14
- React 18
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
