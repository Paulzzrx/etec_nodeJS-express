import express from "express";
import categoryEntity from "../entities/category.js";
import { AppDataSource } from "../database/data-source.js";
import { Like } from "typeorm";

const route = express.Router();
const userRepository = AppDataSource.getRepository(categoryEntity);

route.post("/", async (request, response) => {
    // const name = request.body.name;

    const {name, birthday, nationaly} = request.body;

    if(name.length < 2) {
        return response.status(400).send({"response": "A categoria não pode ser nulo ou vazio!"})
    }

    const newCategory = userRepository.create({name, birthday, nationaly});

    try {
        await userRepository.save(newCategory);
        return response.status(201).send({"response": `A categoria ${name} foi criada com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`})
    }
});

route.get("/", async (request, response) => {
    const category = await userRepository.find();
    return response.status(200).send({"response": category})
});

route.get("/:name", async (request, response) => {
    try {
        const { name } = request.params;
        const category = await userRepository.findBy({name: Like(`%${name}%`)});
        return response.status(200).send({"response": category});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro: ${error}`});
    }
});

route.put("/", async (request, response) => {
    const {id, name} = request.body;

    try {
        if(name.length < 2) {
        return response.status(400).send({"response": "O usuário não pode ser nulo ou vazio!"})
        }

        await userRepository.update(id, {name});
        return response.status(200).send({"response": `Dados atualizados com sucesso!`});
    } catch(error) {
        return response.status(500).send({"response": `Houve um erro ${error}`})
    }
    
});

route.delete("/:idAuthor", async (request, response) => {
    const { idCategory } = request.params;

    // Soft delete
    await userRepository.update({id: idCategory}, {deletedAt: () => "CURRENT_TIMESTAMP"});
    return response.status(200).send({"resposnse": `usuario excluido com sucesso!`});
});

export default route;