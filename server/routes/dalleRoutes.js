import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// router.get("/", (req, res) => {
//   res.send("Hello From Dall-E");
// });

router.post('/', async(req, res)=>
{
    try {
        const {prompt} = req.body;
        const aiRespone = await openai.createImage({
            prompt, 
            n : 1, 
            size : '1024x1024', 
            response_format : 'b64_json',
        });
        
        const image = aiRespone.data.data[0].b64_json;
        res.status(200).json({photo:image})
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message|| "something went wrong");
    }
}); 

export default router;
