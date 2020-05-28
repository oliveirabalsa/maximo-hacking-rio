import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  
  import connectionDatabase from "../../database/connection.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  
  const database = connectionDatabase.findDatabase;
  const order = database.collection("orders");
  
  export const getOrder: HandlerFunc = async (data: Context) => {
    try {
      const { id } = data.params as { id: string };
  
      const existUser = await order.findOne({ _id: { "$oid": id } });
  
      if (existUser) {
        const {
            _id: { $oid },
            title,
            description,
            user_id,
            user_name,
            status,
            location: {
              latitude,
              longitude,
              street,
              number,
              neighborhood,
              postalCode,
              city,
              state,
              complement
            },
          }  = existUser;
        return data.json({
            _id: { $oid },
            title,
            description,
            user_id,
            user_name,
            status,
            location: {
              latitude,
              longitude,
              street,
              number,
              neighborhood,
              postalCode,
              city,
              state,
              complement
            },
          } , 200);
      }
  
      throw new ErrorHandler("Pedido não encontrado", 404);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };
  