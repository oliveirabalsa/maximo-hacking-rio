import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";

const database = connectionDatabase.findDatabase;
const Menu = database.collection("Menu");

export const createMenu: HandlerFunc = async (data: Context) => {
  try {
    const body = await data.body();

    const { image, name, description, variable, price } = body;

    const response = await Menu.insertOne({
      image,
      name,
      description,
      variable,
      price,
    });
    return data.json({ message: "menu", response }, 200);
  } catch (err) {
    return err.message || err;
  }
};
