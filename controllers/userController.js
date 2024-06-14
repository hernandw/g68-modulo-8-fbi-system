import { addUserQuery, verifyUserQuery } from "../models/userQueries.js";

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
  res.render("admin", {
    title: "Admin Page",
  });
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
if(userVerify){
  return res.status(400).send("El correo ya se encuentra registrado")
}

    //Hashear el password
    await addUserQuery(name, email, password);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
