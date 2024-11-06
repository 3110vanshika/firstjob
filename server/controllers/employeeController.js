const db = require("../database/db");
const multer = require("multer");
const path = require("path");
const employeeTable = require("../constant/employee");

// Set up Multer storage and file checking
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // Use path.join for cross-platform compatibility
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using timestamp
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/; // Allow jpeg, jpg, png
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File is valid
  } else {
    cb(new Error("Error: Images Only!")); // File type is not allowed
  }
}

// Init Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image_url"); // Expecting 'image_url' as the form key

// Register employee function
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      position,
      department,
      date_of_birth,
      salary,
      status,
    } = req.body;

    // Validation checks
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !position ||
      !department ||
      !date_of_birth ||
      !salary ||
      !status
    ) {
      throw new Error("All fields are required");
    }

    // Check if the file is uploaded
    const image_url = req.file ? `uploads/${req.file.filename}` : null;

    // Check if email is already registered
    const emailCheckQuery = `SELECT * FROM "employee_registration" WHERE email = $1`;
    const emailCheckOutput = await db.query(emailCheckQuery, [email]);
    
    if (emailCheckOutput.rows.length > 0) {
      return res.status(400).json({ code: 400, message: "You are already registered." });
    }

    // Insert employee data into the database
    const employeeRegisterQuery = `
      INSERT INTO employee_registration (
        first_name, last_name, email, phone_number,
        position, department, date_of_birth, salary, status, image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`;

    const result = await db.query(employeeRegisterQuery, [
      first_name,
      last_name,
      email,
      phone_number,
      position,
      department,
      date_of_birth,
      salary,
      status,
      image_url,
    ]);

    // If insert was successful, return the result
    const employeeRegistration = result?.rows?.[0];
    res.status(200).json({ code: 200, data: employeeRegistration, message:"Employee is registered successfully" });
  } catch (error) {
    // Catch any errors and send a 400 status response with error message
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const query = `SELECT * FROM "employee_registration"`;
    const result = await db.query(query);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// Fetch single employee
const fetchSingleEmployee = async (req, res) => {
  try {
    const { employee_id } = req?.params;
    const singleEmployeeQuery = `SELECT * FROM "employee_registration" WHERE employee_id = $1`;
    const singleEmployeeOutput = await db.query(singleEmployeeQuery, [
      employee_id,
    ]);
    const singleEmployee = singleEmployeeOutput?.rows?.[0];
    res.status(200).json({ code: 200, data: singleEmployee });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// update employee
const updateEmployee = async (req, res) => {
  const employee_id = req?.params.employee_id
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      position,
      department,
      date_of_birth,
      salary,
      status,
    } = req?.body;
    console.log(first_name)
    if (!first_name) throw Error("FirstName is required");
    if (!last_name) throw Error("LastName is required");
    if (!email) throw Error("Email is required");
    if (!phone_number) throw Error("Phone number is required");
    if (!position) throw Error("Position is required");
    if (!department) throw Error("Department is required");
    if (!date_of_birth) throw Error("Date of birth is required");
    if (!salary) throw Error("Salary is required");
    if (!status) throw Error("Status is required");

    const updateEmployeeQuery = `UPDATE "employee_registration" SET ${employeeTable.FNAME}=$1, ${employeeTable.LNAME}=$2, ${employeeTable.EMAIL}=$3, ${employeeTable.PHONENUMBER}=$4, ${employeeTable.POSITION}=$5, ${employeeTable.DEPARTMENT}=$6, ${employeeTable.DOB}=$7, ${employeeTable.SALARY}=$8, ${employeeTable.STATUS}=$9 WHERE employee_id= $10 RETURNING *`;

    const updateEmployeeOutput = await db.query(updateEmployeeQuery, [first_name, last_name, email, phone_number, position, department,  date_of_birth, salary, status, employee_id]);
    const updateEmployee = updateEmployeeOutput?.rows?.[0]
    res.status(200).json({code:200, data:updateEmployee});
  } catch (error) {
    res.status(400).json({code:400, message:error?.message});
  }
};

// Delete employee data
const deleteEmployee = async (req, res) => {
  try {
    const {employee_id} = req?.params

    const deleteEmployeeQuery = `DELETE FROM "employee_registration" WHERE employee_id = $1 RETURNING *`;
    const deteleEmployeeOutput = await db.query(deleteEmployeeQuery, [employee_id]);
    const deleteEmployee = deteleEmployeeOutput?.rows?.[0]
    res.status(200).json({code:200, message:'Successfully deleted the employee'})
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
}

// Export the register function and multer upload middleware
module.exports = {
  register,
  upload,
  getAllEmployees,
  fetchSingleEmployee,
  updateEmployee,
  deleteEmployee
};
