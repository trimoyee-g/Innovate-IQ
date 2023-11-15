import { NextResponse } from "next/server";
// import { OpenAI }  from "openai";
import { auth } from "@clerk/nextjs";
// import {Configuration, OpenAIApi} from "openai"
// const {Configuration} = require("openai");

// const configuration = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// });
import OpenAI from "openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
});
const instructionMessage: ChatCompletionMessage ={
    role: 'system',
    content: ' You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation.'
}
export async function POST(
    req: Request 
) {
    try{
        const {userId} = auth();
        const body=await req.json();
        const {messages} = body;

        if(!userId){
            return new NextResponse("Unauthorized", {status:401});
        }
        // if(!configuration.apiKey){
        //     return new NextResponse("OpenAI API Key not configured", {status: 500});
        // }
        if(!messages){
            return new NextResponse("Messages are required to generate responses.", {status: 400});
        }
        const response=await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });
        return NextResponse.json(response.choices[0].message);
    }
    catch(error){
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}