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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_1 = require("../../database/mongo");
const entityName = 'User';
const repository = () => {
    // Schema
    const User = mongoose_1.default.model(entityName, mongo_1.schemas.user);
    // Crud executables
    return {
        add: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const mongoObject = new User(user);
            return mongoObject.save();
        }),
        countInc: (userId) => __awaiter(void 0, void 0, void 0, function* () {
            return User.findByIdAndUpdate(userId, {
                $inc: { count: 1 },
                $set: { lastLoginDate: new Date() },
            }, { new: true });
        }),
        update: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = user, updatedData = __rest(user, ["id"]);
            return User.findByIdAndUpdate(id, Object.assign(Object.assign({}, updatedData), { updatedAt: new Date() }), { new: true });
        }),
        delete: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = user;
            return User.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
        }),
        getByEmail: (emailId) => __awaiter(void 0, void 0, void 0, function* () {
            return User.findOne({ emailId: emailId, deletedAt: { $exists: false } });
        }),
        getById: (id) => __awaiter(void 0, void 0, void 0, function* () {
            return User.findOne({ _id: id, deletedAt: { $exists: false } });
        }),
        getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            return User.aggregate([
                { $match: { role: { $ne: 'admin' } } }, // Match documents where role is not admin
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        emailId: 1,
                        gender: {
                            $cond: {
                                if: { $eq: ['$gender', 1] },
                                then: 'male',
                                else: 'female',
                            },
                        },
                        count: 1,
                        lastLoginDate: 1,
                    },
                },
            ]);
        }),
        getUsersCount: () => __awaiter(void 0, void 0, void 0, function* () {
            return User.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: '%B %d', date: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { _id: 1 },
                },
            ]);
        }),
        getTotalUsersCount: () => __awaiter(void 0, void 0, void 0, function* () {
            return User.aggregate([
                {
                    $facet: {
                        totalUserCount: [
                            { $match: { role: 'user' } },
                            { $count: "count" }
                        ],
                        todayLoginCount: [
                            {
                                $match: {
                                    role: 'user',
                                    lastLoginDate: {
                                        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                                        $lt: new Date(new Date().setHours(24, 0, 0, 0))
                                    }
                                }
                            },
                            { $count: "count" }
                        ]
                    }
                }
            ]);
        })
    };
};
exports.default = repository();
