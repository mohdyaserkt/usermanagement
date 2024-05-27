"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemas_1 = __importDefault(require("./schemas"));
exports.schemas = schemas_1.default;
const connect = () => {
    const dbConnStr = process.env.DB_CONNECTION_STRING;
    mongoose_1.default.connect(dbConnStr).catch(error => console.error('Connection to mongo has failed.', error));
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'Connection to mongo has failed.'));
    db.once('open', () => {
        console.log('Successfully connected to mongo db cluster');
    });
};
exports.connect = connect;
