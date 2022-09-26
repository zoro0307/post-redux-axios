import { createSlice, nanoid } from "@reduxjs/toolkit";
import { api } from "../../api/posts";

const initialState = {
    loading: false,
    error: false,
    posts: [],
};

const postsSlide = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setError: (state) => {
            state.error = true;
        },
        setPosts: (state, action) => {
            state.loading = false;
            state.error = false;
            state.posts = action.payload;
        },
        addPosts: {
            reducer(state, action) {
                state.posts.push(action.payload);
            },
            prepare(title, body, userId) {
                return {
                    payload: {
                        userId,
                        id: nanoid(),
                        title,
                        body,
                    },
                };
            },
        },
    },
});

export const { setLoading, setPosts, setError, addPosts } = postsSlide.actions;

export const selectAllPosts = (state) => state.posts;

export default postsSlide.reducer;

export function getPosts() {
    return async (dispatch) => {
        api.get("/posts", {
            params: {
                _start: 0,
                _limit: 5,
            },
        })
            .then((response) => {
                dispatch(setPosts(response.data));
            })
            .catch((er) => {
                dispatch(setError());
            });
    };
}
