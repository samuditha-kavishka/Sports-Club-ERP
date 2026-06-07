# Sports Club ERP Solution

This is a prototype Enterprise Resource Planning (ERP) application developed for a sports club management system. 
It demonstrates business process integration, modern web development, and cloud-ready architecture.

## Tech Stack
- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: Prisma ORM + SQLite (for local zero-setup prototyping)
- **Styling**: Tailwind CSS & Lucide Icons
- **Language**: TypeScript

## Modules Implemented
1. **Member Management**: CRUD operations for sports club members.
2. **Facility Booking**: Members can book courts, pools, etc., for a specific duration.
3. **Billing & Payments**: Tracks invoices.
4. **Inventory Management**: Tracks sports equipment stock levels.

### 🌟 Business Process Integration
When you navigate to the **Facility Booking** module and create a new booking, the system automatically calculates the cost (`durationHours * hourlyRate`) and inserts a "Pending" Invoice into the **Billing & Payments** module via a database transaction.

---

## Local Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   Since we are using SQLite for the prototype, Prisma handles the setup for you. Run the following command to generate the Prisma Client and apply migrations to create your local `.db` file:
   ```bash
   npx prisma migrate dev
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Migrations
Whenever you update `prisma/schema.prisma` to add new fields or tables, you must run:
```bash
npx prisma migrate dev --name <your_migration_name>
```
This generates a new SQL migration file and updates your local database.

---

## Azure Deployment Instructions (App Service)

To deploy this Next.js app to **Microsoft Azure App Service**:
1. **Database Upgrade**: If moving to a cloud database, change the provider in `prisma/schema.prisma` from `"sqlite"` to `"postgresql"` and provide your Azure PostgreSQL connection string.
2. **Environment Variables**: Add your connection string to Azure App Service **Application Settings** under `DATABASE_URL`.
3. **Create Web App**: In the Azure Portal, create a new **Web App** using the Linux OS and Node.js runtime.
4. **Connect GitHub**: Go to the **Deployment Center** in your Azure Web App and connect this GitHub repository.
5. **Build Pipeline**: Configure GitHub Actions (Azure generates the workflow file for you). Ensure your build script runs `npm run build` and `npx prisma migrate deploy` or `npx prisma db push` before starting the application.
