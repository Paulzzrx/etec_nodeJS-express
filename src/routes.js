import express from 'express';
<<<<<<< HEAD
import userController from './controllers/userController.js';
import authorController from './controllers/authorController.js';
import editorController from './controllers/editorController.js';
import categoryController from './controllers/categoryController.js';
=======
import userController from './controllers/userController.js'
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c

const routes = express();

routes.use("/user", userController);
<<<<<<< HEAD
routes.use("/author", authorController);
routes.use("/editor", editorController);
routes.use("/category", categoryController);
=======
>>>>>>> ff87df1d2724ccf520512806bc6bc3e4f084294c

export default routes;