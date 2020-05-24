import { Router } from "https://deno.land/x/oak/mod.ts";

import {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
  } from "./controllers/Users/index.ts";
  
  import {
    getTasks,
    createTask,
  } from "./controllers/Tasks/index.ts";

export const router = new Router();
router
    .get("/users", getAllUsers)
    .post("/users", createUser)
    .get("/user/:id", getUser)
    .put("/user/:id", updateUser)
    .delete("/user/:id", deleteUser)
    .get("/tasks", getTasks)
    .post("/newTask", createTask)




