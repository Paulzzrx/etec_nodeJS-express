import express from "express";
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
import userEntity from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const userRepository = AppDataSource.getRepository(userEntity);

route.post("/", async (request, response) => {
<<<<<<< HEAD
=======
=======

const route = express.Router();

route.post("/", (request, response) => {
>>>>>>> ae783d3fd5fa3c431654e673cfa10c81e34dce84
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
    // const name = request.body.name;

    const {name, email, password, typeUser} = request.body;

    if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
    }

<<<<<<< HEAD
    if(email.includes("@") == false || email.length < 5) {
=======
<<<<<<< HEAD
    if(email.includes("@") == false || email.length < 5) {
=======
    if(email.Contains("@") == false || email.length < 5) {
>>>>>>> ae783d3fd5fa3c431654e673cfa10c81e34dce84
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
        return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
    }

    if(password.length < 6 || password.length > 10) {
        return response.status(400).send({"response": "A senha precisa ter no minimo 6 caracteres e no maximo 10!"})
    }
    
    if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM") {
        return response.status(400).send({"response": "O tipo de usuário deve ser comum ou admin!"})
    }

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
    const newUser = userRepository.create({name, email, password, typeUser});

    try {
        await userRepository.save(newUser);
        return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`})
    }
});

route.get("/", async (request, response) => {
    const users = await userRepository.find();
    return response.status(200).send({"response": users})
});

// route.get("/:userID", async (request, response) => {
//     try {
//         const { userID } = request.params;
//         const user = await userRepository.findBy({id: userID});
//         return response.status(200).send({"response": user});
//     } catch(error) {
//         return response.status(500).send({"response": `Houve um erro: ${error}`});
//     }
// });

route.get("/:name", async (request, response) => {
    try {
        const { name } = request.params;
        const user = await userRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": user});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`});
    }
});

route.put("/", async (request, response) => {
    const {id, name, email, password, typeUser} = request.body;

    try {
        if(name.length < 2) {
            return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        if(email.includes("@") == false || email.length < 5) {
            return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
        }

        if(password.length < 6 || password.length > 10) {
            return response.status(400).send({"response": "A senha precisa ter no minimo 6 caracteres e no maximo 10!"})
        }   
    
        if(typeUser.toUpperCase() != "ADMIN" && typeUser.toUpperCase() != "COMUM") {
            return response.status(400).send({"response": "O tipo de usuário deve ser comum ou  admin!"})
        }
        await userRepository.update(id, {name, email, password, typeUser});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`})
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro ${error}`})
    }
    
});

<<<<<<< HEAD
route.delete("/:idUser", async (request, response) => {
    const { idUser } = request.params;

    // Hard delete
    // await userRepository.delete({id: idUser});

    // Soft delete
    await userRepository.update({id: idUser}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"resposnse": `usuario excluido com sucesso!`});
});

=======
// route.delete("/", async (request, response) => {
    
// });

=======
    return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
});

>>>>>>> ae783d3fd5fa3c431654e673cfa10c81e34dce84
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c
export default route;