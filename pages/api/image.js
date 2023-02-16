import { Configuration, OpenAIApi } from "openai";
const axios = require('axios');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

function cloudUpload(images, req){
    for (let image of images){
        uploader(image, req)
    }
}

async function uploader(image, req){
    const imageResponse = await axios.get(image.url, {
        responseType: 'arraybuffer'
    });
    cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: image.url.slice(-10), prompt: req.body.prompt }, function(error, result) {
        console.log(result, error);
    })
    .end(Buffer.from(imageResponse.data, 'binary'));
}

export default async function handler(req, res) {
    if (!req.body.prompt) return res.status(400).json({message: 'Pass in prompt field for image generation'});
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: req.body.prompt,
        n: 4,
        size: "512x512",
    });

    if (!response.data) throw new Error('Unable to get image');
    let images = response.data.data
    res.status(200).json({ imageURL: response.data })
    cloudUpload(images, req)
}

