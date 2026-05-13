import { createServer, IncomingMessage, ServerResponse } from "node:http";
import type { Req, Res } from "./types";
import { sendResponse } from "./utility";
import { orderRoute } from "./routes/order.route";

const server = createServer(async (req ,res)=>{
    const url = req.url ?? "/"

    if(url === "/"){
        sendResponse(res,200,{message:"Welcome to our Foodi server",error:false});
        return sendResponse
    }
    else if(url.startsWith("/orders")){
        await orderRoute(req as Req,res)
        return 
    }
    else{ sendResponse(res,404,{message:"Not Found",error:true})}
});


server.listen(3000,()=>{
    console.log("server in running port on 3000");
})