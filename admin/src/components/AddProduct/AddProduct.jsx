import React from 'react';
import './AddProduct.css';
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
    const [image, setImage] = React.useState(false);
    const [productDetail, setProductDetail] = React.useState({ name: "", image: "", category: "women", new_price: "", old_price: "", isRental: false });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setProductDetail(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const Add_Product = async () => {
        console.log(productDetail);
        let responseData;
        let product = productDetail;
        let formdata = new FormData();
        formdata.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata,
        })
            .then((res) => res.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => data.succsess ? alert("Successfully added the Product") : alert(" Not added the Product"))

        }
    };

    return (
        <div className='add-product'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetail.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className="addproduct-itemfield">
                    <p>Price(₹)</p>
                    <input value={productDetail.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Old Price' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price(₹)</p>
                    <input value={productDetail.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='New Price' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetail.category} onChange={changeHandler} name='category' className='add-product-selector'>
                    <option value='women'>women</option>
                    <option value='men'>men</option>
                    <option value='kid'>kid</option>
                    <option value='rent-dress-here'>rent-dress-here</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <p>Is Rental?</p>
                <input type='checkbox' name='isRental' checked={productDetail.isRental} onChange={changeHandler} />
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="Upload" />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>
                Add
            </button>
        </div>
    );
};

export default AddProduct;
