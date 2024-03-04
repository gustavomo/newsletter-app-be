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
const Newsletter_1 = __importDefault(require("../infrastructure/models/Newsletter"));
const Subscriber_1 = __importDefault(require("../infrastructure/models/Subscriber"));
class Newsletter {
    constructor(newsletterRepository, subscriberRepository, emailRepository) {
        this.newsletterRepository = newsletterRepository;
        this.subscriberRepository = subscriberRepository;
        this.emailRepository = emailRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.newsletterRepository.getAll();
                return users;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.newsletterRepository.getOne(id);
                return users;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    create(subject, content, fileUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNewsletter = new Newsletter_1.default({
                    subject: subject,
                    content: content,
                    file_url: fileUrl,
                });
                yield this.newsletterRepository.create(newNewsletter);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    subscribeEmail(newsletterId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSubcriber = new Subscriber_1.default({
                    email: email,
                    newsletter_id: newsletterId,
                });
                yield this.subscriberRepository.create(newSubcriber);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    unsubscribeEmail(subscriberId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.subscriberRepository.remove(subscriberId);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    submit(subscriberId, fromEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsletter = yield this.newsletterRepository.getOne(subscriberId);
                const subscribers = yield this.subscriberRepository.getAllBySubscriberId(subscriberId);
                for (let i = 0; i < subscribers.length; i++) {
                    const subscriber = subscribers[i];
                    yield this.emailRepository.sendEmail(newsletter.file_url, subscriber.email, fromEmail, newsletter.subject, this.addUnlink(newsletter.content, subscriber.id));
                }
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    addUnlink(content, id) {
        return `${content} <br/> <br/> <a href="http://localhost:3001/unsubscribe/${id}">Unsubscribe</a>`;
    }
}
exports.default = Newsletter;
