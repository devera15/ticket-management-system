# HelpDesk Ticket Management System (Laravel + Inertia React)

This is an exam-oriented **source bundle / starter implementation** based on the uploaded CCS112 Final Laboratory Exam brief. It contains Laravel backend files and React/Inertia frontend pages. It is not a pre-built `vendor/` install: install the dependencies and generate the Laravel app scaffold before running it.

## Hosting choice: Railway + Vercel?

The exam specifically requires Laravel 11+ with Inertia.js and React or Vue, plus a public deployment on Railway (or another platform approved by the instructor) with production MySQL. Since Inertia pages are rendered by Laravel, the simplest and most rubric-aligned option is to deploy the **whole Laravel + Inertia app on Railway**, with its MySQL database. Vercel is primarily suited to frontend/static or serverless deployments; hosting only the React pages separately on Vercel would not be the normal Inertia architecture and may fail the requirement that pages are rendered through `Inertia::render()`. Use Vercel + Railway only if your instructor explicitly approves that setup.

## Create the Laravel scaffold

Use PHP 8.2+, Composer, Node.js/npm, and a MySQL database.

```bash
composer create-project laravel/laravel helpdesk "^12.0"
cd helpdesk
composer require inertiajs/inertia-laravel
composer require laravel/breeze --dev
php artisan breeze:install react
npm install
```

Copy/merge the files from this bundle into the matching paths in the newly created `helpdesk` folder. If Breeze generated files with the same names, replace only the matching files and retain other scaffold files. Then run:

```bash
php artisan make:policy TicketPolicy --model=Ticket
php artisan make:request StoreTicketRequest
php artisan make:request UpdateTicketRequest
php artisan make:controller TicketController --resource --model=Ticket
```

Copy in the corresponding files from this bundle after generating those classes. Confirm `bootstrap/app.php` and the Breeze/Inertia setup from the scaffold are retained. This bundle includes the essential route, model, policy, request, controller, migration, middleware share, and ticket UI code; Laravel framework/vendor files are intentionally not bundled.

## Local setup

1. Create a MySQL database and configure `.env` locally.
2. Never commit `.env`; commit `.env.example` with placeholder values only.
3. Run `php artisan key:generate`
4. Run `php artisan migrate`
5. Run `npm run build`
6. Run `composer run dev` (or start Laravel and Vite separately).

## Deploy on Railway

1. Push the project to your own GitHub repository in regular commits.
2. Create a Railway project and deploy the Laravel repository.
3. Provision a **MySQL** service on Railway and add the database connection variables to the Laravel service (`DB_CONNECTION=mysql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).
4. Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://YOUR-APP-DOMAIN`.
5. Set a secure `APP_KEY` generated with `php artisan key:generate --show` (never commit it).
6. Configure build/deploy commands so dependencies are installed, assets are built (`npm run build`), and migrations run (`php artisan migrate --force`). Ensure the web process serves Laravel's `public/` directory. Follow Railway's current Laravel deployment instructions because exact build settings can vary.
7. Test the public HTTPS URL, registration/login/logout, ticket CRUD, ownership denial, and persistence after redeploy.
8. Create a demo account by registering on the live site or with a controlled seeder.

## Included features

- Registration/login/logout supplied by Laravel Breeze React starter kit
- Auth-protected ticket resource routes
- Ticket create/list/detail/edit/delete
- Pagination (10 per page)
- Form Request validation with allowed-value rules
- Policy ownership checks
- Owner set from `auth()->id()` (never from submitted form)
- Inertia `useForm`, inline validation errors, processing state
- Flash messages shared through Inertia middleware
- Responsive Tailwind classes, status/priority badges, empty state
- MySQL migration and `.env.example`

**Important:** You must run and test this project yourself and be ready to explain the code. The exam says work individually and that students must explain their code. Check with your instructor whether AI-generated starter code is permitted.
