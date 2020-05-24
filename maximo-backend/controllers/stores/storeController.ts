import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

import { ErrorHandler } from "../../utils/handleError.ts";
import connectionDatabase from "../../database/connection.ts";
const database = connectionDatabase.findDatabase;
const Store = database.collection("Store");

export const create: HandlerFunc = async (data: Context) => {
  try {
    const body = await data.body();
    console.log(body);

    /* const { nameStore, typeStore, whatsapp } = body;
    /* 
    /* const response = await Store.insertOne({
    /*   nameStore,
    /*   typeStore,
    /*   whatsapp,
    /* });
    /* 
    /* return data.json(
    /*   { message: "store", response },
    /*   201,
     ); */
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getAll: HandlerFunc = async (data: Context) => {
  try {
    const stores = await Store.find();
    return data.json(stores);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const getById: HandlerFunc = async (data: Context) => {
  try {
    const store = await Store.findOne();
    return data.json(store);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const update: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };
    const store = await (data.body()) as {};
    return data.json(store);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const remove: HandlerFunc = async (data: Context) => {
  try {
    const { id } = data.params as { id: string };
    const store = await Store.findOne();
    return data.json(store);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
