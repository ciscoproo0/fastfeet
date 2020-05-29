import * as Yup from 'yup';

import Problems from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import OrderCancelled from '../jobs/OrderCancelled';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1, id } = req.query;
    const { path } = req;

    if (path === `/delivery/${id}/problems`) {
      const problems = await Problems.findAll({
        where: {
          delivery_id: id,
        },
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: Order,
            as: 'delivery',
            where: { canceled_at: null },
            attributes: [
              'created_at',
              'updated_at',
              'start_date',
              'deliveryman_id',
            ],
            include: [
              {
                model: Deliveryman,
                as: 'deliveryman',
                attributes: ['name', 'email'],
              },
            ],
          },
        ],
      });

      return res.json(problems);
    }

    const problems = await Problems.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Order,
          as: 'delivery',
          where: { canceled_at: null },
          attributes: [
            'id',
            'created_at',
            'updated_at',
            'start_date',
            'deliveryman_id',
          ],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation error, check body request' });
    }
    const orders = await Order.findByPk(req.params.id);

    if (!orders) {
      return res
        .status(400)
        .json({ error: 'There is no order with informed id' });
    }
    const problem = await Problems.create({
      delivery_id: req.params.id,
      description: req.body.description,
    });

    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const findProblem = await Problems.findByPk(id);

    if (!findProblem) {
      return res.status(400).json({ error: 'Delivery problem not found' });
    }

    const order = await Order.findByPk(findProblem.delivery_id, {
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

    try {
      // It is important to keep history of cancelation, so just the canceled_at is updated, not deleted.
      order.canceled_at = new Date();

      await order.save();

      await Queue.add(OrderCancelled.key, { order });

      return res.json({
        message: `Delivery ${order.id} canceled`,
        order,
      });
    } catch (err) {
      return res.status(500).json({ message: `An error ocurred`, err });
    }
  }
}

export default new DeliveryProblemController();
