import { useEffect, useState } from "react";
import api from "../api/axios";


function Assignment5() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        try {
            const response = await api.post('/users/add', {
                firstName: name,
                username: username,
                email: email,
            })

            setUsers([...users, response.data]);

            alert("User added successfully");

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

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button type="submit">
                        Add User
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