import { formatNumberAsMoney } from "../utils/utils";

export const generateTicketDocument = (data: any) => {
  const mywindow = window.open('', 'PRINT', 'height=400,width=600');
  const totalValue = formatNumberAsMoney(data.nr_valorvenda);
  const partialValue = formatNumberAsMoney(Math.round(data.nr_valorvenda - (data.nr_valorvenda * 0.05)));

  let sailedTicketsHTML = data?.tickets.map((item: any) => {
    const ticketValue = formatNumberAsMoney(item.ds_tipo === 'Meia' ? item.nr_valor * 2 : item.nr_valor);

    return `
      <tr class="top">
        <td colspan="3">Ingresso assento ${item.ds_assento}</td>
      </tr>
      <tr>
        <td>${ticketValue}</td>
        <td>${item.ds_tipo}</td>
        <td>${formatNumberAsMoney(item.nr_valor)}</td>
      </tr>
    `
  });

  if (mywindow) {
    mywindow.document.write(`
    <html>
      <head>
        <style>
          .text-center {
            text-align: center;
          }
          .ttu {
            text-transform: uppercase;
          }
          .printer-ticket {
            display: table !important;
            width: 100%;
            max-width: 400px;
            font-weight: light;
            line-height: 1.3em;
          }
          .printer-ticket,
          .printer-ticket * {
            font-family: Tahoma, Geneva, sans-serif;
            font-size: 10px;
          }
          .printer-ticket th:nth-child(2),
          .printer-ticket td:nth-child(2) {
            width: 50px;
          }
          .printer-ticket th:nth-child(3),
          .printer-ticket td:nth-child(3) {
            width: 90px;
            text-align: right;
          }
          .printer-ticket th {
            font-weight: inherit;
            padding: 10px 0;
            text-align: center;
            border-bottom: 1px dashed #BCBCBC;
          }
          .printer-ticket tbody tr:last-child td {
            padding-bottom: 10px;
          }
          .printer-ticket tfoot .sup td {
            padding: 10px 0;
            border-top: 1px dashed #BCBCBC;
          }
          .printer-ticket tfoot .sup.p--0 td {
            padding-bottom: 0;
          }
          .printer-ticket .title {
            font-size: 1.5em;
            padding: 15px 0;
          }
          .printer-ticket .top td {
            padding-top: 10px;
          }
          .printer-ticket .last td {
            padding-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <table class="printer-ticket">
          <thead>
            <tr>
              <th class="title" colspan="3">Sygev</th>
            </tr>
            <tr>
              <th colspan="3">${new Date().toLocaleString()}</th>
            </tr>
            <tr>
              <th colspan="3">
                ${data.ds_nomecliente} <br />
                ${data.ds_tipodocumento}: ${data.nr_documento}
              </th>
            </tr>
            <tr>
              <th class="ttu" colspan="3">
                <b>Cupom não fiscal</b>
              </th>
            </tr>
          </thead>
          <tbody>
            ${sailedTicketsHTML}
          </tbody>
          <tfoot>
            <tr class="sup ttu p--0">
              <td colspan="3">
                <b>Totais</b>
              </td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Sub-total</td>
              <td align="right"> ${partialValue}</td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Taxa de serviço(5%)</td>
              <td align="right"> ${formatNumberAsMoney(data.amountRate)}</td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Total</td>
              <td align="right"> ${totalValue}</td>
            </tr>
            <tr class="sup ttu p--0">
              <td colspan="3">
                <b>Pagamentos</b>
              </td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Tipo venda</td>
              <td align="right">${data.ds_formapagamento}</td>
            </tr>
            <tr class="sup">
              <td colspan="3" align="center">
                <b>Protocolo:  ${data.nr_protocolo}</b>
              </td>
            </tr>
            <tr class="sup">
              <td colspan="3" align="center">
                www.sigev.com.br
              </td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>
    `);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  }

  return false;
};

