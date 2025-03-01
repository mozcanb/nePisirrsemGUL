
/**
 * Ne Pişirsem - Veri Saklama Servisi
 * 
 * Bu dosya, Google Sheets üzerinde veri saklama işlemlerini yönetir.
 */

// Sheet referanslarını al
function getSheetByName(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

// Başlık satırlarını al
function getHeaderRow(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

// ID bazlı veri getir
function getDataById(sheetName, id) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) return null;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == id) {
      const item = {};
      for (let j = 0; j < headers.length; j++) {
        item[headers[j]] = data[i][j];
      }
      return item;
    }
  }
  
  return null;
}

// Tüm verileri al
function getAllData(sheetName) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const items = [];
  
  for (let i = 1; i < data.length; i++) {
    const item = {};
    for (let j = 0; j < headers.length; j++) {
      item[headers[j]] = data[i][j];
    }
    items.push(item);
  }
  
  return items;
}

// Veri ekle
function insertData(sheetName, data) {
  const sheet = getSheetByName(sheetName);
  const headers = getHeaderRow(sheet);
  
  // ID oluştur
  const id = sheet.getLastRow();
  data.id = id;
  
  const rowData = headers.map(header => data[header] || '');
  sheet.appendRow(rowData);
  
  return data;
}

// Veri güncelle
function updateData(sheetName, id, data) {
  const sheet = getSheetByName(sheetName);
  const sheetData = sheet.getDataRange().getValues();
  const headers = sheetData[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) return null;
  
  for (let i = 1; i < sheetData.length; i++) {
    if (sheetData[i][idIndex] == id) {
      const rowData = [];
      for (let j = 0; j < headers.length; j++) {
        const field = headers[j];
        rowData.push(data[field] !== undefined ? data[field] : sheetData[i][j]);
      }
      sheet.getRange(i + 1, 1, 1, headers.length).setValues([rowData]);
      
      const updatedItem = {};
      for (let j = 0; j < headers.length; j++) {
        updatedItem[headers[j]] = rowData[j];
      }
      return updatedItem;
    }
  }
  
  return null;
}

// Veri sil
function deleteData(sheetName, id) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const idIndex = headers.indexOf('id');
  
  if (idIndex === -1) return false;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  
  return false;
}

// İlişkili verileri getir
function getRelatedData(sheetName, relatedField, relatedValue) {
  const sheet = getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const relatedIndex = headers.indexOf(relatedField);
  const items = [];
  
  if (relatedIndex === -1) return items;
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][relatedIndex] == relatedValue) {
      const item = {};
      for (let j = 0; j < headers.length; j++) {
        item[headers[j]] = data[i][j];
      }
      items.push(item);
    }
  }
  
  return items;
}

// Bu fonksiyonları dışa açmak için bir API sağlayalım
function getRecipeFromStorage(id) {
  return getDataById('Recipes', id);
}

function getAllRecipesFromStorage() {
  return getAllData('Recipes');
}

function saveRecipeToStorage(recipe) {
  return insertData('Recipes', recipe);
}

function updateRecipeInStorage(id, recipe) {
  return updateData('Recipes', id, recipe);
}

function deleteRecipeFromStorage(id) {
  return deleteData('Recipes', id);
}
