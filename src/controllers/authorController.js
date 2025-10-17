import express from "express";
import authorEntity from "../entities/author.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const userRepository = AppDataSource.getRepository(authorEntity);

route.post("/", async (request, response) => {
    // const name = request.body.name;

    const {name, birthday, nationaly} = request.body;

    if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
    }

    if(birthday.includes("-") == false || birthday.length < 9) {
        return response.status(400).send({"response": "O aniversário não pode ser nulo ou vazio!"})
    }

    if(nationaly.length < 2) {
        return response.status(400).send({"response": "A nacionalidade precisa ter no minimo 6 caracteres e no maximo 10!"})
    }

    const newAuthor = userRepository.create({name, birthday, nationaly});

    try {
        await userRepository.save(newAuthor);
        return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`})
    }
});

route.get("/", async (request, response) => {
    const authors = await userRepository.find();
    return response.status(200).send({"response": authors})
});

// route.get("/:authorID", async (request, response) => {
//     try {
//         const { authorID } = request.params;
//         const user = await userRepository.findBy({id: authorID});
//         return response.status(200).send({"response": author});
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
    const {id, name, birthday, nationaly} = request.body;

    try {
        if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        if(birthday.includes("-") == false || birthday.length < 9) {
            return response.status(400).send({"response": "O aniversário não pode ser nulo ou vazio!"})
        }

        if(nationaly.length < 2) {
            return response.status(400).send({"response": "A nacionalidade precisa ter no minimo 6 caracteres e no maximo 10!"})
        }

        await userRepository.update(id, {name, birthday, nationaly});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro ${error}`})
    }
    
});

route.delete("/:idAuthor", async (request, response) => {
    const { idAuthor } = request.params;

    // Soft delete
    await userRepository.update({id: idAuthor}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"resposnse": `usuario excluido com sucesso!`});
});

export default route;