import request from 'supertest';
import { app } from '../app';

describe('App Index', () => {
  test('GET / with response statusCode 200', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200);
  });
});
