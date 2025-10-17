import express from "express";
import editorEntity from "../entities/editor.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const userRepository = AppDataSource.getRepository(editorEntity);

route.post("/", async (request, response) => {
    // const name = request.body.name;

    const {name, cnpj, email} = request.body;

    if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
    }

    if(!cnpj.includes("-") || !cnpj.includes(".") || cnpj.length < 7) {
        return response.status(400).send({"response": "O CNPJ precisa ser completo!"})
    }

    if(email.includes("@") == false || email.length < 5) {
        return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
    }

    const newEditor = userRepository.create({name, cnpj, email});

    try {
        await userRepository.save(newEditor);
        return response.status(201).send({"response": `O usuário ${name} foi criado com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`})
    }
});

route.get("/", async (request, response) => {
    const editors = await userRepository.find();
    return response.status(200).send({"response": editors})
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
    const {id, name, cnpj, email} = request.body;

    try {
        if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        if(cnpj.length < 9) {
            return response.status(400).send({"response": "O CNPJ precisa ser completo!"})
        }

        if(email.includes("@") == false || email.length < 5) {
            return response.status(400).send({"response": "O email não pode ser nulo ou vazio!"})
        }

        await userRepository.update(id, {name, cnpj, email});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro ${error}`})
    }
});

route.delete("/:idEditor", async (request, response) => {
    const { idEditor } = request.params;

    // Soft delete
    await userRepository.update({id: idEditor}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"resposnse": `usuario excluido com sucesso!`});
});

export default route;