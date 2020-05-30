import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";

const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

export const getAllMenu: HandlerFunc = async (data: Context) => {
  try {
    const response = await Menu.find();

    return data.json(response);
  } catch (err) {
    return err.message || err;
  }
};
