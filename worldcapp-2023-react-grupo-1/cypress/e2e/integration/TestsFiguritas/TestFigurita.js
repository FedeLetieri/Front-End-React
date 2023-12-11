/// <reference types="cypress" />





const { slowCypressDown } = require("cypress-slow-down")
const { getByDataTestId } = require("../../utils")

slowCypressDown(100)


describe('Pagina Figuritas Funcionalidades', () => {
    beforeEach(() => {
      cy.visit('figuritas')
      
    })
    //Datos
    const numeroJugador = 13
    const nombreJugador = 'Hugo Lloris'
    const nivelImpresion = 'ALTA'

    //Botones
    const inputNumero = 'input[name="numero"]'
    const checkBoxOnFire = 'input[name="onFire"]'
    const selectNivelImpresion = 'select[name="nivelImpresion"]'
    const botonGuardar = 'button:contains("Guardar")'
    const buscador = 'input[placeholder="Buscar"]'

    const botonDespliegue = '.modify__btn'

      describe("Agregar Figurita", function(){
  
      

      it("Procedimiento completo para agregar una figurita funciona",function(){
          getByDataTestId('boton-agregar').click()
          cy.get(inputNumero).type(numeroJugador)
          cy.get('select[name="idJugador"]').select(nombreJugador)
          cy.get(checkBoxOnFire).check()
          cy.get(selectNivelImpresion).select(nivelImpresion)
          cy.get(botonGuardar).click()
  
      
      })  
  
  }) 

  describe("Editar Figurita", function(){
    
    const NuevoNivelDeImpresion = 'MEDIA'

    it("Procedimiento completo para editar una figurita funciona",function(){
        cy.get(buscador).type(numeroJugador)
        cy.get(botonDespliegue).click()
        getByDataTestId("edit").click()
        cy.get(inputNumero).should('have.value', numeroJugador)
        cy.get(checkBoxOnFire).should('be.checked')

        cy.get(checkBoxOnFire).uncheck()
        cy.get(selectNivelImpresion).select(NuevoNivelDeImpresion)
        cy.get(botonGuardar).click()
        cy.get(buscador).type(numeroJugador)
        getByDataTestId("On Fire").should('have.class', 'notOnfire')

    })  

}) 

    describe("Eliminar Figurita", function(){
    

    it("Procedimiento completo para eliminar una figurita funciona",function(){
        cy.get(buscador).type(numeroJugador)
        cy.get(botonDespliegue).click()
        getByDataTestId("remove").click()
        cy.get(buscador).clear().type(numeroJugador)
        cy.get('.no-elements-message-p').should('exist')

    })  

}) 

})