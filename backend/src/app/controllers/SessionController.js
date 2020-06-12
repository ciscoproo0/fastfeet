import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';
import Deliveryman from '../models/Deliveryman';

class SessionController {
  async store(req, res) {
    // Defines a schema to validade the req.body
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .when('deliveryman_id', (deliveryman_id, field) =>
          !deliveryman_id ? field.required() : field
        ),
      password: Yup.string().when('deliveryman_id', (deliveryman_id, field) =>
        !deliveryman_id ? field.required() : field
      ),
      deliveryman_id: Yup.number(),
    });

    // Validates body from the request
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password, deliveryman_id } = req.body;

    // Bearer token to deliveryman app
    if (deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      if (!deliveryman) {
        return res.status(401).json({ error: 'Deliveryman not found' });
      }

      const { id, name, email: deliveryman_email } = deliveryman;

      return res.json({
        user: { id, name, deliveryman_email },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    }

    const user = await User.findOne({ where: { email } });

    // Verify if user exists
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Match password
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    // return user with the jwt
    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
