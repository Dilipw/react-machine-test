import { useEffect, useState } from "react";
import axios from "axios";

function Assignment3() {

    // Defined the states
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search,setSearch] = useState("");

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');

                setUsers(response.data);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };


        fetchUsers();

    }, []);

    if (loading) {
        return <h1>Loading..</h1>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    const filteredUsers = users.filter((user)=>{
                return user.name.toLowerCase().includes(search.toLowerCase())
                || user.username.toLowerCase().includes(search.toLowerCase());

    });

    return (
        <>
            <div className="main">
                <h1>Display Data Assignment 3 to show data in table</h1>
                <input type="text" placeholder="Enter Search Name" value={search} onChange={(e)=>setSearch(e.target.value)}/> 
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                UserName
                            </th>
                            <th>
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
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

export default Assignment3;