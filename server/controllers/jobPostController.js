const jobPostTable = require("../constant/jobPost");
const db = require("../database/db");

const jobPost = async (req, res) => {
  try {
    const {
      job_title,
      company_name,
      employment_type,
      experience,
      salary,
      job_location,
      job_description,
      departments,
      key_skills,
      opening,
    } = req?.body;

    if (!job_title) throw Error("Job title field are required");
    if (!company_name) throw Error("Company name field are required");
    if (!employment_type) throw Error("Employment Type field are required");
    if (!experience) throw Error("Experince field are required");
    if (!salary) throw Error("Salary field are required");
    if (!job_location) throw Error("Job location field are required");
    if (!job_description) throw Error("Job description field are required");
    if (!departments) throw Error("Departments field are required");
    if (!key_skills) throw Error("Key skills field are required");
    if (!opening) throw Error("Opening field are required");

    const jobPostQuery = `
  INSERT INTO "jobs_post" (
    ${jobPostTable.JOB_TITLE},
    ${jobPostTable.COMPANY_NAME},
    ${jobPostTable.EMPLOYEMENT_TYPE},
    ${jobPostTable.EXPERINCE},
    ${jobPostTable.SALARY},
    ${jobPostTable.JOB_LOCATION},
    ${jobPostTable.JOB_DESCRIPTION},
    ${jobPostTable.DEPARTMENTS},
    ${jobPostTable.KEY_SKILLS},
    ${jobPostTable.OPENING}
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;
`;
    const jobPostOutput = await db.query(jobPostQuery, [
      job_title,
      company_name,
      employment_type,
      experience,
      salary,
      job_location,
      job_description,
      departments,
      key_skills,
      opening,
    ]);
    const jobPost = jobPostOutput?.rows?.[0];
    res.status(200).json({ code: 200, data: jobPost, message:'Job post is successfully done' });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Fetch all job post
const getAllJobPost = async (req, res) => {
  try {
    const query = `SELECT * FROM "jobs_post"`;
    const result = await db.query(query);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching job post:", error.message);
    res.status(500).json({ message: "Error fetching job post" });
  }
};

// Fetch single job post
const getSingleJobPost = async (req, res) => {
  try {
    const {id} = req?.params
    const query = `SELECT * FROM "jobs_post" WHERE id = $1`;
    const result = await db.query(query, [id]);
    res.status(200).json({ data: result.rows });
  } catch (error) {
    console.error("Error fetching job post:", error.message);
    res.status(500).json({ message: "Error fetching job post" });
  }
};

module.exports = { jobPost, getAllJobPost, getSingleJobPost };
