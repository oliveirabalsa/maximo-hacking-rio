import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";
import Orders from "../../model/orders.ts";

const database = connectionDatabase.findDatabase;
const order = database.collection("orders");

export const getOrders: HandlerFunc = async (data: Context) => {
  try {
    const existTask: Orders[] = await order.find();

    if (existTask) {
      const list = existTask.length
        ? existTask.map((item: any) => {
            const {
              _id: { $oid },
              title,
              description,
              user_id,
              user_name,
              status,
              location: {
                latitude,
                longitude,
                street,
                number,
                neighborhood,
                postalCode,
                city,
                state,
                complement,
                created_at
              },
            } = item;

            console.log("item :>> ", item);
            return {
              _id: { $oid },
              title,
              description,
              user_id,
              user_name,
              status,
              location: {
                latitude,
                longitude,
                street,
                number,
                neighborhood,
                postalCode,
                city,
                state,
                complement,
                created_at
              },
            };
          })
        : [];

      return data.json(list, 200);
    }
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
