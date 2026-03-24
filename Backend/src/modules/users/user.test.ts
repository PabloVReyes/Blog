import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { createApp } from '../../app'

const app = createApp()
describe('Users API', () => {
    it('crea usuario', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                email: 'nuevo@test.com',
                password: '123456'
            })

        expect(res.status).toBe(201)
    })

    it('lista usuarios', async () => {
        const res = await request(app).get('/api/users')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
    })

    it('elimina usuario', async () => {
        const res = await request(app).delete('/api/users/1')

        expect([200, 204]).toContain(res.status)
    })

})