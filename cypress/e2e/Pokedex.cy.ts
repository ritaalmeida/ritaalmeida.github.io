describe('Pokedex', () => {
  let nextPokemon: string;
  let previousPokemon: string;

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('search for a pokemon', () => {
    cy.get('input').click();
    cy.get('input').type('char');
    cy.get('input').should('have.value', 'char');
    cy.get('li > div').should('have.length', 7);
  });

  it('choose a pokemon to show', () => {
    cy.get('input').click();
    cy.get('input').type('char');
    cy.get('input').should('have.value', 'char');
    cy.get('li:nth-of-type(1) > div').click();
    cy.get('button > img').should('have.length', 3);
  });

  it('shows next pokemon', () => {
    cy.get('input').click();
    cy.get('input').type('char');
    cy.get('input').should('have.value', 'char');
    cy.get('li:nth-of-type(1) > div').click();

    cy.get('button:nth-of-type(3) span').then(($nextValue) => {
      [, nextPokemon] = $nextValue.text().split('#');
      cy.get('button:nth-of-type(3) > img').click();

      cy.get('button.enlarge div.title > span').should(
        'have.text',
        `#${nextPokemon}`,
      );

      cy.get('button:nth-of-type(3) span').should(
        'have.text',
        `#${Number(nextPokemon) + 1}`,
      );
    });
  });

  it('shows previous pokemon', () => {
    cy.get('input').click();
    cy.get('input').type('char');
    cy.get('input').should('have.value', 'char');
    cy.get('li:nth-of-type(1) > div').click();

    cy.get('button:nth-of-type(1) span').then(($previousValue) => {
      [, previousPokemon] = $previousValue.text().split('#');
      cy.get('button:nth-of-type(1) > img').click();

      cy.get('button.enlarge div.title > span').should(
        'have.text',
        `#${previousPokemon}`,
      );

      cy.get('button:nth-of-type(1) span').should(
        'have.text',
        `#${Number(previousPokemon) - 1}`,
      );
    });
  });
});
