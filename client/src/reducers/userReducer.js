
import {
    REQUEST,
    SEARCH_SUCCESS,
    BLOGS_SUCCESS,
    FAILURE,
    SELECT_USER,
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS

  } from '../actionTypes/user';

export const userInitialState = {
    searchResult: [],
    selectedUserBlogs: null,
    selectedUser: null,
    isMyFollowing: false,
    loading: false,
    error: null,
    followSuccess: false
  };



export const userReducer = (state, action) => {
    switch (action.type) {
        case REQUEST:
            return { ...state, loading: true };
    
        case BLOGS_SUCCESS:
            return { ...state, loading: false, selectedUserBlogs: action.payload };


        case SEARCH_SUCCESS:
            return { ...state, loading: false, searchResult: action.payload };
    
        case FAILURE:
            return { ...state, loading: false, error: action.payload };

        case SELECT_USER:
            return {...state, selectedUser: action.payload.selected, isMyFollowing: action.payload.selected.followers.includes(action.payload.user._id) , selectedUserBlogs: null}

        case FOLLOW_SUCCESS:
            console.log("follow",action.payload )
            return {
                ...state,
                followSuccess: true,
                isMyFollowing: true,
                selectedUser: {
                  ...state.selectedUser,
                  followers: [...state.selectedUser.followers, action.payload.followerId]
                }}

        case UNFOLLOW_SUCCESS:
            console.log("unfollow",action.payload , state.selectedUser.followers)
            return {
                ...state,
                isMyFollowing: false,
                selectedUser: {
                  ...state.selectedUser,
                  followers: state.selectedUser.followers.filter(id => id !== action.payload.followerId)
                }}

           
        default:
            return state;
    }
};
  