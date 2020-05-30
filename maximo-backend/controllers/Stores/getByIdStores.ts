import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  import connectionDatabase from "../../database/connection.ts";
  
  const database = connectionDatabase.findDatabase;
  const Store = database.collection("Store");

  export const getById: HandlerFunc = async (data: Context) => {
    try {
      const { id } = data.params as { id: string };
  
      const existStore = await Store.findOne({ _id: { "$oid": id } });
  
      if (existStore) {
        const { nameStore, typeStore, whatsapp } = existStore;
        return data.json({ nameStore, typeStore, whatsapp });
      }
  
      throw new ErrorHandler("Lojá não encontrada", 400);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };