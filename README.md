# maximo-hacking-rio
Somos o máximo

_Crud system with Deno application_

Modules use:

[abc@v1.0.0-rc2](https://deno.land/x/abc) - For router(Similar Express)

[dotenvc@v1.0.0-rc2](https://deno.land/x/dotenv) - Variables globals in root file

[mongo@v0.6.0](https://deno.land/x/mongo) - MongoDB connection

[typescript@3.9](https://www.typescriptlang.org/) -  Language typed


## Endpoint Router
```
  get /users
  post /newUser
  get /user/:id
  put /user/:id
  delete /user/:id
  get /tasks
  post /newTask
```

## Post

```
{
    "name": "Luan",
    "lasName": "Silva",
    "email": 'luan@luan.com',
    "password": '12345678"
}

Has validation for Header type, if content-type is application/json
Has validation if body data this empty

```
## Update 
```
{
    "name": "Leonardo",
    "lasName": "Oliveira",
    "email": 'leo@leo.com',
    "password": '12345678"
}

Has validation for Header type, if content-type is application/json
Has validation if body data this empty
```

## .ENV
```
DATABASE_NAME=<DATABASE_NAME>
DATABASE_HOST=<URI_MONGO>
```

# Start server
```

deno run -A --unstable ./server.ts
-A => permission for --allow-all
```

# Tags

```
--allow-write write permission
--allow-read read permission
--allow-plugin access to the plugin created by the mongo
--allow-net network access permission
--allow-env permission to access .env in the root folder
--unstable for running unstable packages
--allow-all for running with full permission

```
