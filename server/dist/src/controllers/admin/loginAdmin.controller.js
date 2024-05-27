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
const loginAdminController = (dependencies) => {
    const { useCases: { admin: { loginAdminUseCase }, }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { body = {} } = req;
            const { emailId, password } = body;
            const loginAdmin = loginAdminUseCase(dependencies);
            const response = yield loginAdmin.execute({ emailId, password });
            if (response) {
                res.status(200).json(new common_1.Response({
                    status: true,
                    content: {},
                }));
            }
            else {
                res.status((_a = response === null || response === void 0 ? void 0 : response.errorDetails) === null || _a === void 0 ? void 0 : _a.status).json(new common_1.ResponseError({
                    status: 401,
                    msg: 'Login failed Invalid Credentials',
                    reason: 'Invalid Credentials',
                    ip: "127.0.0.1",
                    url: "/api/v1/adminlogin"
                }));
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = loginAdminController;
