
/**
 * Ne Pişirsem - Client-Side Utils
 * 
 * Bu dosya client tarafında kullanılacak yardımcı fonksiyonları içerir.
 * Google Apps Script'te Vite kullanılmadığı için, bazı yardımcı işlevler içerir.
 */

/**
 * Statik içerikleri dışa aktar
 * Bu fonksiyon, istemci tarafından çağrılabilir ve CSS, JS gibi statik dosyaları döndürür
 */
function getStaticContent(filename) {
  var files = {
    'styles.css': `
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .recipe-card {
        transition: transform 0.3s;
        height: 100%;
      }
      .recipe-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }
      .recipe-image {
        height: 200px;
        object-fit: cover;
      }
      .navbar-brand {
        font-weight: bold;
        color: #ff6b6b !important;
      }
      .navbar {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }
      .btn-primary {
        background-color: #ff6b6b;
        border-color: #ff6b6b;
      }
      .btn-primary:hover {
        background-color: #e95f5f;
        border-color: #e95f5f;
      }
      .btn-outline-primary {
        color: #ff6b6b;
        border-color: #ff6b6b;
      }
      .btn-outline-primary:hover {
        background-color: #ff6b6b;
        border-color: #ff6b6b;
      }
      .section-title {
        border-bottom: 2px solid #ff6b6b;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
      #loader {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255,255,255,0.7);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `,
    'app.js': `
      // Client-side JavaScript logic
      console.log('App initialized!');
      
      // API isteği gönderme
      function sendApiRequest(endpoint, method, data) {
        return new Promise((resolve, reject) => {
          google.script.run
            .withSuccessHandler(resolve)
            .withFailureHandler(reject)
            .clientApiCall(endpoint, method, data);
        });
      }
      
      // Tarifleri getir
      async function loadRecipes() {
        try {
          const response = await sendApiRequest('recipes', 'GET');
          return response.recipes || [];
        } catch (error) {
          console.error('Tarifler yüklenirken hata:', error);
          return [];
        }
      }
      
      // Trend tarifleri getir
      async function loadTrendingRecipes() {
        try {
          const response = await sendApiRequest('trending-recipes', 'GET');
          return response.recipes || [];
        } catch (error) {
          console.error('Trend tarifler yüklenirken hata:', error);
          return [];
        }
      }
    `
  };
  
  return files[filename] || '';
}

/**
 * Client tarafından API isteklerinin işlenmesi
 * Google Apps Script'in client-side çağrıları için köprü görevi görür
 */
function processClientRequest(endpoint, method, data) {
  return processApiRequest(endpoint, method, data);
}
