/// <reference types="cypress" />





const { slowCypressDown } = require("cypress-slow-down")
const { getByDataTestId } = require("../../utils")

slowCypressDown(100)


describe('Test Selecciones', () => {
    beforeEach(() => {
      cy.visit('selecciones')
    })

    const seleccion = {newPais: 'AFG', pais: 'KOR', confed: 'AFC', copas: 9, selector: '[data-testid="seleccion"]'}

    const inputPais = 'input[name="pais"]'
    const selectConfed = 'select[name="confederacion"]'
    const inputCopas = 'input[name="copasDelMundo"]'
    const saveBtn = 'button:contains("Guardar")'
    const modifyBtn = '[data-testid="modify-btn"]'

    const editBtn = '.btn-edit'
    const removeBtn = '.btn-remove'

    it('Agrego Seleccion', () =>{
        getByDataTestId('boton-agregar').click()
        cy.get(inputPais).type(seleccion.pais)
        cy.get(selectConfed).select(seleccion.confed)
        cy.get(inputCopas).type(seleccion.copas)
        cy.get(saveBtn).click()

        cy.contains(seleccion.selector, seleccion.pais).should('exist')
    })

    it('Edito Seleccion', () => {
        cy.contains(seleccion.selector, seleccion.pais).as('seleccion')

        cy.get('@seleccion').find(modifyBtn).click()
        cy.get('@seleccion').find(editBtn).click()
        cy.get(inputPais).clear()
        cy.get(inputPais).type(seleccion.newPais)
        cy.get(saveBtn).click()

        cy.contains(seleccion.selector, seleccion.pais).should('not.exist')
        cy.contains(seleccion.selector, seleccion.newPais).should('exist')
    })

    it('Elimino Seleccion', () => {
        cy.contains(seleccion.selector, seleccion.newPais).as('seleccion')

        cy.get('@seleccion').find(modifyBtn).click()
        cy.get('@seleccion').find(removeBtn).click()

        cy.contains(seleccion.selector, seleccion.newPais).should('not.exist')
    })
})