import mongoose from "mongoose";
import { logger } from "./utils/logger";

mongoose.connect('mongodb://localhost/testdb')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));