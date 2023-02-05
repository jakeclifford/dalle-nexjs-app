'use client';
import './globals.css';
import { useEffect, useState } from 'react';


export default function SearchPage() {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState([{url: '/1.webp'},{url: '/2.webp'},{url: '/3.webp'},{url: '/4.webp'}])
    const [selectedImage, setSelectedImage] = useState(imageURL[0].url)
    const [loading, setLoading] = useState(false)

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
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    useEffect(() => {
        setSelectedImage(imageURL[0].url)
    },[imageURL])
    
    const handleClick = url => {
            setSelectedImage(url);
    };

    
 




    return (
        <div id="iframe-container" className="main-conatainer">
            <div className="search-box">
                {/* <form action='/api/image' method="post"> */}
                <form class='input-form' onSubmit={handleSubmit}>
                    <input type="text" id="prompt" name="prompt" className="input-search" onChange={(e) => setPrompt(e.target.value)} placeholder="Trippy Einstien"></input>
                    <button className="btn-search">Generate</button>
                </form>
            </div>
            <div id='iframe-images' className='images'>
                <div className="imageContainer">
    
                    <div className="image-parent">
                            {loading && <p class="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></p>}
                            <img className="generated-image" src={selectedImage}/>
                            <img className="background-image" src={'/background.webp'}/>
                            <div className="magic-overlap"></div>
                    </div>
                </div>
                    <div className="options-container">
                        {imageURL.map((item, index) => (
                            <img className="option-image"src={item.url} onClick={() => handleClick(item.url)}/>  
                        ))}
                    </div>   
                </div>
                <button onClick={() =>  navigator.clipboard.writeText(selectedImage.slice(-10))}>{selectedImage.slice(-10)}</button>
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
