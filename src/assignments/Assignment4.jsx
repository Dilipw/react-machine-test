import { useEffect, useState } from "react";
import axios from "axios";


function Assignment4() {

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
        }

        fetchUsers();

    },[]);


    const deleteUser = (id)=>{
        const isConfirmed = window.confirm("Are you want to delete this record !");

        if(!isConfirmed)
        {
            return;
        }

        const newUsers=users.filter((user)=>{
            return user.id!==id;
        });

        setUsers(newUsers);

        alert("User deleted successfully");
    }

     const filteredUsers = users.filter((user)=>{
                  return user.name.toLowerCase().includes(search.toLowerCase());
    });



    if (loading) {
        return <h1>Loading.....</h1>;
    }

    if (error) {
        return <h2>{error}</h2>
    }

   

    return (
        <>
            <div className="main">
                <h1>Assignment 4</h1>
                <input type="text" placeholder="Enter search name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                 <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user)=>{
                              return (
                                <tr key={user.id}>
                                    <td>
                                        {user.id}
                                     </td>
                                     <td>
                                        {user.name}
                                     </td>
                                     <td>
                                        {user.username}
                                     </td>
                                     <td>
                                        {user.email}
                                     </td>
                                      <td>
                                        <button onClick={()=>deleteUser(user.id)}>Delete</button>
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
}

export default Assignment4;