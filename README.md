Esse projeto sera um sistema de agendamento de tatuagem!

## Backend

Configure as variaveis de ambiente a partir de `backend/.env.example`.

Rotas publicas:
- `GET /`
- `GET /health`
- `GET /portfolio?page=1&limit=20`
- `GET /portfolio/:id`

Rotas administrativas protegidas por `x-api-key` com o valor de `ADMIN_API_KEY`:
- `POST /portfolio`
- `PUT /portfolio/:id`
- `DELETE /portfolio/:id`
