import { useState } from 'react';
import { useMutation, usePaginatedQuery, useParam } from 'blitz';
import getComments from '../queries/getComments';
import createComment from '../mutations/createComment';
import { CommentForm, FORM_ERROR } from 'app/comments/components/CommentForm';
import { CreateComment } from '../validations';

const ITEMS_PER_PAGE = 10;

export const IdeaCommentsList = () => {
  const [ createCommentMutation ] = useMutation( createComment );
  const ideaId = useParam( 'ideaId', 'number' );
  const [ page, setPage ] = useState<number>( 0 );
  const [ { comments, hasMore }, { refetch } ] = usePaginatedQuery( getComments, {
    where: {
        ideaId,
    },
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  } );

  const goToPreviousPage = () => setPage( page - 1 );
  const goToNextPage = () => setPage( page + 1 );

  if ( ! ideaId ) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <CommentForm
        submitText="Post Comment"
        schema={ CreateComment }
        initialValues={ {
          body: '',
        } }
        onSubmit={ async ( values, form ) => {
          try {
            await createCommentMutation( {
              ...values,
              ideaId,
            } );

            refetch();
            setTimeout( () => {
              form.reset();
            } );
          } catch ( error ) {
            console.error( error );
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        } }
      />
      <ul>
        { comments.map( ( comment ) => (
          <li key={ comment.id }>
              <p>{ comment.body }</p>
          </li>
        ) ) }
      </ul>

      <button disabled={ page === 0 } onClick={ goToPreviousPage }>
        Previous
      </button>
      <button disabled={ ! hasMore } onClick={ goToNextPage }>
        Next
      </button>
    </div>
  );
};

export default IdeaCommentsList;
