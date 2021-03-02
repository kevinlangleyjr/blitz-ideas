import { useQuery } from 'blitz';
import getIdea from 'app/ideas/queries/getIdea';

const useIdea = ( ideaId ) => {
  const [ idea ] = useQuery( getIdea, { id: ideaId } );
  return idea;
};

export default useIdea;
