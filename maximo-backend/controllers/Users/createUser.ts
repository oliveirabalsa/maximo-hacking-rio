import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");
const salt = await bcrypt.genSalt(8);

export const createUser: HandlerFunc = async (data: Context) => {
  try {
    if (data.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Body invalido", 422);
    }
    const body = await (data.body());

    console.log('body :>> ', body);
    if (!Object.keys(body).length) {
      throw new ErrorHandler("O body não pode estar vazio!!", 400);
    }
    let { name, lastName, email, password } = body;

    let passwordHash = password as string;

    password = await bcrypt.hash(passwordHash, salt);

    await user.insertOne({
      name,
      lastName,
      email,
      password,
    });

    return data.json('Usuário cadastrado com sucesso', 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

