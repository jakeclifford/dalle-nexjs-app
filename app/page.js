'use client';
import './globals.css';
import { useEffect, useState } from 'react';

import { Cloudinary } from 'cloudinary-core';
const cloudinary = new Cloudinary({ cloud_name: 'dvo1bkh6y' });

export default function SearchPage() {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState([{url: '/einstein1.webp'},{url: '/einstein2.webp'},{url: '/einstein3.webp'},{url: '/einstein4.webp'}])
    const [selectedImage, setSelectedImage] = useState(imageURL[0].url)
    const [loading, setLoading] = useState(false)
    const [nocode, setNocode] = useState(false)
    const [generations, setGenerations] = useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
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
        setImageURL(imageResponse.imageURL.data);
        setNocode(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        setGenerations(generations + 1)
    }

    const handleUpload = async () => {
        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/dvo1bkh6y/image/upload`, {
            method: 'POST',
            body: JSON.stringify({ file: selectedImage, upload_preset: 'qah3zhgt' }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      };


    useEffect(() => {
        setSelectedImage(imageURL[0].url)
    },[imageURL])
    
    const handleClick = url => {
        setSelectedImage(url);
    };

    return (
        <div id="iframe-container" className="main-conatainer">
            <div className="search-box">
            {generations > 2 && <div className='klaviyo'><div class="klaviyo-form-U53aKT"></div></div>}
                <form class='input-form' onSubmit={handleSubmit}>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Trippy Einstien" autoComplete='off'></input>
                    <button className="btn-search">Generate</button>
                </form> 
            </div>
            <div id='iframe-images' className='images'>
                <div className="imageContainer">
    
                    <div className="image-parent">
                            {loading && <p class="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></p>}
                            <img className="generated-image" src={selectedImage}/>
                            <img className="background-image" src={'/background.webp'}/>
                            <button className='actual-code' onClick={handleUpload}>{nocode ? selectedImage.slice(-10): selectedImage.slice(1, 10)}</button>
                    </div>
                </div>
                    <div className="options-container">
                        {imageURL.map((item, index) => (
                            <img className="option-image"src={item.url} onClick={() => {
                                handleClick(item.url)
                            }}/>  
                        ))}
                    </div>   
                </div>
        </div>
    )
}



/*<div className="imageContainer">
                <div className="image-parent">
                        <img className="generated-image" src={'https://cdn.mos.cms.futurecdn.net/snbrHBRigvvzjxNGuUtcck-1920-80.jpg.webp'}/>
                        <img className="background-image" src={'/background.jpg'}/>
                </div>
                <p>bahhsdshs</p>
            </div>  
*/
