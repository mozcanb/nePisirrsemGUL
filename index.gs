/**
 * Ne Pişirsem - Ana Dosya
 * 
 * Bu dosya, Google Apps Script web uygulamasının ana giriş noktasıdır.
 * doGet fonksiyonu, kullanıcı web uygulamasını ziyaret ettiğinde çalışır.
 */

function doGet(e) {
  // Google Apps Script'e özgü XFrameOptionsMode.ALLOWALL kullanarak iframe içinde çalışmasını sağla
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Ne Pişirsem?')
    .setFaviconUrl('https://www.gstatic.com/docs/doclist/images/icon_recipe_spreadsheet_16.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * HTML dosyalarını içe aktarma
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Trend tarifleri getir
 */
function getTrendingRecipes() {
  // Örnek veriler
  return [
    {
      id: 1,
      title: "Köfte",
      description: "Klasik Türk köftesi",
      preparationTime: 20,
      cookingTime: 15,
      difficulty: "Kolay",
      servings: 4,
      imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      title: "Mercimek Çorbası",
      description: "Besleyici kırmızı mercimek çorbası",
      preparationTime: 10,
      cookingTime: 30,
      difficulty: "Kolay",
      servings: 6,
      imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      title: "Tavuklu Makarna",
      description: "Kremalı soslu tavuklu makarna",
      preparationTime: 15,
      cookingTime: 20,
      difficulty: "Orta",
      servings: 4,
      imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ];
}

function loadPage(page) {
  showLoader();

  try {
    // Önce navbar'ı kapatma (mobil görünüm için)
    var navbarCollapse = document.querySelector('.navbar-collapse.show');
    if (navbarCollapse) {
      var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }

    // Sayfa içeriğini yükle
    switch(page) {
      case 'home':
        loadHomePage();
        break;
      case 'tarifler':
        loadTariflerPage();
        break;
      case 'dunyaMutfagi':
        loadDunyaMutfagiPage();
        break;
      case 'nePisireyim':
        loadNePisireyimPage();
        break;
      case 'yemekPlani':
        loadYemekPlaniPage();
        break;
      case 'ozelSunumlar':
        loadOzelSunumlarPage();
        break;
      default:
        loadHomePage();
    }

    // Sayfayı en üste kaydır
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Sayfa yükleme hatası:', error);
    hideLoader();
    document.getElementById('mainContent').innerHTML = '<div class="alert alert-danger">Sayfa yüklenirken bir hata oluştu: ' + error.message + '</div>';
  }
}

/**
 * Yemek planları getir
 */
function getMealPlans() {
  // Örnek veri - boş array
  return [];
}

/**
 * Tarif detayları getir
 */
function getRecipeDetails(recipeId) {
  // Örnek veri
  return {
    id: recipeId,
    title: "Örnek Tarif",
    description: "Bu bir örnek tariftir.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    preparationTime: 15,
    cookingTime: 30,
    difficulty: "Orta",
    servings: 4,
    ingredients: [
      { name: "Un", amount: "2", unit: "su bardağı" },
      { name: "Şeker", amount: "1", unit: "su bardağı" },
      { name: "Yumurta", amount: "3", unit: "adet" },
      { name: "Kabartma Tozu", amount: "1", unit: "paket" },
      { name: "Vanilya", amount: "1", unit: "paket" }
    ],
    steps: [
      "Tüm kuru malzemeleri bir kapta karıştırın.",
      "Yumurtaları ekleyip iyice çırpın.",
      "175 derece fırında 30 dakika pişirin."
    ]
  };
}

/**
 * Arama trendlerini getir
 */
function getSearchTrends() {
  // Örnek veriler
  return [
    "Izgara tavuk",
    "Cheesecake",
    "Ev yapımı pizza",
    "Mercimek çorbası",
    "Brownie",
    "Köfte",
    "Sütlaç",
    "Sebzeli makarna"
  ];
}

/**
 * Dünya mutfakları listesi getir
 */
function getWorldCuisines() {
  // Örnek veriler
  return [
    {id: 'turkish', name: 'Türk Mutfağı'},
    {id: 'italian', name: 'İtalyan Mutfağı'},
    {id: 'chinese', name: 'Çin Mutfağı'},
    {id: 'mexican', name: 'Meksika Mutfağı'},
    {id: 'indian', name: 'Hint Mutfağı'},
    {id: 'japanese', name: 'Japon Mutfağı'},
    {id: 'thai', name: 'Tayland Mutfağı'},
    {id: 'french', name: 'Fransız Mutfağı'}
  ];
}

/**
 * Popüler sunumları getir
 */
function getPopularPresentations() {
  // Örnek veriler
  return [
    {
      id: 1,
      title: "Restoran Kalitesinde Sunum",
      description: "Evinizde kolayca restoran kalitesinde sunumlar yapmanın incelikleri",
      imageUrl: "https://images.unsplash.com/photo-1532597540419-b176991847e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 120,
      comments: 15
    },
    {
      id: 2,
      title: "Misafir Sofraları",
      description: "Misafirlerinizi etkileyecek sofra düzenleme taktikleri",
      imageUrl: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 95,
      comments: 12
    }
  ];
}

/**
 * Web'den tarif ara
 */
function searchRecipesFromWeb(query, cuisine) {
  // Örnek veriler
  return [
    {
      id: 1,
      title: `${query || 'Önerilen'} Tarifi`,
      description: cuisine ? `${cuisine} mutfağından özel tarif` : 'Özel tarif',
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      preparationTime: 15,
      cookingTime: 30,
      servings: 4,
      ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3"],
      instructions: "Adım 1...\nAdım 2...\nAdım 3...",
      source: "https://example.com/recipes/1"
    },
    {
      id: 2,
      title: `${query ? query + ' Alternatif' : 'Önerilen'} Tarifi`,
      description: cuisine ? `${cuisine} mutfağından alternatif tarif` : 'Alternatif tarif',
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      preparationTime: 20,
      cookingTime: 25,
      servings: 3,
      ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3", "Malzeme 4"],
      instructions: "Adım 1...\nAdım 2...\nAdım 3...",
      source: "https://example.com/recipes/2"
    }
  ];
}

/**
 * Yemek planı kaydet
 */
function saveMealPlan(plan) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  // ID oluştur
  const id = Utilities.getUuid();
  
  const row = [
    id,
    new Date(plan.date),
    plan.recipeId,
    plan.mealType,
    plan.notes || '',
    plan.servingSize || 1
  ];
  
  sheet.appendRow(row);
  return true;
}


/**
 * Yemek planlarını getir
 */
function getMealPlans() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  const data = sheet.getDataRange().getValues();
  const headers = ['id', 'date', 'recipeId', 'mealType', 'notes', 'servingSize'];
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

/**
 * Yemek planını sil
 */
function deleteMealPlan(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('MealPlans');
  const data = sheet.getDataRange().getValues();
  
  for(let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1); // +1 çünkü header satırı var
      return true;
    }
  }
  
  return false;
}

