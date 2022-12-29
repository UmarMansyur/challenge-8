const request = require('supertest');
const app = require('../app');	

describe('history.getHistory function', () => {
  Test('it should response the getHistory method', done => {
    request(app).get('/history').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('jsonapi');
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.jsonapi).toHaveProperty('version');
      expect(response.body.meta).toHaveProperty('author');
      expect(response.body.meta).toHaveProperty('copyright');
      expect(response.body.data).toHaveProperty('username');
      expect(response.body.data).toHaveProperty('history');
      expect(response.body.jsonapi.version).toBe('1.0');
      expect(response.body.meta.author).toBe('Muhammad Umar Mansyur');
      expect(response.body.meta.copyright).toBe('2022 ~ BE JavaScript Binar Academy');
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Data berhasil ditampilkan');
      expect(response.body.data.username).toBe('Khana Zulfana Imam');
      done();
    });
  });
});

// create history
describe('history.createHistory function', () => {
  test('it should response the createHistory method', done => {
    request(app).post('/history').send({username: 'Khana Zulfana Imam', history: 'History 1'}).then(response => {
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('jsonapi');
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.jsonapi).toHaveProperty('version');
      expect(response.body.meta).toHaveProperty('author');
      expect(response.body.meta).toHaveProperty('copyright');
      expect(response.body.data).toHaveProperty('username');
      expect(response.body.data).toHaveProperty('history');
      expect(response.body.jsonapi.version).toBe('1.0');
      expect(response.body.meta.author).toBe('Muhammad Umar Mansyur');
      expect(response.body.meta.copyright).toBe('2022 ~ BE JavaScript Binar Academy');
      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe('Data berhasil ditambahkan');
      expect(response.body.data.username).toBe('Khana Zulfana Imam');
      done();
    });
  });
});

// update history
describe('history.updateHistory function', () => {
  test('it should response the updateHistory method', done => {
    request(app).put('/history/1').send({username: 'Khana Zulfana Imam', history: 'History 1'}).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('jsonapi');
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.jsonapi).toHaveProperty('version');
      expect(response.body.meta).toHaveProperty('author');
      expect(response.body.meta).toHaveProperty('copyright');
      expect(response.body.data).toHaveProperty('username');
      expect(response.body.data).toHaveProperty('history');
      expect(response.body.jsonapi.version).toBe('1.0');
      expect(response.body.meta.author).toBe('Muhammad Umar Mansyur');
      expect(response.body.meta.copyright).toBe('2022 ~ BE JavaScript Binar Academy');
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Data berhasil diubah');
      expect(response.body.data.username).toBe('Khana Zulfana Imam');
      done();
    });
  });
});

// delete history
describe('history.deleteHistory function', () => {
  test('it should response the deleteHistory method', done => {
    request(app).delete('/history/1').then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('jsonapi');
      expect(response.body).toHaveProperty('meta');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('data');
      expect(response.body.jsonapi).toHaveProperty('version');
      expect(response.body.meta).toHaveProperty('author');
      expect(response.body.meta).toHaveProperty('copyright');
      expect(response.body.data).toHaveProperty('username');
      expect(response.body.data).toHaveProperty('history');
      expect(response.body.jsonapi.version).toBe('1.0');
      expect(response.body.meta.author).toBe('Muhammad Umar Mansyur');
      expect(response.body.meta.copyright).toBe('2022 ~ BE JavaScript Binar Academy');
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe('Data berhasil dihapus');
      expect(response.body.data.username).toBe('Khana Zulfana Imam');
      done();
    });
  });
});