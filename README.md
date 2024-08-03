# Stock and Crypto Real-Time Tracker

This project consists of two separate services: a backend service for collecting and storing real-time stock and cryptocurrency data, and a frontend service for displaying the data to users in real-time.

## Table of Contents
- [Backend Service](#backend-service)
  - [Setup](#setup)
  - [Running the Server](#running-the-server)
  - [Endpoints](#endpoints)
- [Frontend Service](#frontend-service)
  - [Setup](#setup-1)
  - [Running the Client](#running-the-client)
  - [Features](#features)
- [Technologies Used](#technologies-used)

## Backend Service

The backend service is responsible for:
- Polling real-time data for 5 stocks or cryptocurrencies every few seconds from Yahoo Finance.
- Storing the collected data in a MongoDB database.
- Providing an API to fetch the most recent 20 data entries for a particular stock or crypto.

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/tarak-no1/sc-tracker.git
    cd sc-tracker/backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. create `config/default.ini` file in the root directory and update your MongoDB URI:
    ```env
    MONGO_URI=your_mongodb_uri
    ```

### Running the Server

1. Start the server:
    ```bash
    npm run dev
    ```

2. The server will start on port `app_port` given in `config/default.ini` and by default it runs on 5000.

### Endpoints

- **GET /api/prices/:symbol**: Fetches the most recent 20 data entries for the specified stock or crypto symbol.

## Frontend Service

The frontend service is responsible for:
- Fetching the most recent 20 real-time data entries from the backend service.
- Displaying the data in a dynamic table that updates in real-time.
- Providing a UI to change the stock or cryptocurrency being displayed.

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/tarak-no1/sc-tracker.git
    cd sc-tracker/frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Client

1. Start the client:
    ```bash
    npm run dev
    ```

2. The client will start on port 3000 by default.

### Features

- **Real-Time Data Table**: Displays the most recent 20 data entries for a selected stock or crypto and updates in real-time.
- **Change Stock/Crypto**: A button that opens a modal allowing the user to select a different stock or cryptocurrency to display.

## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Axios
  - TypeScript

- **Frontend**:
  - Next.js
  - React
  - Redux
  - TypeScript
  - Axios
  - React-Modal

## Acknowledgements

- Yahoo Finance API for providing real-time stock and crypto data.
