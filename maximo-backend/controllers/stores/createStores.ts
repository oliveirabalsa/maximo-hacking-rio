import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  import connectionDatabase from "../../database/connection.ts";
  
  const database = connectionDatabase.findDatabase;
  const Store = database.collection("Store");
  
  export const create: HandlerFunc = async (data: Context) => {
    try {
      const body = await data.body();
  
      const { nameStore, typeStore, whatsapp } = body;
  
      const response = await Store.insertOne({
        nameStore,
        typeStore,
        whatsapp,
      });
  
      return data.json(
        { message: "store", response },
        201,
      );
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };