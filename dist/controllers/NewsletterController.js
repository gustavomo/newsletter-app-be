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
const Newsletter_1 = __importDefault(require("../domain/Newsletter"));
const PostgresNewsletterRepository_1 = require("../infra/PostgresNewsletterRepository");
const PostgresSubscriberRepository_1 = require("../infra/PostgresSubscriberRepository");
const S3FileRepository_1 = __importDefault(require("../infra/S3FileRepository"));
const SengridEmailRepository_1 = __importDefault(require("../infra/SengridEmailRepository"));
class NewsletterController {
    getAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsletterInstance = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository());
                const newsletters = yield NewsletterInstance.getAll();
                res.json(newsletters);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsletterInstance = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository());
                const newsletter = yield NewsletterInstance.getOne(parseInt(req.params.id));
                res.json(newsletter);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsletterInstance = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository());
                yield NewsletterInstance.create(req.body.subject, req.body.content, req.body.file_url);
                res.json({ message: 'OK' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    subscribeEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsletterInstance = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository(), new PostgresSubscriberRepository_1.PostgresSubscriberRepository());
                yield NewsletterInstance.subscribeEmail(parseInt(req.params.id), req.body.email);
                res.json({ message: 'OK' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    unsubscribeEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const NewsletterInstance = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository(), new PostgresSubscriberRepository_1.PostgresSubscriberRepository());
                yield NewsletterInstance.unsubscribeEmail(parseInt(req.params.subscriberId));
                res.json({ message: 'OK' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    res.status(400).json({ error: 'No file provided' });
                    return;
                }
                const file = req.file;
                const bucketName = process.env.BUCKET_NAME;
                const key = `${file.originalname}`;
                const s3FileRepository = new S3FileRepository_1.default();
                const s3Url = yield s3FileRepository.uploadFile(file, bucketName, key);
                res.json({ url: s3Url });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    submit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newsletter = new Newsletter_1.default(new PostgresNewsletterRepository_1.PostgresNewsletterRepository(), new PostgresSubscriberRepository_1.PostgresSubscriberRepository(), new SengridEmailRepository_1.default());
                yield newsletter.submit(parseInt(req.params.id), process.env.FROM_EMAIL);
                res.json({ message: 'OK' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = new NewsletterController();
