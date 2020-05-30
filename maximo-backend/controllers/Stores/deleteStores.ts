import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  import connectionDatabase from "../../database/connection.ts";
  
  const database = connectionDatabase.findDatabase;
  const Store = database.collection("Store");

  export const remove: HandlerFunc = async (data: Context) => {
    try {
      const { id } = data.params as { id: string };
  
      const existStore = await Store.findOne({ _id: { "$oid": id } });
  
      if (existStore) {
        const deleteCount = await Store.deleteOne({ _id: { "$oid": id } });
        if (deleteCount) {
          return data.json("Loja deletado com sucesso!", 204);
        }
        throw new ErrorHandler("Não foi possível excluir essa Loja", 400);
      }
  
      throw new ErrorHandler("Loja não encontrado", 404);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };