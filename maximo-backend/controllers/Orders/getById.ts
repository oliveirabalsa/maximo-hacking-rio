import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const order = database.collection("orders");

export const getOrder: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.queryParams as { id: string };
    const { status } = data.queryParams as { status: string };
    const { user_id } = data.queryParams as { user_id: string };

    const existOrder = await order.findOne({ _id: { $oid: id } });
    const existOrderStatus = await order.findOne({ status: status });
    const existOrderUser = await order.findOne({ user_id: user_id });

    if (existOrder) {
      return data.json(existOrder, 200);
    }
    if (existOrderStatus) {
      return data.json(existOrderStatus, 200);
    }
    if (existOrderUser) {
      return data.json(existOrderUser, 200);
    }

    throw new ErrorHandler("Pedido não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
