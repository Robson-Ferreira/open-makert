import request from 'supertest';
import faker from 'faker';
import loadData from '../scripts/loadData';
import Server from '../server/index';

let create;

test('the number of rows in the spreadsheet must be the same as in the database', async () => {
    const xlsxRows = await loadData();
    
    const databaseRows = await request(Server)
    .get('/api/v1/open-market')
    .expect('Content-Type', /json/)
    .expect(200);

    expect(databaseRows.body.length).toBe(xlsxRows.length);
});

test('must create a new record in the database', async () => {
    const bodyTest = {
        name: faker.fake('{{name.title}}'),
        district: faker.fake('{{address.city}}'),
        neighborhood: faker.fake('{{address.streetSuffix}}'),
        region5: faker.fake('{{address.direction}}'),
    }

    const data = await request(Server).post('/api/v1/open-market').send(bodyTest)
    .expect('Content-Type', /json/)
    .expect(200);

    expect(data.body).toHaveProperty('name');
    expect(data.body.name).toBe(bodyTest.name);

    expect(data.body).toHaveProperty('district');
    expect(data.body.district).toBe(bodyTest.district);

    expect(data.body).toHaveProperty('neighborhood');
    expect(data.body.neighborhood).toBe(bodyTest.neighborhood);

    expect(data.body).toHaveProperty('region5');
    expect(data.body.region5).toBe(bodyTest.region5);

    create = data.body;
});

test('should return an error because body is empty', async () => {
    await request(Server).post('/api/v1/open-market').send({})
    .expect('Content-Type', /json/)
    .expect(400);
});

test('must find a record in the database by id', async () => {
    await request(Server)
    .get(`/api/v1/open-market/${create.id}`)
    .expect('Content-Type', /json/)
    .expect(200);
});

test('must allow editing user by id', async () => {
    const data = {
        name: faker.fake('{{name.title}}'),
        district: faker.fake('{{address.city}}'),
        neighborhood: faker.fake('{{address.streetSuffix}}'),
        region5: faker.fake('{{address.direction}}'),
    };

    const res = await request(Server)
    .put(`/api/v1/open-market/${create.id}`).send(data)
    .expect('Content-Type', /json/)
    .expect(200);

    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toBe(data.name);

    expect(res.body).toHaveProperty('district');
    expect(res.body.district).toBe(data.district);

    expect(res.body).toHaveProperty('neighborhood');
    expect(res.body.neighborhood).toBe(data.neighborhood);

    expect(res.body).toHaveProperty('region5');
    expect(res.body.region5).toBe(data.region5);
});

test('must delete a record by id', async () => {
    await request(Server)
    .delete(`/api/v1/open-market/${create.id}`)
    .expect('Content-Type', /json/)
    .expect(200);
});

test('should return an error on delete because id is invalid', async () => {
    await request(Server)
    .delete(`/api/v1/open-market/${-1}`)
    .expect('Content-Type', /json/)
    .expect(400);
});
