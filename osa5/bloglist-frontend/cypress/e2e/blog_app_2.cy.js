describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })
  it('front page can be opened', function() {
    cy.contains('Log in')
    //cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('niknor')
      cy.get('input:last').type('salasana')
      cy.contains('login').click()
    })
 
    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input:first').type('Tomi testaa!')
      cy.get('input').eq(1).type('Testi Timppa')
      cy.get('input:last').type('www.testitimppa.fi')
      cy.contains('save').click()
      cy.contains('a new blog')
    })
  })
})