"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../frameworks/common");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../../entities/user");
const addUserController = (dependencies) => {
    const { useCases: { user: { addUserUseCase } } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body = {} } = req;
            const { name, gender, password, emailId } = body;
            const hashedPassword = yield bcrypt_1.default.hash(password, yield bcrypt_1.default.genSalt(10));
            const addUser = addUserUseCase(dependencies);
            let response = yield addUser.execute({
                password: hashedPassword,
                name,
                emailId,
                gender,
            });
            const token = (0, user_1.generateToken)(JSON.parse(JSON.stringify(response)));
            res.json(new common_1.Response({
                status: true,
                content: { token },
            }));
            next();
        }
        catch (err) {
            console.log("iam worked");
            next(err);
        }
    });
};
exports.default = addUserController;
