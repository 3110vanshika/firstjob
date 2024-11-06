const db = require("../database/db");
const createToken = require("../function/createToken");
const bcrypt = require('bcrypt')

const candidateRegister = async (req, res) => {
  const { name, college_name, email, password, role, userType } = req?.body;
  if (userType === 'student') {
    try {
      const query = `
        INSERT INTO candidate (name, college_name, email, password, role) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(query, [name, college_name, email, hashedPassword, role]);
      const candidate = result?.rows?.[0]
      res.status(200).json({
        code:200,
        data:candidate,
        message: "Candidate registered successfully",
      });
    } catch (error) {
      res.status(500).json({code:200, message: error?.message });
    }
  } else {
    res.status(400).json({ message: error?.message });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req?.body;

    if (!email) throw Error("Email not found");
    if (!password) throw Error("Password not found");

    const loginQuery = `SELECT * FROM "candidate" WHERE email=$1`;
    const output = await db.query(loginQuery, [email]);
    const user = output?.rows?.[0];
    
    if (!user) {
      throw Error("User not found.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (!isPasswordCorrect) {
      throw Error("Password Incorrect");
    }

    delete user.password;
    const token = await createToken(user);
    
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
};

module.exports = { candidateRegister, login };
