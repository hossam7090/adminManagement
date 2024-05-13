import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
const AddProduct = () => {

    const [image,SetImage] = useState(false);
    const[ProductDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const imageHandler=(e)  => {
        SetImage(e.target.files[0]);

    }
    const changeHandler=(e) => {
        setProductDetails({...ProductDetails,[e.target.name]:e.target.value})
    }
    const Add_Product=async() => { // handling image 
        console.log(ProductDetails);
        let responseData;
        let product=ProductDetails; // created a copy of object of product details

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp)=> resp.json()).then((data)=>{responseData=data})

        if(responseData.success)
            {// get the url of the image
                product.image=responseData.image_url;
                console.log(product);
                await fetch('http://localhost:4000/addproduct',{
                    method:'POST',
                    headers:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(product),
                }).then((resp)=> resp.json()).then((data)=>{data.success?alert('Product added successfully'):alert('Failed')

                })
            }
    }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={ProductDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type Here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
            <p>inventory</p>
            <input value={ProductDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type Here' />
            </div>
            <div className="addproduct-itemfield">
            <p>price</p>
            <input value={ProductDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type Here' />
            </div>
        </div>
           
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Add</button>
    </div>
  )
}

export default AddProduct