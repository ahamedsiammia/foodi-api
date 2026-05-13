import { orderService } from "../service/order.service";
import type { Order, Req, Res } from "../types";
import { extractRequestInfo, sendResponse } from "../utility";

export const orderRoute =async (req:Req,res:Res) =>{
    const {params,method,body} =await extractRequestInfo<Omit<Order,"id">>(req)
    const orderId = params[1];

   try {
     if(method === "GET" && !orderId){
        const orders = await orderService.get();
        sendResponse(res,200,{message:"Order retrieved successfully",data:orders,error:false});
        return sendResponse
    }

    if(method === "GET"&& orderId){
        const order = await orderService.getById(orderId);
        sendResponse(res,order? 200 : 404,{message:order?"Order retrieved successfully":"Order Not Found",data:order,error: order?false:true});
        return sendResponse
    }
    if(method === "DELETE"&& orderId){
        const deleted = await orderService.delete(orderId);
        sendResponse(res,200,{message:"Order Delete Successfully",error:false});
        return sendResponse
    }

    if(method === "POST" && body){
        const newOrder = await orderService.create(body);
        sendResponse(res,200,{message:"Your Order Created",data:newOrder,error:false});
        return sendResponse
    }
    if(method === "PUT" && body && orderId){
        const updated = await orderService.update(orderId,body);
        sendResponse(res,200,{message:"Your Order updated",data:updated,error:false});
        return sendResponse

    }
    sendResponse(res,405,{message:"Not Found"})
   } catch (error) {
    sendResponse(res,500,{message:error instanceof Error ? error.message : "Not Found"})
   }
}