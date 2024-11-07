"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomProfileIndex = void 0;
const generateRandomProfileIndex = () => {
    return Math.floor(Math.random() * 36) + 1;
};
exports.generateRandomProfileIndex = generateRandomProfileIndex;
