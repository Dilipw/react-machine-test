import { useState, useEffect } from "react";
import api from "../api/axios"


function Assignment1() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    // form data

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");




    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            console.log(response.data.products);
            setProducts(response.data.products);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    };

    const addProducts = async (e) => {

        e.preventDefault();

        const error=[];

        if(!title.trim())
        {
            return alert("title must be required");
        }

        if(!description.trim())
        {
            return alert("description must be required");
        }

        if(!category.trim())
        {
            return alert("category must be required");
        }

        if(!price.trim())
        {
            return alert("price must be required");
        }

        try {
            const request = await api.post('/products/add', {
                title: title,
                description: description,
                category: category,
                price: price
            })
            console.log(request);
            setProducts([...products, request.data]);

            setTitle("");
            setCategory("");
            setDescription("");
            setPrice("");
            alert("product submited successfully");
        }
        catch (error) {

        }
    }



    useEffect(() => {
        fetchProducts();
    }, []);

    const filterProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
    });

    if (loading) {
        return <h1>Loading</h1>;
    }

    if (error) {
        return <h2>{error}</h2>
    }
    return (
        <>
            <div className="product-page">
                <form onSubmit={addProducts}>
                    <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="textarea" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <button type="submit">
                        submit
                    </button>
                </form>
                <input type="text" value={search} placeholder="Search product title" onChange={(e) => setSearch(e.target.value)} />
                {
                    filterProducts.map((product) => {
                        return (
                            <div key={product.id}>
                                <h1>
                                    {product.title}
                                </h1>
                                <h3>{product.category}</h3>
                                <b>{product.price}</b>
                                <p>
                                    {product.description}
                                </p>
                                <button>
                                    Update
                                </button>
                            </div>

                        )
                    })
                }
            </div>
        </>
    );
}

export default Assignment1;