
/**
 * Ne Pişirsem - AI Servisi
 */

// Yapay zeka tarif önerileri üretir
function generateRecipeIdeas(prompt) {
  try {
    // Basit kelime bazlı öneri sistemi
    const keywords = prompt.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    
    const ideas = [];
    
    // Temel malzeme kombinasyonları
    const baseRecipes = [
      "Domatesli Makarna",
      "Mantarlı Risotto",
      "Patatesli Köfte",
      "Sebzeli Güveç",
      "Baharatlı Tavuk",
      "Peynirli Börek",
      "Zeytinyağlı Dolma",
      "Mercimek Köftesi",
      "Kabak Mücver",
      "Patlıcanlı Musakka",
      "Ispanaklı Börek",
      "Havuçlu Kek",
      "Elmali Turta",
      "Fırında Balık",
      "Mantı",
    ];
    
    // Anahtar kelime eşleştirmesi
    for (const recipe of baseRecipes) {
      const recipeLower = recipe.toLowerCase();
      if (keywords.some(word => recipeLower.includes(word))) {
        ideas.push(recipe);
      }
    }
    
    // Eğer hiç eşleşme yoksa, rastgele 3 fikir öner
    if (ideas.length === 0) {
      const shuffled = baseRecipes.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }
    
    return ideas;
  } catch (error) {
    Logger.log("AI servis hatası: " + error);
    return ["Basit Makarna", "Omlet", "Peynirli Tost"];
  }
}

// Malzemelerden tarif üretir
function generateRecipeFromIngredients(ingredients) {
  try {
    const ingredientList = ingredients.join(", ");
    
    // Basit yapay zeka taklidi
    const firstIngredient = ingredients[0]?.toLowerCase() || "malzeme";
    const secondIngredient = ingredients[1]?.toLowerCase() || "";
    
    // Temel tarifler
    const recipes = {
      "domates": {
        title: "Domatesli Makarna",
        description: "Sulu domatesli makarna sosu",
        preparationTime: 10,
        cookingTime: 20,
        difficulty: "Simple",
        servings: 4
      },
      "patates": {
        title: "Fırında Patates",
        description: "Baharatlı fırın patates",
        preparationTime: 15,
        cookingTime: 45,
        difficulty: "Simple",
        servings: 4
      },
      "tavuk": {
        title: "Fırın Tavuk",
        description: "Baharatlı fırın tavuk",
        preparationTime: 20,
        cookingTime: 50,
        difficulty: "General",
        servings: 4
      },
      "pirinç": {
        title: "Sebzeli Pilav",
        description: "Karışık sebzeli pilav",
        preparationTime: 15,
        cookingTime: 30,
        difficulty: "Simple",
        servings: 6
      }
    };
    
    // İlk malzemeye dayalı tarif ya da varsayılan
    return recipes[firstIngredient] || {
      title: firstIngredient.charAt(0).toUpperCase() + firstIngredient.slice(1) + (secondIngredient ? " ve " + secondIngredient : "") + " tarifi",
      description: ingredientList + " ile hazırlanan lezzetli bir tarif",
      preparationTime: 15,
      cookingTime: 30,
      difficulty: "General",
      servings: 4
    };
  } catch (error) {
    Logger.log("AI tarif oluşturma hatası: " + error);
    return {
      title: "Basit Yemek Tarifi",
      description: "Malzemelerinizle hazırlayabileceğiniz basit bir tarif",
      preparationTime: 15,
      cookingTime: 30
    };
  }
}

// Web'den tarif ara ve Türkçe'ye çevir
function searchWebRecipes(query, cuisine) {
  try {
    // Google Apps Script'in UrlFetchApp servisi ile API isteği
    Logger.log("Arama yapılıyor: " + query + ", mutfak: " + (cuisine || 'herhangi'));
    
    // Örnek API URL'i (kendi API'niz ile değiştirin)
    // const apiUrl = `https://api.example.com/recipes?q=${encodeURIComponent(query)}&cuisine=${encodeURIComponent(cuisine || '')}`;
    // const response = UrlFetchApp.fetch(apiUrl);
    // const results = JSON.parse(response.getContentText());
    
    // Çevrimiçi arama sonuçları simülasyonu
    const results = [
      {
        title: query + " Recipe",
        description: "A delicious recipe with " + query,
        ingredients: ["ingredient 1", "ingredient 2", "ingredient 3"],
        instructions: "Mix all ingredients. Cook for 30 minutes.",
        image: "https://via.placeholder.com/300x200?text=Recipe+Image",
        source: "https://example.com/recipe1",
        preparationTime: 15,
        cookingTime: 30,
        difficulty: "medium",
        servings: 4,
        cuisine: cuisine || ""
      },
      {
        title: "Easy " + query + " Meal",
        description: "Quick and easy " + query + " for busy days",
        ingredients: ["ingredient A", "ingredient B", "ingredient C"],
        instructions: "Chop everything. Sauté for 10 minutes. Serve hot.",
        image: "https://via.placeholder.com/300x200?text=Easy+Recipe",
        source: "https://example.com/recipe2",
        preparationTime: 10,
        cookingTime: 15,
        difficulty: "easy",
        servings: 2,
        cuisine: cuisine || ""
      },
      {
        title: "Traditional " + query,
        description: "Authentic " + query + " from traditional cuisine",
        ingredients: ["traditional ingredient 1", "traditional ingredient 2"],
        instructions: "Follow traditional methods to prepare this dish.",
        image: "https://via.placeholder.com/300x200?text=Traditional+Recipe",
        source: "https://example.com/recipe3",
        preparationTime: 30,
        cookingTime: 60,
        difficulty: "hard",
        servings: 6,
        cuisine: cuisine || ""
      }
    ];
    
    // Sonuçları Türkçe'ye çevir
    const translatedResults = results.map(recipe => {
      return {
        title: translateText(recipe.title, 'tr'),
        description: translateText(recipe.description, 'tr'),
        ingredients: recipe.ingredients.map(ing => translateText(ing, 'tr')),
        instructions: translateText(recipe.instructions, 'tr'),
        image: recipe.image,
        source: recipe.source,
        preparationTime: recipe.preparationTime,
        cookingTime: recipe.cookingTime,
        difficulty: recipe.difficulty,
        servings: recipe.servings,
        cuisine: recipe.cuisine
      };
    });
    
    return translatedResults;
  } catch (error) {
    Logger.log("Web tarif arama hatası: " + error);
    return [{
      title: query + " Tarifi",
      description: "Tarif bulunamadı",
      preparationTime: 0,
      cookingTime: 0
    }];
  }
}

// Alternatif tarifler öner
function suggestAlternativeRecipes(recipeId) {
  try {
    // Burada benzer tarifleri bulmak için bir algoritma olacak
    // Şimdilik örnek veri döndürelim
    return [
      {
        id: 101,
        title: "Alternatif Tarif 1",
        description: "Benzer malzemelerle yapılan farklı bir tarif",
        preparationTime: 15,
        cookingTime: 25
      },
      {
        id: 102,
        title: "Alternatif Tarif 2",
        description: "Benzer lezzet profiline sahip farklı bir yemek",
        preparationTime: 20,
        cookingTime: 30
      }
    ];
  } catch (error) {
    Logger.log("Alternatif tarif önerme hatası: " + error);
    return [];
  }
}
