import {
    HandlerFunc,
    Context,
  } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
  import { ErrorHandler } from "../../utils/handleError.ts";
  import connectionDatabase from "../../database/connection.ts";
  
  const database = connectionDatabase.findDatabase;
  const Store = database.collection("Store");

  export const update: HandlerFunc = async (data: Context) => {
    try {
      const { id } = data.params as { id: string };
      const body = await (data.body()) as {
        nameStore?: string;
        typeStore?: string;
        whatsapp?: number;
      };
  
      const existStore = await Store.findOne({ _id: { "$oid": id } });
  
      if (existStore) {
        const { matchedCount } = await Store.updateOne(
          { _id: { "$oid": id } },
          { $set: body },
        );
  
        if (matchedCount) {
          return data.json("Loja atualizada com sucesso!", 204);
        }
        return data.json("Não foi possivel atualizar a loja");
      }
      throw new ErrorHandler("Loja não encontrada", 404);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  };