"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./infrastructure/models"));
const NewsletterController_1 = __importDefault(require("./infrastructure/NewsletterController"));
const config_1 = __importDefault(require("./shared/config"));
const app = (0, express_1.default)();
const upload = (0, multer_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(express_1.default.json());
app.get('/api/v1/newsletters', NewsletterController_1.default.getAll);
app.get('/api/v1/newsletters/:id', NewsletterController_1.default.getOne);
app.post('/api/v1/newsletters', NewsletterController_1.default.create);
app.post('/api/v1/newsletters/:id/emails', NewsletterController_1.default.subscribeEmail);
app.delete('/api/v1/newsletters/:newsletterId/subscribers/:subscriberId', NewsletterController_1.default.unsubscribeEmail);
app.post('/api/v1/upload', upload.single('file'), NewsletterController_1.default.uploadFile);
app.post('/api/v1/newsletters/:id/submit', NewsletterController_1.default.submit);
models_1.default.sync()
    .then(() => {
    app.listen(config_1.default.PORT, () => {
        console.log(`Server is running on port ${config_1.default.PORT}`);
    });
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
