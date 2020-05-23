import {
    HandlerFunc,
    Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import Users from '../../model/users.ts'

import connectionDatabase from "../../database/connection.ts";
import { ErrorHandler } from "../../utils/handleError.ts";

const database = connectionDatabase.findDatabase;
const user = database.collection("users");

export const loginUser: HandlerFunc = async (data: Context) => {
    try {
        if (data.request.headers.get("content-type") !== "application/json") {
            throw new ErrorHandler("Body invalido", 422);
        }
        const body = await (data.body());

        console.log('body :>> ', body);
        if (!Object.keys(body).length) {
            throw new ErrorHandler("O body não pode estar vazio!!", 400);
        }
        let { email, password } = body;

        const existUser: Users[] = await user.find();


        if (existUser) {
            const list = existUser.length
                ? existUser.map((item: any) => {
                    const { _id: { $oid }, name, lastName, email, password } = item;
                    console.log('item :>> ', item);
                    return { id: $oid, name, lastName, email, password };
                }) : [];

            list.find((userReturned) => {

                let passwordSecurity = password as string;

                const passwordHash = await bcrypt.compare(passwordSecurity, userReturned.password);

                let passwordReturned = passwordHash as string;

                if ((email === userReturned.email) && (passwordReturned === userReturned.password)) {

                    await user.insertOne({ email, password });

                    return data.json('Usuário Logado', 200);

                }
            })
            // return data.json(list, 200);
        }



    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
};

