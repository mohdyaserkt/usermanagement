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
const getUserByIdController = (dependencies) => {
    const { useCases: { user: { getUserByIdUseCase } } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { params = {} } = req;
            const { id } = params;
            const getUserById = getUserByIdUseCase(dependencies);
            const response = yield getUserById.execute({ id });
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
exports.default = getUserByIdController;
