# Naiyo24 Backend

This is the Flask backend for Naiyo24, connected to a PostgreSQL database using SQLAlchemy.

## Setup Instructions

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create a `.env` file in the backend directory:**
   ```env
   FLASK_ENV=development
   DATABASE_URL=postgresql://postgres:2004@localhost/naiyo24
   ```

4. **Run the Flask app:**
   ```bash
   flask run
   ```

## Database
- Make sure PostgreSQL is running and a database named `naiyo24` exists.
- You can use [pgAdmin](https://www.pgadmin.org/) to manage your database.

## Environment Variables
- All sensitive information (like database credentials) should be stored in the `.env` file. 