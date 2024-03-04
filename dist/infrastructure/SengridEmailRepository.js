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
const axios_1 = __importDefault(require("axios"));
class SendGridEmailRepository {
    constructor() { }
    sendEmail(url, to, from, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    to,
                    url,
                    from,
                    subject,
                    html,
                };
                const response = yield axios_1.default.post("https://cc6f-181-50-102-142.ngrok-free.app/email", params);
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
    }
}
exports.default = SendGridEmailRepository;
