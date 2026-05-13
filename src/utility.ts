import type { Req, Res } from "./types";

export const sendResponse =<T>(res:Res,status=200,{message,data,error}:{message:string,data?:T, error?:boolean})=>{
    res.writeHead(status,{"content-type":"application/json"});
    res.end(JSON.stringify({
        success: error ? false: true,
        status:status,
        message:message,
        data:error ? null : data,

    }))
}


export const extractRequestInfo =async <T> (req:Req)=>{
    const params = req.url?.split("/").filter(Boolean) ?? [];
    const method = req.method

    const body = req.method === "POST" || req.method === "PATCH" || req.method === "PUT" ? await BodyParts<T>(req) : null
    return {
        method:method,
        params: params,
        body : body
    }
}


 const BodyParts =async <T>(req:Req): Promise<T | null>=>{
    return new Promise((resolve,reject) =>{
        let body ="";

        req.on("data",(chunk:string)=>{
            body += chunk.toString()
        })

        req.on("end",()=>{
            try {
                return resolve(JSON.parse(body) as T)
            } catch (error) {
                return reject(new Error("invalid Data"))
            }

        })
    })
}