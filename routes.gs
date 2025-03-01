
/**
 * Ne Pişirsem - API Rotaları
 * 
 * Bu dosya, API isteklerini yönlendirmek için kullanılır.
 * doPost fonksiyonu, AJAX isteklerini karşılar.
 */

function doPost(e) {
  var params;
  var response = { success: false, message: 'İşlem başarısız' };
  
  try {
    params = JSON.parse(e.postData.contents);
    
    if (!params.endpoint) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, message: 'Endpoint belirtilmedi' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    response = processApiRequest(params.endpoint, params.method || 'GET', params.data || {});
  } catch (error) {
    response.message = 'İşlem sırasında hata oluştu: ' + error.toString();
    console.error(error);
  }
  
  return ContentService.createTextOutput(
    JSON.stringify(response)
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * API rotalarını işleme
 */
function handleApiRoutes(endpoint, method, data) {
  return processApiRequest(endpoint, method, data);
}

/**
 * Client API çağrısı - Bu fonksiyon HTML'den çağrılabilir
 */
function clientApiCall(endpoint, method, data) {
  return processApiRequest(endpoint, method, data);
}
