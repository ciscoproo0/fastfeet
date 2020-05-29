import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, q: querySearch } = req.query;
    const recipient = await Recipient.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${querySearch || ''}%`,
            },
          },
          {
            address: {
              [Op.iLike]: `%${querySearch || ''}%`,
            },
          },
          {
            complement: {
              [Op.iLike]: `%${querySearch || ''}%`,
            },
          },
          {
            city: {
              [Op.iLike]: `%${querySearch || ''}%`,
            },
          },
          {
            state: {
              [Op.iLike]: `%${querySearch || ''}%`,
            },
          },
        ],
      },
      attributes: [
        'id',
        'name',
        'address',
        'number',
        'complement',
        'city',
        'state',
        'zip_code',
      ],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipient);
  }

  async store(req, res) {
    // Defines a schema to validade the req.body
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    // Validates body from the request
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }
    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        zipCode: req.body.zipCode,
        number: req.body.number,
      },
    });

    if (recipientExists) {
      return res
        .status(400)
        .json({ error: 'Address info already exists for this name' });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(201).json(recipient);
  }

  async update(req, res) {
    // Defines a schema to validade the req.body
    const schema = Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
    });
    const { id } = req.params;

    // Validates body from the request
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }
    const recipientExists = await Recipient.findByPk(id);

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const update = await recipientExists.update(req.body);

    return res.json(update);
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    recipient.destroy();

    return res.json({ message: 'Recipient deleted from database' });
  }
}

export default new RecipientController();
