import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const order = database.collection("orders");

export const createOrders: HandlerFunc = async (data: Context) => {
  try {
    if (data.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Body invalido", 422);
    }
    let body = await data.body()
    body.created_at = new Date()
    console.log("body :>> ", body);
    if (!Object.keys(body).length) {
      throw new ErrorHandler("O body não pode estar vazio!!", 400);
    }
  
    const response = await order.insertOne(body);

    return data.json({message: "Pedido cadastrado com sucesso", response}, 201);

  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
