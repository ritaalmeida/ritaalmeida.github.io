import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchList, SearchListProps } from './SearchList';
import { pokemons } from '../../__mocks__/pokemonsList';

describe('SearchList', () => {
  let props: SearchListProps;

  beforeEach(() => {
    props = {
      searchText: '',
      setSearchText: jest.fn(),
      handleSelectPokemon: jest.fn(),
    };
  });

  it('should render the component', () => {
    const { container } = render(<SearchList {...props} />);
    expect(container).toMatchSnapshot();
  });

  describe('when the input value changes', () => {
    it('should call setSearchText', () => {
      render(<SearchList {...props} />);

      userEvent.type(screen.getByRole('textbox'), 'test');

      expect(props.setSearchText).toHaveBeenCalled();
    });
  });

  describe('when there are options to list', () => {
    beforeEach(() => {
      props = {
        ...props,
        pokemons,
      };
    });

    it('should render with list', () => {
      const { container } = render(<SearchList {...props} />);
      expect(container).toMatchSnapshot();
    });

    describe('when the user clicks on a option', () => {
      it('should call handleSelectPokemon', () => {
        render(<SearchList {...props} />);

        userEvent.click(screen.getAllByRole('menuitem')[0]);

        expect(props.handleSelectPokemon).toHaveBeenCalledWith(pokemons[0].id);
      });
    });
  });
});
