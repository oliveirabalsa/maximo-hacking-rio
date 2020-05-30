import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  import connectionDatabase from "../../database/connection.ts";
  import Istore from "../../model/stores.ts";
  
  const database = connectionDatabase.findDatabase;
  const Store = database.collection("Store");

  export const getAll: HandlerFunc = async (data: Context) => {
    try {
      const stores: Istore[] = await Store.find();
      return data.json(stores);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };