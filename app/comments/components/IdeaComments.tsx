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
    <div className="mt-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl">
      <CommentForm
        submitProps={ {
          className: 'flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        } }
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
      <ul className="mt-3">
        { comments.map( ( comment ) => (
          <li key={ comment.id } className="mb-3">
            <div className="flex">
              <div className="mr-4 flex-shrink-0">
                <img className="h-12 w-12 border-2 border-gray-500" src="/user.svg" alt="" />
              </div>
              <div>
                <p className="mt-1">
                  { comment.body }
                </p>
              </div>
            </div>
          </li>
        ) ) }
      </ul>

      { ( page !== 0 || hasMore ) && (
        <div className="flex align-middle justify-between">
          <button
            disabled={ page === 0 }
            onClick={ goToPreviousPage }
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Previous
          </button>
          <button
            disabled={ ! hasMore }
            onClick={ goToNextPage }
            className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
              Next
          </button>
        </div>
      ) }
    </div>
  );
};

export default IdeaCommentsList;
