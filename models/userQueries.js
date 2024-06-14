import { pool } from "../config/db.js";

export const addUserQuery = async (name, email, password) => {
  try {
    const sql = {
      text: "INSERT INTO users  VALUES (DEFAULT, $1, $2, $3)",
      values: [name, email, password],
    };

    const result = await pool.query(sql);
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return new Error("No se pudo registrar el usuario");
    }
  } catch (error) {
    console.log("Error code: ", error.code, "Error: ", error.message);
  }
};

export const verifyUserQuery = async (email) => {
  try {
    const sql = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const response = await pool.query(sql);
    if (response.rowCount > 0) {
      return response.rows[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error code: ", error.code, "Error: ", error.message);
  }
};
