const db = require("../database/db");

const jobRoles = async (req, res) => {
  try {
    const { roles } = req?.body;
    if (!roles) throw Error("Roles are required");

    const roleQuery = `INSERT INTO "roles" (roles) VALUES($1) RETURNING *`;
    const rolesOutput = await db.query(roleQuery, [roles]);
    const rolesResult = rolesOutput?.rows?.[0];
    res
      .status(200)
      .json({
        code: 200,
        data: rolesResult,
        message: "Roles are successfully save",
      });
  } catch (error) {
    res.status(400).json({ code: 400, message: error?.message });
  }
};

// Fetch roles
const getRoles = async (req, res) => {
    try {
        const getRolesQuery = `SELECT * FROM "roles"`;
        const getRolesOutput = await db.query(getRolesQuery);
        const getRolesResult = getRolesOutput?.rows;
        res.status(200).json({code:200, data:getRolesResult})
    } catch (error) {
        res.status(400).json({code:400, message:error?.message})
    }
}

module.exports = {jobRoles, getRoles}