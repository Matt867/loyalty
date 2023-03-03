const { CreateToken } = require("../main/middlewares/functions")
const request = require("supertest")
const app = require('../main/app')
const seed = require('../main/db/seed');

beforeAll(async () => {
    await seed()
})

describe('Testing account management', () => {
    test('POST /accountManagement/newBusiness', async () => {
        const payload = { username: "Matt", password: "123", businessName: "Business"}
        const response = await request(app)
            .post('/accountManagement/newBusiness')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(201)
    });
    
    test('POST /accountManagement/newConsumer', async () => {
        const payload = { username: "MattConsumer", password: "123" }
        const response = await request(app)
            .post('/accountManagement/newConsumer')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(201)
    });
    
    test('POST /accountManagement/businessLogin', async () => {
        const payload = { username: "Matt", password: "123" }
        const response = await request(app)
            .post('/accountManagement/businessLogin')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    });
    
    test('POST /accountManagement/businessLogin', async () => {
        const payload = { username: "MattConsumer", password: "123" }
        const response = await request(app)
            .post('/accountManagement/consumerLogin')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    });
    
    test('POST /accountManagement/newBusiness', async () => {
        const payload = { username: "", password: "123", businessName: "Business"}
        const response = await request(app)
            .post('/accountManagement/newBusiness')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
    test('POST /accountManagement/newBusiness', async () => {
        const payload = { username: "asdf", password: "", businessName: "Business"}
        const response = await request(app)
            .post('/accountManagement/newBusiness')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
    
    test('POST /accountManagement/newConsumer', async () => {
        const payload = { username: "", password: "123"}
        const response = await request(app)
            .post('/accountManagement/newConsumer')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
    test('POST /accountManagement/newConsumer', async () => {
        const payload = { username: "asdf", password: "" }
        const response = await request(app)
            .post('/accountManagement/newConsumer')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
    
    test('POST /accountManagement/businessLogin', async () => {
        const payload = { username: "1235324324", password: "123" }
        const response = await request(app)
            .post('/accountManagement/businessLogin')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
    
    test('POST /accountManagement/businessLogin', async () => {
        const payload = { username: "MattC64643535onsumer", password: "123" }
        const response = await request(app)
            .post('/accountManagement/consumerLogin')
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(400)
    });
})