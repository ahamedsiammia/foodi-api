import path from "path";
import type { Order } from "../types";
import fs from "fs/promises";
import { sendResponse } from "../utility";

const DB_PATH = path.join(process.cwd(),"src/db/data.json");

console.log(DB_PATH);

class OrderService{
    // readData,writeData
   private async readData():Promise<Order[]>{
        try {
       const data = await fs.readFile(DB_PATH,"utf-8");
       return JSON.parse(data)
        } catch (error) {
            return []
        }
    }
   private async writeData(data:Order[]){
    await fs.writeFile(DB_PATH,JSON.stringify(data,null,2))
    }


    // GET 
    async get(){
        const data = await this.readData();
        return data
    };
    // GET BY ID
    async getById(id:string){
        const data = await this.readData();
        return data.filter((order)=>order.id === id) || null    
    };

    // CREATE 
    async create(order:Omit<Order,"id">){

           const data = await this.readData();

        const newOrder ={
            ...order,
            id:String(Math.ceil(Math.random()*100))
        }

        data.push(newOrder);

        await this.writeData(data);
    }

    // UPDATE 
    async update(id:string ,updates:Partial<Omit<Order,"id">>){
           let data = await this.readData();

           const i = data.findIndex((i) => i.id === id);

           data[i] = {...data[i],...updates} as Order;
           await this.writeData(data)

        //    let updateOrder = data.find((order) => order.id === id);
        // console.log(updateOrder);
        //     updateOrder  ={
        //         ...updateOrder,
        //         ...updates
        //    } as Order;
        //    console.log(updateOrder);
        //    console.log(data);
        //    data =[...data,...updateOrder] as Order[]
        //  await  this.writeData(data)
        // //  return updateOrder
    }

    // Delete 
    async delete(id:string ){
        let data = await this.readData();
        const DeleteId = id || null
       const newData = data.filter((order) => order.id !== DeleteId) || null;
        console.log("actule data",newData);
      data = newData;  
    //  const i = data.findIndex((i) => i.id === id);
    //   data.splice(i,1)
        this.writeData(data)
    }
}

export const orderService = new OrderService()


// await orderData.create({
//     customer:"kami",
//     food:"Pizza",
//     quantity:4,
//     price:1666
// });

// console.log("single data ",await orderData.delete("3"));
// await orderData.update("4", {customer:"Niloy",food:"Visitable",price:250,quantity:5})