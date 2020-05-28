import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorHandler } from "../../utils/handleError.ts";
import connectionDatabase from "../../database/connection.ts";
import Istore from "../../model/Store.ts";

const database = connectionDatabase.findDatabase;
const Store = database.collection("Store");

export const create: HandlerFunc = async (data: Context) => {
  try {
    const body = await data.body();

    const { nameStore, typeStore, whatsapp } = body;

    const response = await Store.insertOne({
      nameStore,
      typeStore,
      whatsapp,
    });

    return data.json(
      { message: "store", response },
      201,
    );
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getAll: HandlerFunc = async (data: Context) => {
  try {
    const stores: Istore[] = await Store.find();
    return data.json(stores);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getById: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };

    const existStore = await Store.findOne({ _id: { "$oid": id } });

    if (existStore) {
      const { nameStore, typeStore, whatsapp } = existStore;
      return data.json({ nameStore, typeStore, whatsapp });
    }

    throw new ErrorHandler("Lojá não encontrada", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

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

export const remove: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };

    const existStore = await Store.findOne({ _id: { "$oid": id } });

    if (existStore) {
      const deleteCount = await Store.deleteOne({ _id: { "$oid": id } });
      if (deleteCount) {
        return data.json("Loja foi deletado!", 204);
      }
      throw new ErrorHandler("Não foi possivel excuir esse Loja", 400);
    }

    throw new ErrorHandler("Loja não encontrado", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
