'use client';
import './globals.css';
import { useEffect, useState } from 'react';


export default function SearchPage() {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState([{url: '/abstract1.png'},{url: '/abstract2.png'},{url: '/abstract3.png'},{url: '/abstract4.png'}])
    const [selectedImage, setSelectedImage] = useState(imageURL[0].url)

    const handleSubmit = async (event) => {
        event.preventDefault()
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
        console.log(imageURL)
    }
    
    const handleClick = url => {
            setSelectedImage(url);
    };
 




    return (
        <div id="iframe-container" className="main-conatainer">
            <div className="search-box">
                {/* <form action='/api/image' method="post"> */}
                <form class='input-form' onSubmit={handleSubmit}>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Abstract Gemometric shapes"></input>
                    <button className="btn-search">Generate</button>
                </form>
            </div>
            <div id='iframe-images' className='images'>
            <div className="imageContainer">
                <div className="image-parent">
                        <img className="generated-image" src={selectedImage}/>
                        <img className="background-image" src={'/background.jpg'}/>
                </div>
                <p>{imageURL[0].url.slice(-10)}</p>
            </div>
            <div className="options-container">
            {imageURL.map((item, index) => (
                <img className="option-image"src={item.url} onClick={() => handleClick(item.url)}/>  
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
