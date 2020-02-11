import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { deliveryman, recipient, registerOrder } = data;

    console.log('Queue proccess executed');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova entrega',
      template: 'orderCreated',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product: registerOrder.product,
        address: recipient.address,
        number: recipient.number,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state,
        zip_code: recipient.zip_code,
        date: format(new Date(), "'dia' dd 'de' MMMM'", {
          locale: pt,
        }),
      },
    });
  }
}

export default new OrderMail();
