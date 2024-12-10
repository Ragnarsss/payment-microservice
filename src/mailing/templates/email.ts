export const fillTemplate = (body) => {
  return `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Pago</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          margin: 0;
        }
        .content {
          margin-bottom: 20px;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Confirmación de Pago</h1>
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Gracias por tu compra. Aquí están los detalles de tu transacción:</p>
          <ul>
            <li><strong>Orden:</strong> ${body.order}</li>
            <li><strong>Monto:</strong> $${body.amount}</li>
            <li><strong>Artículos:</strong> ${body.items
              .map((item) => `<p>${item}</p>`)
              .join('')}</li>
            <li><strong>URL de Confirmación:</strong> <a href="${body.url}">${
              body.url
            }</a></li>
          </ul>
          <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        </div>
        <div class="footer">
          <p>&copy; 2023 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>`;
};
