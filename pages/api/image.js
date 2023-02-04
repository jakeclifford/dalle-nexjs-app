const axios = require('axios');
const fs = require('fs');


import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    // organization: "org-fzcWoVVemrdR8Gmg1r3qtWfQ",
    apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
    if (!req.body.prompt) return res.status(400).json({message: 'Pass in prompt field for image generation'});
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: req.body.prompt,
        n: 4,
        size: "256x256",
    });

    if (!response.data) throw new Error('Unable to get image');
    
    res.status(200).json({ imageURL: response.data })
    let images = response.data.data
    for (let image of images){
        //write code here to turn image url into jpg
        const response = await axios.get(image.url, { responseType: 'arraybuffer' });
        const buffer = new Buffer.from(response.data, 'binary');
        const code = image.url.slice(-10)
        fs.writeFileSync(`./images/${code}.jpg`, buffer, 'binary');
    }
}
