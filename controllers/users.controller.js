const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      const user = await User.find();
      await res.json(user);
    } catch (error) {
      res.json(error);
    }
  },

  postUser: async (req, res) => {
    try {
      const { email, title, password, phone } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDES)
      );

      const user = await User.create({
        email: email,
        password: hash,
        title,
        phone,
      });

      await res.json(user);
    } catch (error) {
      res.json(error);
    }
  },

  // Изменения в контроллере на сервере
  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const candidate = await User.findOne({ email });
  
      if (!candidate) {
        return res.status(401).json("Неверный логин");
      }
  
      const valid = await bcrypt.compare(password, candidate.password);
  
      if (!valid) {
        return res.status(401).json("Неверный пароль");
      }
  
      const payload = {
        id: candidate._id,
        email: candidate.email,
        title: candidate.title, // Добавляем ключ title
      };
  
      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });
  
      // Теперь включаем данные пользователя в ответ
      res.json({
        token,
        userData: { id: candidate._id, email: candidate.email, title: candidate.title },
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },  
};
