
/**
 * Ne Pişirsem - Google Apps Script - Web Uygulaması
 */

// Web uygulamasının ana fonksiyonu
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Ne Pişirsem?')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Trend tarifleri getir
function getTrendingRecipes() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TrendRecipes');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const recipes = [];
  
  for(let i = 1; i < data.length; i++) {
    const recipe = {};
    for(let j = 0; j < headers.length; j++) {
      recipe[headers[j]] = data[i][j];
    }
    recipes.push(recipe);
  }
  
  return recipes;
}

// Günlük menü önerilerini getir
function getDailyMenuSuggestions() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DailyMenu');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const menu = [];
  
  for(let i = 1; i < data.length; i++) {
    const menuItem = {};
    for(let j = 0; j < headers.length; j++) {
      menuItem[headers[j]] = data[i][j];
    }
    menu.push(menuItem);
  }
  
  return menu;
}

// Yemek planı kaydet
function saveMealPlan(plan) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  const row = [
    new Date(plan.date || new Date()),
    plan.recipeId,
    plan.mealType,
    plan.notes || '',
    plan.servingSize || 1
  ];
  
  sheet.appendRow(row);
  return true;
}

// Yemek planlarını getir
function getMealPlans() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  const data = sheet.getDataRange().getValues();
  const headers = ['date', 'recipeId', 'mealType', 'notes', 'servingSize'];
  const plans = [];
  
  for(let i = 1; i < data.length; i++) {
    const plan = {};
    for(let j = 0; j < headers.length; j++) {
      plan[headers[j]] = data[i][j];
    }
    plans.push(plan);
  }
  
  return plans;
}

// Arama trendlerini getir
function getSearchTrends() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SearchTrends');
  const data = sheet.getDataRange().getValues();
  return data.slice(1).map(row => row[0]);
}

// Yemek planını sil
function deleteMealPlan(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  const data = sheet.getDataRange().getValues();
  
  // ID'yi bulup silme
  for(let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1); // +1 çünkü header satırı var
      return true;
    }
  }
  
  return false;
}

// Web üzerinden tarif ara ve çeviri yap
function searchRecipesFromWeb(query, cuisine) {
  // Bu fonksiyon, harici API'ler kullanarak web'den tarif arayabilir
  // Google Apps Script'in UrlFetchApp servisi ile HTTP istekleri yapılabilir
  
  // Örnek: bir tarif API'sine istek
  try {
    let url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`;
    
    if (cuisine) {
      url += `&cuisineType=${encodeURIComponent(cuisine)}`;
    }
    
    const response = UrlFetchApp.fetch(url);
    const data = JSON.parse(response.getContentText());
    
    // Tarifleri dönüştürme ve çevirme
    const recipes = data.hits.map(hit => {
      const recipe = hit.recipe;
      return {
        title: translateText(recipe.label, 'tr'),
        description: translateText(recipe.summary || '', 'tr'),
        ingredients: recipe.ingredientLines.map(line => translateText(line, 'tr')),
        instructions: translateText(recipe.instructions || '', 'tr'),
        image: recipe.image,
        source: recipe.url,
        cuisine: recipe.cuisineType ? recipe.cuisineType[0] : '',
        preparationTime: Math.round(recipe.totalTime / 2),
        cookingTime: Math.round(recipe.totalTime / 2)
      };
    });
    
    return recipes;
  } catch (error) {
    Logger.log('Tarif arama hatası: ' + error);
    return [];
  }
}

// Metni çevir
function translateText(text, targetLang) {
  if (!text) return '';
  
  try {
    // Google Apps Script'in LanguageApp servisi ile çeviri
    return LanguageApp.translate(text, '', targetLang);
  } catch (error) {
    Logger.log('Çeviri hatası: ' + error);
    return text;
  }
}

// Dünya mutfağı listesi getir
function getWorldCuisines() {
  return [
    {id: 'turkish', name: 'Türk Mutfağı'},
    {id: 'italian', name: 'İtalyan Mutfağı'},
    {id: 'chinese', name: 'Çin Mutfağı'},
    {id: 'mexican', name: 'Meksika Mutfağı'},
    {id: 'indian', name: 'Hint Mutfağı'},
    {id: 'japanese', name: 'Japon Mutfağı'},
    {id: 'thai', name: 'Tayland Mutfağı'},
    {id: 'french', name: 'Fransız Mutfağı'},
    {id: 'greek', name: 'Yunan Mutfağı'},
    {id: 'spanish', name: 'İspanyol Mutfağı'},
    {id: 'lebanese', name: 'Lübnan Mutfağı'},
    {id: 'moroccan', name: 'Fas Mutfağı'}
  ];
}

// En popüler sunumları getir
function getPopularPresentations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PopularPresentations');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const presentations = [];
  
  for(let i = 1; i < data.length; i++) {
    const presentation = {};
    for(let j = 0; j < headers.length; j++) {
      presentation[headers[j]] = data[i][j];
    }
    presentations.push(presentation);
  }
  
  return presentations;
}

// Tarif kaydet
function saveRecipe(recipe) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Recipes');
  const row = [
    recipe.title,
    recipe.description || '',
    recipe.preparationTime || 0,
    recipe.cookingTime || 0,
    recipe.difficulty || 'General',
    recipe.servings || 4,
    recipe.imageUrl || '',
    recipe.source || '',
    recipe.cuisine || '',
    new Date()
  ];
  
  sheet.appendRow(row);
  const id = sheet.getLastRow() - 1;
  
  // Malzemeleri kaydet
  if (recipe.ingredients && recipe.ingredients.length) {
    saveIngredients(id, recipe.ingredients);
  }
  
  // Adımları kaydet
  if (recipe.steps && recipe.steps.length) {
    saveSteps(id, recipe.steps);
  }
  
  return id;
}

// Malzemeleri kaydet
function saveIngredients(recipeId, ingredients) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ingredients');
  
  ingredients.forEach(ingredient => {
    const row = [
      recipeId,
      ingredient.name,
      ingredient.amount || '',
      ingredient.unit || '',
      ingredient.isOptional ? 'true' : 'false'
    ];
    
    sheet.appendRow(row);
  });
}

// Adımları kaydet
function saveSteps(recipeId, steps) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Steps');
  
  steps.forEach((step, index) => {
    const row = [
      recipeId,
      index + 1,
      step
    ];
    
    sheet.appendRow(row);
  });
}
