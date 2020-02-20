const request = require('supertest')
const app = require('../server')

describe('Post Endpoints', () => {
  it('unsucessful suspend endpoint should return status code 404', async () => {
    const res = await request(app)
      .post('/api/suspend')
      .set('Content-Type', 'application/json')
      .send({
        student:"studentmary@gmail.com"
      })
    expect(res.statusCode).toEqual(204)
  })
})