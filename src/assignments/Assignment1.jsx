import { useState, useEffect } from "react";
import api from "../api/axios"


function Assignment1() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [existingproduct, setExistingProduct] = useState("");
    const [deleteproduct, setDeleteProduct] = useState(null);



    // form data

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");




    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            // console.log(response.data.products);
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

        const error = [];

        if (!title.trim()) {
            return alert("title must be required");
        }

        if (!description.trim()) {
            return alert("description must be required");
        }

        if (!category.trim()) {
            return alert("category must be required");
        }

        if (!price.trim()) {
            return alert("price must be required");
        }

        try {
            const request = await api.post('/products/add', {
                title: title,
                description: description,
                category: category,
                price: price
            })
            // console.log(request);
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

    const updateProduct = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(`products/${existingproduct.id}`, {
                title: title,
                description: description,
                category: category,
                price: price
            });

            const data = products.map((product) => {
                return product.id === existingproduct.id ? { ...product, ...response.data } : product;
            });


            setProducts(data);


            console.log(response);
            setTitle("");
            setCategory("");
            setDescription("");
            setPrice("");
            alert("product updated successfully");

        }
        catch (error) {

        }
    }



    // Need function to update the existingproduct details
    const editProduct = (product) => {
        setExistingProduct(product);

        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
    }

   const deleteProduct = async(id)=>{

       try{
          const isConfirm = window.confirm("Are You Sure want to delete this record..");

          if(!isConfirm)
          {
            return;
          }

          const request = await api.delete(`/products/${id}`);

          const updateProducts = products.filter((product)=>{
              return product.id!=id;
          });


        setProducts(updateProducts);
          console.log(request);
       }
       catch(error)
       {

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
                <form onSubmit={existingproduct ? updateProduct : addProducts}>
                    <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input type="textarea" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <input type="text" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <button type="submit">
                        {existingproduct ? "Update User" : "Add User"}
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
                                <button onClick={() => editProduct(product)}>
                                    Update
                                </button>
                                 <button onClick={() => (deleteProduct(product.id))}>
                                    Delete
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