import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from "./postsSlide";
import { useEffect } from "react";
import { getUsers, selectAllUsers } from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    const { loading, error, users } = useSelector(selectAllUsers);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onBodyChange = (e) => setBody(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);

    const onAddPostClick = () => {
        if (title && body) {
            dispatch(addPosts(title, body, userId));
            setTitle("");
            setBody("");
        } else {
            alert("Please fill the inputs...");
        }
    };

    const renderUsersOptions = () => {
        if (loading) return <strong>Loading please wait...</strong>;

        if (error) return <strong>Items not available at this time</strong>;

        return users.map((user) => (
            <option key={user.id} value={user.id}>
                {user.name}
            </option>
        ));
    };

    return (
        <>
            <label className="block">
                <span className="text-gray-700">Title</span>
                <input
                    type="text"
                    value={title}
                    className="input-primary"
                    onChange={onTitleChange}
                />
            </label>
            <label className="block">
                <span className="text-gray-700">Content</span>
                <textarea
                    value={body}
                    onChange={onBodyChange}
                    className="input-primary"
                    rows="2"
                ></textarea>
            </label>
            <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select
                    value={userId}
                    onChange={onAuthorChange}
                    className="input-primary"
                >
                    {renderUsersOptions()}
                </select>
            </label>
            <button onClick={onAddPostClick} className="btn-primary w-1/3 mt-4">
                Add Post
            </button>
        </>
    );
};
export default AddPostForm;
