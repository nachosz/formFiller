
const XLSX = require('xlsx');
const validarExcel = require ('./validarExcel')

function parseoExcel(ruta){

  
  //Leo el archivo
  let ws =XLSX.readFile(ruta);

  //Elijo la hoja 1
  ws=  ws.Sheets.Sheet1;

  //Creo un array de objetos, cada objeto es una fila del excel con sus propiedades como el nombre de la columna.
  let arrPromos= XLSX.utils.sheet_to_json(ws);

  validarExcel(arrPromos);
  /*
  * El excel requiere un formato especifico.
  * En este caso decidi que sean dos columnas. Una con el
  * nro de tarjeta y otra con el nro de promocion. Se tienen que llamar
  * NroTarjeta y Promoción.
  * Si todo esta bien los nros de promocion son reemplazados por su texto correspondiente.
  * Si no se interrumpe el proceso.
  */

return arrPromos;

};



module.exports = parseoExcel;