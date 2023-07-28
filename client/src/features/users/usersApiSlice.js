import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/apiSlice';

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: responseData => {
        const loadedUsers = responseData.map(note => {
          note.id = note._id;
          return note;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id })),
          ];
        } else return [{ type: 'User', id: 'LIST' }];
      },
    }),
    addNewUser: builder.mutation({
      query: user => ({
        url: '/users',
        method: 'POST',
        body: { ...user },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    editUser: builder.mutation({
      query: user => ({
        url: '/users',
        method: 'PATCH',
        body: { ...user },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: '/users',
        method: 'DELETE',
        body: { id },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
