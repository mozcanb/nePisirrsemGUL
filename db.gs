
/**
 * Ne Pişirsem - Veritabanı Servisi
 */

// Google Sheets'i veri deposu olarak kullan
function getSheet(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

// Tarif verilerini getir
function getRecipes() {
  const sheet = getSheet('Recipes');
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

// Yeni bir tarif kaydet
function saveRecipe(recipe) {
  const sheet = getSheet('Recipes');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const rowData = headers.map(header => {
    return recipe[header] || '';
  });
  
  sheet.appendRow(rowData);
  return recipe;
}

// Malzeme listesini getir
function getIngredients() {
  const sheet = getSheet('Ingredients');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const ingredients = [];
  
  for(let i = 1; i < data.length; i++) {
    const ingredient = {};
    for(let j = 0; j < headers.length; j++) {
      ingredient[headers[j]] = data[i][j];
    }
    ingredients.push(ingredient);
  }
  
  return ingredients;
}

// Yemek planlarını getir
function getMealPlans() {
  const sheet = getSheet('MealPlans');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const mealPlans = [];
  
  for(let i = 1; i < data.length; i++) {
    const mealPlan = {};
    for(let j = 0; j < headers.length; j++) {
      mealPlan[headers[j]] = data[i][j];
    }
    mealPlans.push(mealPlan);
  }
  
  return mealPlans;
}

// Yemek planı kaydet
function saveMealPlan(mealPlan) {
  const sheet = getSheet('MealPlans');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const rowData = headers.map(header => {
    return mealPlan[header] || '';
  });
  
  sheet.appendRow(rowData);
  return mealPlan;
}

// Yemek planı sil
function deleteMealPlan(id) {
  const sheet = getSheet('MealPlans');
  const data = sheet.getDataRange().getValues();
  const idColumn = data[0].indexOf('id');
  
  if (idColumn === -1) return false;
  
  for(let i = 1; i < data.length; i++) {
    if (data[i][idColumn] == id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  
  return false;
}

// Alışveriş listesi öğelerini getir
function getShoppingListItems() {
  const sheet = getSheet('ShoppingList');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const items = [];
  
  for(let i = 1; i < data.length; i++) {
    const item = {};
    for(let j = 0; j < headers.length; j++) {
      item[headers[j]] = data[i][j];
    }
    items.push(item);
  }
  
  return items;
}

// Alışveriş listesine öğe ekle
function addShoppingListItem(item) {
  const sheet = getSheet('ShoppingList');
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  const rowData = headers.map(header => {
    return item[header] || '';
  });
  
  sheet.appendRow(rowData);
  return item;
}

// Alışveriş listesi öğesini güncelle
function updateShoppingListItem(id, checked) {
  const sheet = getSheet('ShoppingList');
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idColumn = headers.indexOf('id');
  const checkedColumn = headers.indexOf('checked');
  
  if (idColumn === -1 || checkedColumn === -1) return null;
  
  for(let i = 1; i < data.length; i++) {
    if (data[i][idColumn] == id) {
      sheet.getRange(i + 1, checkedColumn + 1).setValue(checked);
      
      const item = {};
      for(let j = 0; j < headers.length; j++) {
        item[headers[j]] = j === checkedColumn ? checked : data[i][j];
      }
      return item;
    }
  }
  
  return null;
}

// Çeviri fonksiyonu (AI service için gerekli)
function translateText(text, targetLang) {
  try {
    // LanguageApp kullanarak çeviri yapabilirsiniz (Google Apps Script tarafından sağlanır)
    // Örnek: return LanguageApp.translate(text, 'en', targetLang);
    
    // Basit İngilizce-Türkçe çeviri sözlüğü
    const translations = {
      'recipe': 'tarif',
      'ingredient': 'malzeme',
      'cooking': 'pişirme',
      'baking': 'fırınlama',
      'roasting': 'kızartma',
      'boiling': 'haşlama',
      'meal': 'yemek',
      'dinner': 'akşam yemeği',
      'lunch': 'öğle yemeği',
      'breakfast': 'kahvaltı',
      'delicious': 'lezzetli',
      'tasty': 'lezzetli',
      'spicy': 'baharatlı',
      'sweet': 'tatlı',
      'sour': 'ekşi',
      'salty': 'tuzlu',
      'traditional': 'geleneksel',
      'easy': 'kolay',
      'medium': 'orta',
      'hard': 'zor',
    };

    if (targetLang === 'tr') {
      // Basit kelime değişimi
      let translatedText = text;
      Object.entries(translations).forEach(([eng, tr]) => {
        const regex = new RegExp('\\b' + eng + '\\b', 'gi');
        translatedText = translatedText.replace(regex, tr);
      });

      return translatedText;
    }

    return text;
  } catch (error) {
    Logger.log('Çeviri hatası: ' + error);
    return text;
  }
}
