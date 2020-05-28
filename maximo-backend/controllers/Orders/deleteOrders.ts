import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  
  import connectionDatabase from "../../database/connection.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  
  const database = connectionDatabase.findDatabase;
  const order = database.collection("orders");
  
  export const deleteOrders: HandlerFunc = async (data: Context) => {
    try {
      const { id } = data.params as { id: string };
  
      const existUser = await order.findOne({ _id: { "$oid": id } });
  
      if (existUser) {
        const deleteCount = await order.deleteOne({ _id: { "$oid": id } });
        if (deleteCount) {
          return data.string("O pedido foi deletado!", 204);
        }
        throw new ErrorHandler("Não foi possivel excuir esse pedido", 400);
      }
  
      throw new ErrorHandler("pedido não encontrado", 404);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };
  