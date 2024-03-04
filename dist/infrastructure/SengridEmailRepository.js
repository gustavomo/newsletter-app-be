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
const mail_1 = __importDefault(require("@sendgrid/mail"));
class SendGridEmailRepository {
    constructor() {
        this.getUrlContent = (url) => __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
            const base64Content = Buffer.from(response.data, 'binary').toString('base64');
            return base64Content;
        });
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    }
    sendEmail(url, to, from, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const content = yield this.getUrlContent(url);
                const extension = this.getExtension(url);
                const msg = {
                    to,
                    from,
                    subject,
                    text: 'newsletter system',
                    html,
                    attachments: [
                        {
                            content,
                            filename: `attachment.${extension}`,
                            type: `application/${extension}`,
                            disposition: 'attachment'
                        }
                    ]
                };
                yield mail_1.default.send(msg);
            }
            catch (error) {
                console.error('Error sending email:', error.response.body);
                // throw new Error('Error sending email');
            }
        });
    }
    getExtension(url) {
        return url.split('.').pop();
    }
}
exports.default = SendGridEmailRepository;