/**
 * Arama trendlerini getir
 */
function getSearchTrends() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('SearchTrends');
  const data = sheet.getDataRange().getValues();
  return data.slice(1).map(row => row[0]);
}

/**
 * Dünya mutfakları listesi getir
 */
function getWorldCuisines() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WorldCuisines');
  
  // Eğer tablo mevcutsa oradan veri çek
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const cuisines = [];
    
    for(let i = 1; i < data.length; i++) {
      cuisines.push({
        id: data[i][0],
        name: data[i][1]
      });
    }
    
    return cuisines;
  }
  
  // Tablo yoksa varsayılan verileri döndür
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

/**
 * Popüler sunumları getir
 */
function getPopularPresentations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PopularPresentations');
  
  // Eğer tablo mevcutsa oradan veri çek
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const presentations = [];
    
    for(let i = 1; i < data.length; i++) {
      presentations.push({
        id: i,
        title: data[i][0],
        description: data[i][1],
        imageUrl: data[i][2],
        likes: data[i][3] || 0,
        comments: data[i][4] || 0
      });
    }
    
    return presentations;
  }
  
  // Tablo yoksa örnek veriler döndür
  return [
    {
      id: 1,
      title: "Restoran Kalitesinde Sunum",
      description: "Evinizde kolayca restoran kalitesinde sunumlar yapmanın incelikleri",
      imageUrl: "https://via.placeholder.com/300x200?text=Sunum+Görseli",
      likes: 120,
      comments: 15
    },
    {
      id: 2,
      title: "Misafir Sofraları",
      description: "Misafirlerinizi etkileyecek sofra düzenleme taktikleri",
      imageUrl: "https://via.placeholder.com/300x200?text=Sunum+Görseli",
      likes: 95,
      comments: 12
    }
  ];
}

/**
 * Web'den tarif ara
 */
function searchRecipesFromWeb(query, cuisine) {
  // Burada gerçek bir API kullanılacak (örn. Edamam, Spoonacular)
  // Şimdilik örnek veri döndürelim
  return [
    {
      id: 1,
      title: `${query || 'Önerilen'} Tarifi`,
      description: cuisine ? `${cuisine} mutfağından özel tarif` : 'Özel tarif',
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      preparationTime: 15,
      cookingTime: 30,
      servings: 4,
      ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3"],
      instructions: "Adım 1...\nAdım 2...\nAdım 3...",
      source: "https://example.com/recipes/1"
    },
    {
      id: 2,
      title: `${query ? query + ' Alternatif' : 'Önerilen'} Tarifi`,
      description: cuisine ? `${cuisine} mutfağından alternatif tarif` : 'Alternatif tarif',
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      preparationTime: 20,
      cookingTime: 25,
      servings: 3,
      ingredients: ["Malzeme 1", "Malzeme 2", "Malzeme 3", "Malzeme 4"],
      instructions: "Adım 1...\nAdım 2...\nAdım 3...",
      source: "https://example.com/recipes/2"
    }
  ];
}

/**
 * Tarif detaylarını getir
 */
