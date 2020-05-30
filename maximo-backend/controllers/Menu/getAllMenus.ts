import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import { ErrorHandler } from "../../utils/handleError.ts";

import connectionDatabase from "../../database/connection.ts";
const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

export const getAllMenu: HandlerFunc = async (data: Context) => {
  try {
    const menu = await Menu.find();

    if (menu) {
      return data.json(menu);
    }

    throw new ErrorHandler("menu not exists", 400);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
