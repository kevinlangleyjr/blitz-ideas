import { render } from 'test/utils';

import Home from './index';
import useIdeas from 'app/ideas/hooks/useIdeas';

jest.mock( 'app/ideas/hooks/useIdeas' );
const mockUseIdeas = useIdeas as jest.MockedFunction<typeof useIdeas>;

test.skip( 'renders blitz documentation link', () => {
  mockUseIdeas.mockReturnValue( {
    ideas: [],
    hasMore: false,
  } );

  const { getByText } = render( <Home /> );
  const linkElement = getByText( /Create Idea/i );
  expect( linkElement ).toBeInTheDocument();
} );
