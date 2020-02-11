import * as Yup from 'yup';
import { isBefore, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Queue from '../../lib/Queue';
import OrderCreated from '../jobs/OrderCreated';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import OrderCancelled from '../jobs/OrderCancelled';

class OrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { path } = req;

    if (path === `/orders/deliveryman/${req.params.id}`) {
      const orders = await Order.findOne({
        where: {
          id: req.params.id,
          canceled_at: null,
        },
        attributes: ['id', 'product', 'created_at'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'name',
              'address',
              'number',
              'complement',
              'city',
              'state',
              'zipCode',
            ],
          },
        ],
      });

      if (!orders) {
        return res.json({
          message: 'Looks like this deliveryman do not has orders',
        });
      }

      return res.json(orders);
    }
    if (path === `/orders/deliveryman/${req.params.id}/deliveries`) {
      const orders = await Order.findOne({
        where: {
          id: req.params.id,
          end_date: {
            [Op.ne]: null,
          },
        },
        attributes: ['id', 'product', 'created_at', 'end_date'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'name',
              'address',
              'number',
              'complement',
              'city',
              'state',
              'zipCode',
            ],
          },
        ],
      });

      if (!orders) {
        return res.json({
          message: 'Ops, it looks like this deliveryman does not has orders',
        });
      }

      return res.json(orders);
    }

    const orders = await Order.findAll({
      where: {
        canceled_at: null,
      },
      attributes: ['id', 'product', 'created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'number',
            'complement',
            'city',
            'state',
            'zipCode',
          ],
        },
      ],
    });
    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient: Yup.object().shape({
        name: Yup.string().required(),
        zipCode: Yup.string().required(),
        number: Yup.string().required(),
      }),
      deliveryman: Yup.object().shape({
        email: Yup.string()
          .email()
          .required(),
      }),
      order: Yup.object().shape({
        // recipientId: Yup.number().required(),
        // deliverymanId: Yup.number().required(),
        product: Yup.string().required(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails, verify request body' });
    }
    const recipient = await Recipient.findOne({
      where: {
        name: req.body.recipient.name,
        zipCode: req.body.recipient.zipCode,
        number: req.body.recipient.number,
      },
    });
    const deliveryman = await Deliveryman.findOne({
      where: {
        email: req.body.deliveryman.email,
      },
    });

    if (!deliveryman || !recipient) {
      return res
        .status(400)
        .json({ error: 'Recipient or Deliveryman not found' });
    }

    const timeNow = new Date();

    // validates if the order is between 08:00 and 18:00
    if (
      isAfter(timeNow.setHours(8), timeNow.getHours()) &&
      isBefore(timeNow.setHours(18), timeNow.getHours())
    ) {
      return res.status(401).json({
        error: 'Please, schedule orders only between 08:00 and 18:00',
      });
    }

    const orders = await Order.findAll({
      where: {
        deliveryman_id: deliveryman.id,
      },
      attributes: ['id'],
    });
    if (orders.length > 5) {
      return res.status(401).json({
        message: 'Each deliveryman is allowed to deliver 5 orders per day',
      });
    }
    try {
      const registerOrder = await Order.create({
        recipient_id: recipient.id,
        deliveryman_id: deliveryman.id,
        product: req.body.order.product,
      });

      // send mail to deliveryman
      await Queue.add(OrderCreated.key, {
        recipient,
        deliveryman,
        registerOrder,
      });

      return res.json(registerOrder);
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });
    const { id } = req.params;
    const { path } = req;

    const order = await Order.findByPk(id);

    if (path === `/orders/${id}/end_date`) {
      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validation fails, verify request body' });
      }
    }

    if (!order) {
      return res.status(400).json({ error: 'Order not found, verify ID' });
    }

    try {
      switch (path) {
        case `/orders/${id}/start_date`:
          order.start_date = new Date();
          break;
        case `/orders/${id}/end_date`:
          order.end_date = new Date();
          order.signature_id = req.body.signature_id;
          break;
        default:
          return res.status(500).json({ message: 'Request value not found' });
      }

      await order.save();

      return res.json(order);
    } catch (err) {
      return res.status(500).json({ message: 'An error ocurred', err });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      attributes: ['id', 'product', 'created_at'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'address',
            'number',
            'complement',
            'city',
            'state',
            'zipCode',
          ],
        },
      ],
    });

    if (!order) {
      return res.status(400).json({ error: 'Order not found, verify ID' });
    }

    try {
      order.canceled_at = new Date();

      await order.save();

      await Queue.add(OrderCancelled.key, {
        order,
      });

      return res.json(order);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export default new OrderController();
