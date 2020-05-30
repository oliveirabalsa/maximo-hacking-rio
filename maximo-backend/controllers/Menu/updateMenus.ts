import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

import { ErrorHandler } from "../../utils/handleError.ts";

export const updateMenu: HandlerFunc = async (data: Context) => {
  try {
    const { id } = await data.params as { id: string };

    const body = await (data.body()) as {
      image?: any;
      name?: string;
      description?: string;
      variable?: any;
      price?: number;
    };

    const menu = await Menu.findOne({ _id: { "$oid": id } });

    if (menu) {
      const { matchedCount } = await Menu.updateOne(
        { _id: { "$oid": id } },
        { "$set": body },
      );

      return data.json({ matchedCount });
    }

    throw new ErrorHandler("menu not exists", 400);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
