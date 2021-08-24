import request from 'supertest';
import Server from '../server/index';

let create;

test('must create a new record in the database', async () => {
    await request(Server).post('/api/v1/open-market').send({
        name: `example`,
        district: `example`,
        neighborhood: `example`,
        region5: `example`,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then((data) => {
        create = data.body;
    })
});

test('should return an error because body is empty', async () => {
    await request(Server).post('/api/v1/open-market').send({})
    .expect('Content-Type', /json/)
    .expect(500)
});

test('must find a record in the database by id', async () => {
    await request(Server)
    .get(`/api/v1/open-market/${create.id}`)
    .expect('Content-Type', /json/)
    .expect(200)
});

test('must allow editing user by id', async () => {
    await request(Server)
    .put(`/api/v1/open-market/${create.id}`).send({
        name: `example`,
        district: `example`,
        neighborhood: `example`,
        region5: `example`,
    })
    .expect('Content-Type', /json/)
    .expect(200)
});

test('must delete a record by id', async () => {
    await request(Server)
    .delete(`/api/v1/open-market/${create.id}`)
    .expect('Content-Type', /json/)
    .expect(200)
});

test('should return an error', async () => {
    await request(Server)
    .delete(`/api/v1/open-market/65498446546`)
    .expect('Content-Type', /json/)
    .expect(500)
});