'use client';

import './globals.css';
import './robot.css';
import { useState } from 'react';


export default function SearchPage() {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState([]);
    const [loading, setLoading] = useState(0);
    const [selectedImage, setSelectedImage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(1);
        const response = await fetch('/api/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt
            })
        });
        const imageResponse = await response.json();
        // setImageURL(imageResponse.imageURL)
        console.log(imageResponse.imageURL.data);
        setImageURL(imageResponse.imageURL.data);
        setLoading(0);
    }


    return (
        <div className="main-conatainer">
            <div className="search-box">
                {/* <form action='/api/image' method="post"> */}
                <form class='input-form' onSubmit={handleSubmit}>
                    <button className="btn-search"><i className="fa fa-search"></i></button>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Generate Image with AI ..."></input>
                </form>
            </div>
            <div id='iframe-images' className='images'>
            {imageURL.map((item) => (
                <div className="imageContainer">
                    <img src={item.url}/>
                </div>
            ))}
            </div>
        </div>
    )
}

