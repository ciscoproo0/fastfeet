import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    // yup needs to be installed in terminal, will validate items from req.body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // validation of body
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails, check request body' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }
    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // validation of body
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, check request body' });
    }

    const { email, oldPassword } = req.body;

    // This userId comes from auth middleware
    const user = await User.findByPk(req.userId);

    // check if the user already exists in db
    if (email && email !== user.email) {
      const userExists = await user.findOne({ where: { email } });
      if (userExists) {
        return res.status(401).json({ error: 'User already exists' });
      }
    }
    // check password in db
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
