import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class OrderCancelledMail {
  get key() {
    return 'OrderCancelledMail';
  }

  async handle({ data }) {
    const { order } = data;

    console.log('Queue proccess executed');

    await Mail.sendMail({
      to: `${order.deliveryman.name} <${order.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'orderCancelled',
      context: {
        deliveryman: order.deliveryman.name,
        recipient: order.recipient.name,
        product: order.product,
        address: order.recipient.address,
        number: order.recipient.number,
        complement: order.recipient.complement,
        city: order.recipient.city,
        state: order.recipient.state,
        zip_code: order.recipient.zip_code,
        date: format(new Date(), "'dia' dd 'de' MMMM'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new OrderCancelledMail();
