import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import { ErrorHandler } from "../../utils/handleError.ts";

import connectionDatabase from "../../database/connection.ts";
const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

export const deleteMenu: HandlerFunc = async (data: Context) => {
  try {
    const { id } = await data.params as { id: string };

    const menu = await Menu.findOne({ _id: { "$oid": id } });

    if (menu) {
      const deleteCount = await Menu.deleteOne(({ _id: { "$oid": id } }));
      if (deleteCount) {
        return data.json("Menu deletado com sucesso!", 204);
      }
      throw new ErrorHandler("Não foi possível excluir menu", 400);
    }

    throw new ErrorHandler("Menu não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
