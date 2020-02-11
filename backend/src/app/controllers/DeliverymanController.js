import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryman = await Deliveryman.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'avatar_id',
        'createdAt',
        'updatedAt',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }

  async store(req, res) {
    // yup needs to be installed in terminal, will validate items from req.body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    // validation of body
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation fails, check request body' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman already exists!' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.status(201).json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      oldEmail: Yup.string().email(),
      name: Yup.string(),
      email: Yup.string()
        .email()
        .when('oldEmail', (oldEmail, field) =>
          oldEmail ? field.required() : field
        ),
    });
    // validation of body
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, check request body' });
    }

    // if there is no oldEmail, then it is tha name that will be updated
    if (!req.body.oldEmail) {
      const deliveryman = await Deliveryman.findOne({
        where: { email: req.body.email },
      });
      if (!deliveryman) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
      const nameUpdate = await deliveryman.update({ name: req.body.name });

      return res.json(nameUpdate);
    }

    // if there is oldEmail, then deliveryman will be found and updated. (name and email if it is needed)
    const emailDeliveryman = await Deliveryman.findOne({
      where: { email: req.body.oldEmail },
    });

    if (!emailDeliveryman) {
      return res.status(400).json({ error: 'User does not exists!' });
    }

    const { id, name, email } = await emailDeliveryman.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    deliveryman.destroy();

    return res.json({ message: 'Deliveryman deleted from database' });
  }
}

export default new DeliverymanController();
