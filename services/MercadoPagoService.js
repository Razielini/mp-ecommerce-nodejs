const mercadopago = require('mercadopago');

class MercadoPagoService {
  constructor() {
    this.tokenMercadoPago = {
      prod: {},
      test: {
        access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
        platform_id: 'dev_24c65fb163bf11ea96500242ac130004'
      }
    };
    this.mercadoPagoUrl = 'https://api.mercadopago.com/checkout';
    this.env = 'https://razielini-mp-ecommerce-nodejs.herokuapp.com/';
    this.external_reference = 'razielco@gmail.com';
    this.payer = {
      name: 'Lalo',
      surname: 'Landa',
      email: 'test_user_81131286@testuser.com',
      phone: {
        area_code: '52',
        number: 5549737300
      },
      address: {
        zip_code: '03940',
        street_name: 'Insurgentes Sur',
        street_number: 1602
      }
    };
  }

  /**
   * Creamos el pago para Mercado Pago
   * @param {*} name 
   * @param {*} price 
   * @param {*} unit 
   * @param {*} img 
   */
  async createPaymentMercadoPago(name, price, unit, img) {
    mercadopago.configure({
      access_token: this.tokenMercadoPago.test.access_token,
      integrator_id: this.tokenMercadoPago.test.platform_id
    });

    let url_imagen = img.substring(1, img.length);
    const items = [
      {
        id: '1234',
        title: name,
        description: 'Dispositivo móvil de Tienda e-commerce',
        picture_url: this.env + url_imagen,
        category_id: '1234',
        quantity: parseInt(unit),
        currency_id: 'MXN',
        unit_price: parseInt(price),
        external_reference: this.external_reference
      }
    ];


    const preferences = {
      items,
      external_reference: this.external_reference,
      payer: this.payer,
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'amex'
          }
        ],
        excluded_payment_types: [{ id: 'atm' }],
        installments: 6,
        default_installments: 6
      },
      back_urls: {
        success: this.env + '/success',
        pending: this.env + '/pending',
        failure: this.env + '/failure'
      },
      notification_url: this.env + '/webhook',
      auto_return: 'approved'
    };

    try {
      const res = await mercadopago.preferences.create(preferences);
      return res.body;
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = MercadoPagoService;
