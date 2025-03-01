
/**
 * Ne Pişirsem - Google Sheets Servisi
 * 
 * Bu dosya, Google Sheets ile etkileşim için gerekli fonksiyonları içerir.
 */

/**
 * Google Sheets API'ye erişim ayarla
 */
function setupSheetsAccess() {
  // Google Apps Script doğrudan SpreadsheetApp kullandığı için
  // ayrıca bir kimlik doğrulama gerekmez
  return true;
}

/**
 * Belirtilen sayfayı al veya oluştur
 */
function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  
  return sheet;
}

/**
 * Veri tablolarını oluştur (ilk kurulum için)
 */
function setupDataTables() {
  // Recipes tablosu
  const recipesSheet = getOrCreateSheet('Recipes');
  if (recipesSheet.getLastRow() === 0) {
    recipesSheet.appendRow([
      'id', 'title', 'description', 'preparationTime', 'cookingTime', 
      'difficulty', 'servings', 'imageUrl', 'source', 'cuisine'
    ]);
  }
  
  // Ingredients tablosu
  const ingredientsSheet = getOrCreateSheet('RecipeIngredients');
  if (ingredientsSheet.getLastRow() === 0) {
    ingredientsSheet.appendRow(['recipeId', 'name', 'amount', 'unit', 'isOptional']);
  }
  
  // Steps tablosu
  const stepsSheet = getOrCreateSheet('RecipeSteps');
  if (stepsSheet.getLastRow() === 0) {
    stepsSheet.appendRow(['recipeId', 'stepNumber', 'instruction']);
  }
  
  // MealPlans tablosu
  const plansSheet = getOrCreateSheet('MealPlans');
  if (plansSheet.getLastRow() === 0) {
    plansSheet.appendRow(['id', 'date', 'recipeId', 'mealType', 'notes', 'servingSize']);
  }
  
  // TrendRecipes tablosu
  const trendsSheet = getOrCreateSheet('TrendRecipes');
  if (trendsSheet.getLastRow() === 0) {
    trendsSheet.appendRow([
      'title', 'description', 'preparationTime', 'cookingTime', 
      'difficulty', 'servings', 'imageUrl'
    ]);
    
    // Örnek veriler ekle
    trendsSheet.appendRow([
      'Köfte', 'Klasik Türk köftesi', 20, 15, 'Kolay', 4, 
      'https://via.placeholder.com/300x200?text=Köfte'
    ]);
    
    trendsSheet.appendRow([
      'Mercimek Çorbası', 'Besleyici kırmızı mercimek çorbası', 10, 30, 'Kolay', 6, 
      'https://via.placeholder.com/300x200?text=Mercimek+Çorbası'
    ]);
  }
  
  // DailyMenu tablosu
  const menuSheet = getOrCreateSheet('DailyMenu');
  if (menuSheet.getLastRow() === 0) {
    menuSheet.appendRow(['title', 'mealType', 'description', 'preparationTime', 'cookingTime', 'imageUrl']);
    
    // Örnek veriler ekle
    menuSheet.appendRow([
      'Menemen', 'breakfast', 'Klasik Türk kahvaltısı', 5, 15, 
      'https://via.placeholder.com/300x200?text=Menemen'
    ]);
    
    menuSheet.appendRow([
      'Mercimek Çorbası', 'lunch', 'Besleyici kırmızı mercimek çorbası', 10, 30, 
      'https://via.placeholder.com/300x200?text=Mercimek+Çorbası'
    ]);
    
    menuSheet.appendRow([
      'Izgara Tavuk', 'dinner', 'Baharatlı ızgara tavuk', 15, 25, 
      'https://via.placeholder.com/300x200?text=Izgara+Tavuk'
    ]);
    
    menuSheet.appendRow([
      'Meyve Tabağı', 'snack', 'Karışık mevsim meyveleri', 5, 0, 
      'https://via.placeholder.com/300x200?text=Meyve+Tabağı'
    ]);
  }
  
  // SearchTrends tablosu
  const searchTrendsSheet = getOrCreateSheet('SearchTrends');
  if (searchTrendsSheet.getLastRow() === 0) {
    searchTrendsSheet.appendRow(['trend']);
    
    // Örnek veriler ekle
    searchTrendsSheet.appendRow(['Izgara tavuk']);
    searchTrendsSheet.appendRow(['Cheesecake']);
    searchTrendsSheet.appendRow(['Ev yapımı pizza']);
    searchTrendsSheet.appendRow(['Mercimek çorbası']);
    searchTrendsSheet.appendRow(['Brownie']);
    searchTrendsSheet.appendRow(['Köfte']);
    searchTrendsSheet.appendRow(['Sütlaç']);
    searchTrendsSheet.appendRow(['Sebzeli makarna']);
  }
  
  // WorldCuisines tablosu
  const cuisinesSheet = getOrCreateSheet('WorldCuisines');
  if (cuisinesSheet.getLastRow() === 0) {
    cuisinesSheet.appendRow(['id', 'name']);
    
    // Örnek veriler ekle
    cuisinesSheet.appendRow(['turkish', 'Türk Mutfağı']);
    cuisinesSheet.appendRow(['italian', 'İtalyan Mutfağı']);
    cuisinesSheet.appendRow(['chinese', 'Çin Mutfağı']);
    cuisinesSheet.appendRow(['mexican', 'Meksika Mutfağı']);
    cuisinesSheet.appendRow(['indian', 'Hint Mutfağı']);
    cuisinesSheet.appendRow(['japanese', 'Japon Mutfağı']);
    cuisinesSheet.appendRow(['thai', 'Tayland Mutfağı']);
    cuisinesSheet.appendRow(['french', 'Fransız Mutfağı']);
    cuisinesSheet.appendRow(['greek', 'Yunan Mutfağı']);
    cuisinesSheet.appendRow(['spanish', 'İspanyol Mutfağı']);
    cuisinesSheet.appendRow(['lebanese', 'Lübnan Mutfağı']);
    cuisinesSheet.appendRow(['moroccan', 'Fas Mutfağı']);
  }
  
  // PopularPresentations tablosu
  const presentationsSheet = getOrCreateSheet('PopularPresentations');
  if (presentationsSheet.getLastRow() === 0) {
    presentationsSheet.appendRow(['title', 'description', 'imageUrl', 'likes', 'comments']);
    
    // Örnek veriler ekle
    presentationsSheet.appendRow([
      'Restoran Kalitesinde Sunum', 
      'Evinizde kolayca restoran kalitesinde sunumlar yapmanın incelikleri',
      'https://via.placeholder.com/300x200?text=Sunum+Görseli',
      120,
      15
    ]);
    
    presentationsSheet.appendRow([
      'Misafir Sofraları',
      'Misafirlerinizi etkileyecek sofra düzenleme taktikleri',
      'https://via.placeholder.com/300x200?text=Sunum+Görseli',
      95,
      12
    ]);
  }
  
  return true;
}
