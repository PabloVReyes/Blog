import request from 'supertest'
import { describe, it, expect } from 'vitest'
import { createApp } from '../../app'

const app = createApp()

describe('Auth - Login', () => {

    it('retorna 400 si faltan datos', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({})

        expect(res.status).toBe(400)
    })

    it('retorna 401 con credenciales inválidas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'fake@test.com',
                password: 'wrong123'
            })

        expect(res.status).toBe(401)
    })

    it('retorna 200 y token con credenciales válidas', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@test.com',
                password: '123456'
            })

        expect(res.status).toBe(200)
        expect(res.body.token).toBeDefined()
    })

})