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
