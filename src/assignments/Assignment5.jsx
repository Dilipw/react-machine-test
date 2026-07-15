import { useEffect, useState } from "react";
import api from "../api/axios";


function Assignment5() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [editingUser, setEditingUser] = useState(null);
    // Form Data

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");




    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            console.log(response.data.users);
            setUsers(response.data.users);
        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false)
        }
    };


    const addUser = async (e) => {

        e.preventDefault();

        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!username.trim()) {
            errors.username = "Username is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        try {
            const response = await api.post('/users/add', {
                firstName: name,
                username: username,
                email: email,
            })

            setUsers([...users, response.data]);

            alert("User Updated successfully");

            setName("");
            setUsername("");
            setEmail("");

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const editUser = (user) => {
        setEditingUser(user);

        setName(user.firstName);
        setUsername(user.username);
        setEmail(user.email);
    };

    const updateUser = async (e) => {

        e.preventDefault();

        try {

            const response = await api.put(`/users/${editingUser.id}`, {
                firstName: name,
                username: username,
                email: email,
            });

            const updatedUsers = users.map((user) => {

                return user.id === editingUser.id
                    ? { ...user, ...response.data }
                    : user;

            });

            setUsers(updatedUsers);

            alert("User updated successfully");

            setEditingUser(null);

            setName("");
            setUsername("");
            setEmail("");

        } catch (error) {

            setError(error.message);

        }

    };

    useEffect(() => {
        fetchUsers();

    }, []);

    if (error) {
        return <h1>{error}</h1>
    }
    return (
        <>
            <div className="main">
                <h1>Assignment 5</h1>
                <form onSubmit={addUser}>

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {validationErrors.name && (
                        <p>{validationErrors.name}</p>
                    )}

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {validationErrors.username && (
                        <p>{validationErrors.username}</p>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {validationErrors.email && (
                        <p>{validationErrors.email}</p>
                    )}
                    <button type="submit">
                        {editingUser ? "Update User" : "Add User"}
                    </button>

                </form>

                <table>
                    <thead>
                        <tr>
                            <th>
                                Id
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>
                                            {user.id}
                                        </td>
                                        <td>
                                            {user.firstName}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            <button onClick={() => editUser(user)}>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
};

export default Assignment5;