function getRecipeDetails(recipeId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Recipes');
  
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // RecipeId ile eşleşen satırı bul
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == recipeId) {
        const recipe = {};
        
        for (let j = 0; j < headers.length; j++) {
          recipe[headers[j]] = data[i][j];
        }
        
        // Malzemeleri ekle
        recipe.ingredients = getRecipeIngredients(recipeId);
        
        // Adımları ekle
        recipe.steps = getRecipeSteps(recipeId);
        
        return recipe;
      }
    }
  }
  
  // Eğer tarif bulunamazsa örnek veri döndür
  return {
    id: recipeId,
    title: 'Örnek Tarif',
    description: 'Bu bir örnek tariftir.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Tarif+Görseli',
    preparationTime: 15,
    cookingTime: 30,
    difficulty: 'Orta',
    servings: 4,
    ingredients: [
      { name: 'Un', amount: '2', unit: 'su bardağı', isOptional: false },
      { name: 'Şeker', amount: '1', unit: 'su bardağı', isOptional: false },
      { name: 'Yumurta', amount: '3', unit: 'adet', isOptional: false },
      { name: 'Kabartma Tozu', amount: '1', unit: 'paket', isOptional: false },
      { name: 'Vanilya', amount: '1', unit: 'paket', isOptional: false }
    ],
    steps: [
      'Tüm kuru malzemeleri bir kapta karıştırın.',
      'Yumurtaları ekleyip iyice çırpın.',
      '175 derece fırında 30 dakika pişirin.'
    ]
  };
}

/**
 * Tarif malzemelerini getir
 */
function getRecipeIngredients(recipeId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeIngredients');
  
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const ingredients = [];
    
    // Header satırını atla ve recipeId ile eşleşen tüm satırları bul
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == recipeId) {
        ingredients.push({
          name: data[i][1],
          amount: data[i][2],
          unit: data[i][3],
          isOptional: data[i][4] === true
        });
      }
    }
    
    return ingredients;
  }
  
  return [];
}

/**
 * Tarif adımlarını getir
 */
function getRecipeSteps(recipeId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeSteps');
  
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const steps = [];
    
    // Header satırını atla ve recipeId ile eşleşen tüm satırları bul
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] == recipeId) {
        // Adım sırasına göre sırala
        steps[data[i][1] - 1] = data[i][2];
      }
    }
    
    return steps;
  }
  
  return [];
}

/**
 * Tarif kaydet
 */
function saveRecipe(recipe) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Recipes');
  let recipeId;
  
  // Eğer tablo yoksa oluştur
  if (!sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.insertSheet('Recipes');
    const newSheet = ss.getSheetByName('Recipes');
    newSheet.appendRow([
      'id', 'title', 'description', 'preparationTime', 'cookingTime', 
      'difficulty', 'servings', 'imageUrl', 'source', 'cuisine'
    ]);
  }
  
  const recipesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Recipes');
  
  // Yeni ID oluştur
  recipeId = recipesSheet.getLastRow();
  
  // Tarifi kaydet
  recipesSheet.appendRow([
    recipeId,
    recipe.title,
    recipe.description || '',
    recipe.preparationTime || 0,
    recipe.cookingTime || 0,
    recipe.difficulty || 'General',
    recipe.servings || 4,
    recipe.imageUrl || '',
    recipe.source || '',
    recipe.cuisine || ''
  ]);
  
  // Malzemeleri kaydet
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    saveRecipeIngredients(recipeId, recipe.ingredients);
  }
  
  // Adımları kaydet
  if (recipe.steps && recipe.steps.length > 0) {
    saveRecipeSteps(recipeId, recipe.steps);
  }
  
  return recipeId;
}

/**
 * Tarif malzemelerini kaydet
 */
function saveRecipeIngredients(recipeId, ingredients) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeIngredients');
  
  // Eğer tablo yoksa oluştur
  if (!sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.insertSheet('RecipeIngredients');
    const newSheet = ss.getSheetByName('RecipeIngredients');
    newSheet.appendRow(['recipeId', 'name', 'amount', 'unit', 'isOptional']);
  }
  
  const ingredientsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeIngredients');
  
  // Malzemeleri kaydet
  ingredients.forEach(ingredient => {
    ingredientsSheet.appendRow([
      recipeId,
      ingredient.name,
      ingredient.amount || '',
      ingredient.unit || '',
      ingredient.isOptional === true
    ]);
  });
}

/**
 * Tarif adımlarını kaydet
 */
function saveRecipeSteps(recipeId, steps) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeSteps');
  
  // Eğer tablo yoksa oluştur
  if (!sheet) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ss.insertSheet('RecipeSteps');
    const newSheet = ss.getSheetByName('RecipeSteps');
    newSheet.appendRow(['recipeId', 'stepNumber', 'instruction']);
  }
  
  const stepsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RecipeSteps');
  
  // Adımları kaydet
  if (Array.isArray(steps)) {
    steps.forEach((step, index) => {
      stepsSheet.appendRow([
        recipeId,
        index + 1,
        step
      ]);
    });
  } else {
    // Eğer steps bir dizi değilse, tek bir adım olarak kabul et
    stepsSheet.appendRow([
      recipeId,
      1,
      steps
    ]);
  }
}
