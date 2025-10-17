import express from 'express';
import userController from './controllers/userController.js';
import authorController from './controllers/authorController.js';
import editorController from './controllers/editorController.js';
import categoryController from './controllers/categoryController.js';

const routes = express();

routes.use("/user", userController);
routes.use("/author", authorController);
routes.use("/editor", editorController);
routes.use("/category", categoryController);

export default routes;