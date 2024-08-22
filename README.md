# WeLoveBooks - Book Club Application

WeLoveBooks is a full-stack web application designed to facilitate book clubs by providing features like user authentication, book search, meeting scheduling, and book reviews. The application is built with Django on the backend and React with Vite on the frontend.

## Features

- **User Authentication:** Secure sign-up, log-in, and log-out.
- **Book Search:** Search for books using the Google Books API and add them to a reading list.
- **Meeting Scheduler:** Schedule and manage monthly book club meetings, with integration into Google Calendar. Future Feature
- **Book Reviews:** Users can review and rate books they have read. Future Feature
- **Feedback Form:** Collect user feedback using EmailJS. In Work

## Tech Stack

- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, Vite, Bootstrap
- **Authentication:**  Django TokenAuthentication
- **APIs:** Google Books API, EmailJS
- **Other Tools:** Thunder Client for API testing in VSCode

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- PostgreSQL

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/welovebooks.git
    cd welovebooks
    ```

2. **Backend Setup:**

    - Create and activate a virtual environment:
    
      ```bash
      python -m venv env
      source env/bin/activate  # On Windows: env\Scripts\activate
      ```
    
    - Install backend dependencies:
    
      ```bash
      pip install -r requirements.txt
      ```
    
    - Set up the PostgreSQL database:
    
      ```bash
      psql -U postgres
      CREATE DATABASE welovebooks;
      ```

    - Apply migrations:
    
      ```bash
      python manage.py migrate
      ```
    
    - Create a superuser for the Django admin:
    
      ```bash
      python manage.py createsuperuser
      ```

    - Run the development server:
    
      ```bash
      python manage.py runserver
      ```

3. **Frontend Setup:**

    - Navigate to the frontend directory:
    
      ```bash
      cd welovebooks_frontend
      ```
    
    - Install frontend dependencies:
    
      ```bash
      npm install
      ```
    
    - Start the frontend development server:
    
      ```bash
      npm run dev
      ```

4. **Environment Variables:**

    - Create a `.env` file in both the root and frontend directories to store your environment variables:

      **Backend (`.env`):**
      ```plaintext
      SECRET_KEY=your_django_secret_key
      DEBUG=True
      DATABASE_URL=your_database_url
      ```

      **Frontend (`.env`):**
      ```plaintext
      VITE_EMAILJS_SERVICE_ID=your_service_id_here
      VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
      VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
      ```

5. **Thunder Client:**
   - Use Thunder Client in VSCode to test API endpoints. Make sure your Django server is running and that you’ve configured Thunder Client with your API routes.



# welovebooks
