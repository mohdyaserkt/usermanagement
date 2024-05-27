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
const user_1 = require("../../entities/user");
const loginUserController = (dependencies) => {
    const { useCases: { user: { loginUserUseCase }, }, } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const { body = {} } = req;
            const { emailId, password } = body;
            const loginUser = loginUserUseCase(dependencies);
            const response = yield loginUser.execute({ emailId, password });
            console.log(response, "check");
            if (response.status) {
                const token = (0, user_1.generateToken)(JSON.parse(JSON.stringify(response === null || response === void 0 ? void 0 : response.user)));
                res.status(200).json(new common_1.Response({
                    status: true,
                    content: { token },
                }));
            }
            else {
                res.status((_a = response === null || response === void 0 ? void 0 : response.errorDetails) === null || _a === void 0 ? void 0 : _a.status).json(new common_1.ResponseError({
                    status: (_b = response === null || response === void 0 ? void 0 : response.errorDetails) === null || _b === void 0 ? void 0 : _b.status,
                    msg: (_c = response === null || response === void 0 ? void 0 : response.errorDetails) === null || _c === void 0 ? void 0 : _c.msg,
                    reason: (_d = response === null || response === void 0 ? void 0 : response.errorDetails) === null || _d === void 0 ? void 0 : _d.reason,
                    ip: "127.0.0.1",
                    url: "/api/v1/userlogin"
                }));
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = loginUserController;
