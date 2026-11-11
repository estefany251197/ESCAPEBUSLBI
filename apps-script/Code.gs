/**
 * ESCAPE BUS · Servicio de resultados para GitHub Pages
 * Hoja: https://docs.google.com/spreadsheets/d/1F0nIqmWZTpxjl3gUliSZJNvZW17NdVUxJqYYdphHbfI/
 * Publicar: Implementar > Nueva implementación > Aplicación web
 * Ejecutar como: Yo. Quién tiene acceso: Cualquier persona.
 */
const SPREADSHEET_ID = '1F0nIqmWZTpxjl3gUliSZJNvZW17NdVUxJqYYdphHbfI';
const SHEET_GID = 0;

function doGet(e) {
  const name = String((e && e.parameter && e.parameter.callback) || '');
  if (!/^escapeBusCb_[a-zA-Z0-9_]+$/.test(name)) {
    return ContentService.createTextOutput('Callback inválido').setMimeType(ContentService.MimeType.TEXT);
  }
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sh = ss.getSheets().find(s => s.getSheetId() === SHEET_GID);
    if (!sh) throw new Error('No se encuentra la pestaña con gid=0');
    const data = sh.getRange(1,1,Math.min(sh.getLastRow(), 11),3).getDisplayValues();
    const payload = {ok:true, rows:data, updatedAt:new Date().toISOString()};
    return ContentService.createTextOutput(name+'('+JSON.stringify(payload)+');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch(err) {
    return ContentService.createTextOutput(name+'('+JSON.stringify({ok:false,error:String(err.message || err)})+');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}
