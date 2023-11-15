// import { NextResponse } from "next/server";
// // import { OpenAI }  from "openai";
// import { auth } from "@clerk/nextjs";
// // import {Configuration, OpenAIApi} from "openai"
// // const {Configuration} = require("openai");

// // const configuration = new Configuration({
// //     apiKey: process.env.OPEN_API_KEY,
// // });
// import OpenAI from "openai";

// const openai = new OpenAI({
//     apiKey: process.env.OPEN_API_KEY,
// });

// export async function POST(
//     req: Request 
// ) {
//     try{
//         const {userId} = auth();
//         const body=await req.json();
//         const {prompt, amount = 1, resolution = "512x512"} = body;

//         if(!userId){
//             return new NextResponse("Unauthorized", {status:401});
//         }
//         // if(!configuration.apiKey){
//         //     return new NextResponse("OpenAI API Key not configured", {status: 500});
//         // }
//         if(!prompt){
//             return new NextResponse("Prompt is required to generate responses.", {status: 400});
//         }
//         if(!amount){
//             return new NextResponse("Amount is required to generate responses.", {status: 400});
//         }
//         if(!resolution){
//             return new NextResponse("Resolution is required to generate responses.", {status: 400});
//         }
//         const response = await openai.createImage({
//             model: "dall-e-3",
//             prompt,
//             n: parseInt(amount, 10),
//             size: resolution,
//         });
//         return NextResponse.json(response.data.data);
//     }
//     catch(error){
//         console.log("[IMAGE_ERROR]", error);
//         return new NextResponse("Internal error", {status: 500});
//     }
// }

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})
export async function POST(
    req: Request 
) {
    try{
        const {userId} = auth();
        const body=await req.json();
        const {prompt, AMOUNT = 1, RESOLUTION = "512x512"} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        // if(!configuration.apiKey){
        //     return new NextResponse("OpenAI API Key not configured", {status: 500});
        // }
        if(!prompt){
            return new NextResponse("Prompt is required to generate responses.", {status: 400});
        }
        // if(!amount){
        //     return new NextResponse("Amount is required to generate responses.", {status: 400});
        // }
        // if(!resolution){
        //     return new NextResponse("Resolution is required to generate responses.", {status: 400});
        // }
        const response = await replicate.run(
            "tommoore515/material_stable_diffusion:3b5c0242f8925a4ab6c79b4c51e9b4ce6374e9b07b5e8461d89e692fd0faa449",
            {
              input: {
                prompt: prompt
              }
            }
          );
        return NextResponse.json(response);
    }
    catch(error){
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}