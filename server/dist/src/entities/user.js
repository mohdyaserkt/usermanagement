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
exports.generateToken = exports.comparePasswords = exports.userConstants = exports.User = exports.Genders = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Genders;
(function (Genders) {
    Genders[Genders["NOT_SPECIFIED"] = 0] = "NOT_SPECIFIED";
    Genders[Genders["FEMALE"] = 1] = "FEMALE";
    Genders[Genders["MALE"] = 2] = "MALE";
})(Genders || (exports.Genders = Genders = {}));
class User {
    constructor({ id, name = null, emailId = null, gender = Genders.NOT_SPECIFIED, password = null }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.emailId = emailId;
        this.gender = gender;
    }
}
exports.User = User;
exports.userConstants = {
    genders: Genders
};
const comparePasswords = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcrypt_1.default.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.error('Error comparing passwords:', error);
        return error;
    }
});
exports.comparePasswords = comparePasswords;
const generateToken = (payload) => {
    console.log(typeof (payload), "iam slll");
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
