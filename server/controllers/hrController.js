const db = require("../database/db");

const registerHR = async (req, res) => {
  try {
    const {
      name,
      designation,
      company_name,
      email_id,
      phone_number,
      categories,
    } = req?.body;

    // Validation
    if (!name) throw Error("Name is required");
    if (!designation) throw Error("Designation is required");
    if (!company_name) throw Error("Company Name is required");
    if (!email_id) throw Error("Email id is required");
    if (!phone_number) throw Error("Phone number is required");
    if (!categories) throw Error("Categories is required");

    const registerHRQuery = `INSERT INTO "hr" (name, designation, company_name, email_id, phone_number, categories) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const registerHROutput = await db.query(registerHRQuery, [name, designation, company_name, email_id, phone_number, categories]);
    const registerHRResult = registerHROutput?.rows?.[0];
    res.status(200).json({ code: 200, data:registerHRResult, message: "HR is registered successfully" });
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
};

// Fetch HR Details
const fetchAllHR = async (req, res) => {
  try {
    const fetchAllHRQuery = `SELECT * FROM "hr"`;
    const fetchAllHROutput = await db.query(fetchAllHRQuery);
    const AllHR = fetchAllHROutput?.rows;
    res.status(200).json({code:200, data:AllHR})
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
}

// Fetch Single HR Details
const fetchSingleHR = async (req, res) => {
  try {
    const {id} = req?.params;
    const fetchSingleHRQuery = `SELECT * FROM "hr" WHERE id = $1`;
    const fetchSingleHROutput = await db.query(fetchSingleHRQuery, [id]);
    const SingleHR = fetchSingleHROutput?.rows?.[0];
    res.status(200).json({code:200, data:SingleHR})
  } catch (error) {
    res.status(400).json({code:400, message:error?.message})
  }
}

// Update HR
const EditHr = async (req, res) => {
  try {
    const {id} = req?.params
    const {
      name,
      designation,
      company_name,
      email_id,
      phone_number,
      categories,
    } = req?.body;
    // Validation
    if (!name) throw Error("Name is required");
    if (!designation) throw Error("Designation is required");
    if (!company_name) throw Error("Company Name is required");
    if (!email_id) throw Error("Email id is required");
    if (!phone_number) throw Error("Phone number is required");
    if (!categories) throw Error("Categories is required");

    const editHRQuery = `UPDATE "hr" set name=$1, designation=$2, company_name=$3, email_id=$4, phone_number=$5, categories=$6 WHERE id = $7 RETURNING *`;
    const editHROutput = await db.query(editHRQuery, [name, designation, company_name, email_id, phone_number, categories, id]);
    const editHR = editHROutput?.rows?.[0]
    res.status(200).json({code:200, data:editHR, message:"HR details updated successfully"})
  } catch (error) {
    res.status(400).json({code:400, message:"Error in fetching the HR details"})
  }
}

module.exports = {registerHR, fetchAllHR, fetchSingleHR, EditHr}