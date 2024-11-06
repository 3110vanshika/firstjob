const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const db = require("./database/db");
const fs = require('fs');
const path = require('path');
const employeeRoute = require('./routes/employeeRoutes');
const jobPostRoute = require('./routes/jobPostRoutes')
const rolesRoute = require('./routes/rolesRoute')
const hrRoute = require('./routes/hrRoutes')
const candidateRoute = require('./routes/candidateRoute')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/setup', async (req, res) => {
  let createTableQuery; // Define it outside try-catch

  try {
      createTableQuery = fs.readFileSync(path.join(__dirname, 'queries', 'createSQLTables.sql'), 'utf8');
      const result = await db.query(createTableQuery);
      res.send(`Tables created successfully!`);
  } catch (error) {
      console.error('SQL Query:', createTableQuery); // Now it's accessible here
      console.error('Error:', error?.message);
      res.status(400).json({ message: error?.message });
  }
});

// Routes
app.use('/api/employee', employeeRoute);
app.use('/api/job', jobPostRoute)
app.use('/api/roles', rolesRoute)
app.use('/api/hr', hrRoute)
app.use('/api/candidate', candidateRoute)


// Listen port
const port = process.env.PORT;
db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to Database and Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error?.message);
  });
