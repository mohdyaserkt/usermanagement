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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../frameworks/common");
const updateUserController = (dependencies) => {
    const { useCases: { user: { updateUserUseCase } } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { body = {} } = req;
            const { id, name, lastName, gender, meta } = body;
            const updateUser = updateUserUseCase(dependencies);
            const response = yield updateUser.execute({
                user: {
                    id,
                    name,
                    lastName,
                    gender,
                    meta
                }
            });
            res.json(new common_1.Response({
                status: true,
                content: response
            }));
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = updateUserController;
