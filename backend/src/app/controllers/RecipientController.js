import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
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
      oldName: Yup.string().required(),
      oldZipCode: Yup.string().required(),
      oldNumber: Yup.string().required(),
      name: Yup.string(),
      address: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
    });

    // Validates body from the request
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }
    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.oldName,
        zipCode: req.body.oldZipCode,
        number: req.body.oldNumber,
      },
    });
    if (!recipientExists) {
      return res.status(400).json({ error: 'Address and User not matched' });
    }

    const update = await recipientExists.update(req.body);

    return res.json(update);
  }
}

export default new RecipientController();
