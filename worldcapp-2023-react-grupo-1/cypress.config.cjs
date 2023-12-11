const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.

    baseUrl: 'http://localhost:5173/',
    // estamos filtrando los ejemplos que trae Cypress
    //excludeSpecPattern: ['**/examples/**', '**/todoList/**'],
    specPattern: 'cypress/e2e/**'
  }
})