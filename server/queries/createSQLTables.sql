CREATE TABLE IF NOT EXISTS employee_registration (
    employee_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    position VARCHAR(100),
    department VARCHAR(100),
    date_of_birth DATE,
    date_of_joining DATE NOT NULL DEFAULT CURRENT_DATE,
    salary NUMERIC(10, 2) CHECK (salary >= 0),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS jobs_post (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    employment_type VARCHAR(50) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    job_location VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    departments VARCHAR(255) NOT NULL,
    key_skills TEXT[] NOT NULL,
    opening INT NOT NULL,
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY,
    roles VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS countries (
    id SERIAL PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hr (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email_id VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(255) NOT NULL,
    categories VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS candidate (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  college_name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);