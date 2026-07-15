import { useState, useEffect } from "react";
import api from "../api/axios"


function Assignment1() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

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
                <input type="text" value={search} placeholder="Search product title" onChange={(e)=>setSearch(e.target.value)}/>
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