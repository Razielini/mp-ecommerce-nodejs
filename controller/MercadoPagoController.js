class MercadoPagoController {
  constructor(MercadoPagoService) {
    this.MercadoPagoService = MercadoPagoService;
  }

  /**
   * Tomamos el Link para Mercadopago
   * @param {*} req 
   * @param {*} res 
   */
  async getMercadoPagoLink(req, res) {
    const { title, price, unit, img } = req.body;
    console.log('Check', title, price, unit, img);
    try {

      const checkout = await this.MercadoPagoService.createPaymentMercadoPago(
        title,
        price,
        unit,
        img
      );
      return res.redirect(checkout.init_point);
    } catch (error) {
      return res.status(500).json({
        error: true,
        msg: 'Al parecer hubo un error con el pago, intento en unos momentos o contacte al administrador del sitio.'
      });
    }

  }

  webhook(req, res) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        console.log(body, 'webhook response');
        res.end('ok');
      });
    }
    return res.status(200);
  }

  notifications(req, res) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        res.end('ok');
      });
    }
    return res.status(200);
  }

}

module.exports = MercadoPagoController;
