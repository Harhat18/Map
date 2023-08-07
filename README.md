
# React Map Application
vercel deploy = https://mapapp-ignyaosr7-harunhatib18-gmailcom.vercel.app/

![Ekran Resmi 2023-08-07 19 06 27](https://github.com/Harhat18/Map/assets/111196660/3847c308-21e5-489f-86ec-a9b11caa81d1)


This project is a simple React map application with added functionality for marking locations on the map using React and React-Leaflet libraries. It also includes server-side data management using Node.js Express and MongoDB.

## Prerequisites

- Node.js must be installed on your system.
- Yarn or npm must be installed on your system.

## Installation

1. Clone this repository to your computer or download it as a ZIP file.
2. Navigate to the project folder and run the following command to install the required dependencies:

```bash
yarn install
```

or

```bash
npm install
```

## Used Packages

This application utilizes the following packages:

- axios: ^1.4.0
- leaflet: ^1.9.4
- react: ^18.2.0
- react-dom: ^18.2.0
- react-leaflet: ^4.2.1
- express: ^4.18.2
- mongoose: ^7.4.2

## Starting the Application

**Starting the Server:**

```bash
node server.js
```

or

```bash
npm start
```

When the server starts, the connection to the MongoDB database will be established automatically.

**Starting the Client:**

```bash
yarn start
```

or

```bash
npm start
```

You can then view the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

Upon launching the application, you will see sample markers on the map. These markers are created by fetching data from the MongoDB database. Users can also add new markers or edit existing ones.


## Contributing

If you'd like to contribute to this project, please submit your suggestions, bug reports, or fixes via GitHub. Contributions are welcome!
