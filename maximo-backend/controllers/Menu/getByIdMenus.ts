import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import { ErrorHandler } from "../../utils/handleError.ts";

import connectionDatabase from "../../database/connection.ts";
const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

export const getByIdMenu: HandlerFunc = async (data: Context) => {
  try {
    const { id } = await data.params as { id: string };

    const menu = await Menu.findOne({ _id: { "$oid": id } });

    if (menu) {
      const { image, name, description, variable, price } = menu;
      return data.json({ image, name, description, variable, price });
    }

    throw new ErrorHandler("menu not exists", 400);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
