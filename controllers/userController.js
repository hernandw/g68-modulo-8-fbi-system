import { addUserQuery, verifyUserQuery } from "../models/userQueries.js";
import jwt from "jsonwebtoken";

process.loadEnvFile();

const secretKey = process.env.JWT_SECRET_KEY;

export const home = (req, res) => {
  res.render("home", {
    title: "Home Page",
  });
};

export const loginForm = (req, res) => {
  res.render("login", {
    title: "Login Page",
  });
};

export const registerForm = (req, res) => {
  res.render("register", {
    title: "Register Page",
  });
};

export const contactForm = (req, res) => {
  res.render("contact", {
    title: "Contact Page",
  });
};

export const admin = (req, res) => {
  try {
    //verificar token y que este activo
    const token = req.cookies.jwtToken;
    const { email } = jwt.verify(token, secretKey);
    console.log(email);
    if (!email) {
      return new Error("Usted no está autorizado para entrar al dashboard");
    }

    res.render("admin", {
      title: "Admin Page",
      email,
    });
  } catch (error) {
    res
      .status(401)
      .send(
        `Usted no está autorizado para entrar al dashboard => ${error.message}`
      );
  }
};

export const addUser = async (req, res) => {
  try {
    //recibimos los datos del formulario
    const { name, email, password, confirm_password } = req.body;

    //validamos que el password coincida
    if (password !== confirm_password) {
      res.status(400).send("Las contraseñas no coinciden");
      return;
    }
    if (!name || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    //Verificacion de que el correo no este registrado
    const userVerify = await verifyUserQuery(email);
    if (userVerify) {
      return res.status(400).send("El correo ya se encuentra registrado");
    }

    //Hashear el password

    //Guardar en la BBDD
    await addUserQuery(name, email, password);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    //recibimos los datos del formulario

    const { email, password } = req.body;

    //validamos de los campos

    //Verificamos que el usuario se encuentre en la BBDD

    const userVerify = await verifyUserQuery(email);
    if (!userVerify) {
      return res.status(404).send("User not found");
    }

    //Deberiamos ir a la pagina correspondiente de admin

    //Crear el token
    const token = jwt.sign({ email: userVerify.email }, secretKey, {
      expiresIn: 40,
    });
    res
      .cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 40000,
      })
      .redirect("/admin");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
