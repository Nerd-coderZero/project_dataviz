# Data Visualization Dashboard

This project is a data visualization dashboard created using Flask for the backend and React (via npm) for the frontend. It connects to a PostgreSQL database and visualizes data from the provided JSON dataset.

## Project Overview

The dashboard features multiple interactive visualizations, including charts for intensity, likelihood, relevance, year, country, topics, region, and city. It also includes filters such as year, sector, region, and more, allowing users to explore insights based on various dimensions of the data. The dataset comprises various insights intended for analysis in the specified fields.

## Table of Contents

-   [Project Structure](#project-structure)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Dependencies](#dependencies)
-   [Credits](#credits)

## Project Structure

The project is divided into two main parts:

-   **Backend (Flask):**
    -   `app.py`: Main Flask application file, handles API endpoints and data fetching.
    -   `load_data.py`: Script to load data from `jsondata.json` into the database.
    -   `requirements.txt`: List of Python libraries needed for the backend.
-   **Frontend (React):**
    -   `dashboard` folder: Contains React components.
        -   `App.js`: Main entry point for the React app.
        -   `Dashboard.js`: Main dashboard component for rendering charts and filters.
        -   `FilterForm.js`: Component for rendering the filter form.
        -   `CustomBarChart.js`, `CustomLineChart.js`, etc.: Components for rendering charts in components sub-folder inside src folder.
        -   `App.css`: Stylesheet for the dashboard.
    -   `package.json`: List of JavaScript packages needed for the frontend.

## Installation(After downloading repository from github and Placing in a Project Directory)

1.  **Set up virtual environment (recommended):**
    ```bash
    python -m venv venv  # Create a virtual environment
    source venv/bin/activate  # Activate the virtual environment (Linux/macOS)
    venv\Scripts\activate      # Activate the virtual environment (Windows)
    ```
2.  **Install backend dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd dashboard  # Navigate to the frontend directory
    npm install
    ```
## Usage

1.  **Prepare the database:**
    -   Ensure you have a PostgreSQL database set up and running. Create a new database using the following SQL command:
    
    ```sql 
    CREATE DATABASE dashboard_db;
    ```
    
    -   Update the database URI in app.py to match your database configuration.
    
    -   Run the `load_data.py` script to populate the database with the data from `jsondata.json`:
    
    ```bash
    python load_data.py
    ```

2.  **Start the Flask backend server:**
    
    ```bash
    python app.py
    ```

3.  **Start the React development server (if not in production):**(Remember to use different terminal for this one as they need to be in different directories)
    
    ```bash
    npm start
    ```

4.  **Access the dashboard:**
    -   Open your browser and navigate to `http://localhost:3000` (or the appropriate port).
    -   Use the filters to explore and analyze the data. (Via changing dashboard.js you may change which variable plot against which variable too)

## Dependencies

-   **Backend:**
    -   Flask
    -   Flask-SQLAlchemy
    -   Flask-CORS
    -   psycopg2-binary  (or the appropriate PostgreSQL driver)

-   **Frontend:**
    -   React
    -   Recharts (or your chosen charting library)
    -   Other dependencies listed in `package.json`

## Credits

-   This project was created by [Kushagra Jaiswal] as a test assignment.
-   The data was provided as part of the assignment.
-   Any third-party libraries used are credited within the code and `package.json`.
