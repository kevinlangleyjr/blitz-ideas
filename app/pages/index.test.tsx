import { render } from 'test/utils';

import Home from './index';
import useIdeas from 'app/ideas/hooks/useIdeas';

jest.mock( 'app/ideas/hooks/useIdeas' );
const mockUseIdeas = useIdeas as jest.MockedFunction<typeof useIdeas>;

test( 'renders blitz documentation link', () => {
  // This is an example of how to ensure a specific item is in the document
  // But it's disabled by default (by test.skip) so the test doesn't fail
  // when you remove the the default content from the page

  // This is an example on how to mock api hooks when testing
  mockUseIdeas.mockReturnValue( [
    {
      ideas: [],
      hasMore: false,
      nextPage: { take: 1, skip: 0 },
      count: 0
    },
    {}
  ] );

  const { getByText } = render( <Home /> );
  const linkElement = getByText( /Create Idea/i );
  expect( linkElement ).toBeInTheDocument();
} );
