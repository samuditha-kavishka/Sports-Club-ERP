# Sports Club ERP Solution

This is a prototype Enterprise Resource Planning (ERP) application developed for a sports club management system. 
It demonstrates business process integration, modern web development, and cloud-ready architecture.

## Tech Stack
- **Frontend**: Next.js 14 (App Router, React)
- **Backend**: C# ASP.NET Core Web API
- **Database**: Entity Framework Core + SQLite
- **Styling**: Tailwind CSS & Lucide Icons
- **Language**: TypeScript (Frontend), C# (Backend)

## Modules Implemented
1. **Member Management**: CRUD operations for sports club members.
2. **Facility Booking**: Members can book courts, pools, etc., for a specific duration.
3. **Billing & Payments**: Tracks invoices.
4. **Inventory Management**: Tracks sports equipment stock levels.

### 🌟 Business Process Integration
When you navigate to the **Facility Booking** module and create a new booking, the system automatically calculates the cost (`durationHours * hourlyRate`) and inserts a "Pending" Invoice into the **Billing & Payments** module via a database transaction.

---

## Local Setup Instructions

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Run the Next.js Frontend**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

3. **Run the C# Backend**
   Open a new terminal, navigate to the API folder, and run:
   ```bash
   cd SportsClubERP.Api
   dotnet run
   ```
   The backend will be available at `http://localhost:5000` or `https://localhost:5001`.

## Database Migrations
Whenever you update your C# entity models in `SportsClubERP.Api/Models`, you must run EF Core migrations:
```bash
cd SportsClubERP.Api
dotnet ef migrations add <YourMigrationName>
dotnet ef database update
```
This generates a new SQL migration and updates your local database.

---

## Azure Deployment Instructions (App Service)

To deploy this application to **Microsoft Azure App Service**:
1. **Database Upgrade**: If moving to a cloud database, change the provider in `SportsClubERP.Api/Program.cs` to PostgreSQL/SQL Server and provide your Azure connection string.
2. **Environment Variables**: Add your connection string to Azure App Service **Application Settings**.
3. **Create Web Apps**: In the Azure Portal, create a Node.js Web App for the Next.js frontend and a .NET Web App for the C# API.
4. **Connect GitHub**: Go to the **Deployment Center** in both Web Apps and connect this repository.
5. **Configure Next.js**: Ensure the `NEXT_PUBLIC_API_URL` environment variable points to your deployed C# API URL in the frontend App Service.
