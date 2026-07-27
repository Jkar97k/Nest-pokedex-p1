<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

# 🧩 Proyecto NestJS - Auth & Tasks

---

# 🚀 Guía de Inicio

## 📋 Requisitos Previos

Tener **Nest CLI** instalado globalmente:

```bash
npm i -g @nestjs/cli
```

---

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
pnpm i
```

---

## 🗄️ Configuración de Prisma y Base de Datos

Este proyecto utiliza **Prisma v7** con PostgreSQL.

```bash
# Instalación de Prisma CLI
pnpm add prisma --save-dev

# Inicializar Prisma (crea carpeta prisma y .env)
pnpm exec prisma init

# Cliente y adaptador PostgreSQL
pnpm add  @prisma/client @prisma/adapter-pg

# Generar cliente de Prisma
pnpm exec prisma generate
```

---

## ⚠️ Configuración IMPORTANTE Prisma v7

### 🔧 Generator (solución error ESModules)

En tu archivo `schema.prisma`, agrega:

```prisma
generator client {
  provider      = "prisma-client-js"
  moduleFormat  = "cjs"
}
```

Esto evita errores como:
```
ReferenceError: exports is not defined in ES module scope
```

---

### 🔐 Solución SSL PostgreSQL (Render / Supabase / Neon)

En tu `PrismaService` debes configurar el adaptador con SSL:

```ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Permite certificados autofirmados
      },
    });

    const adapter = new PrismaPg(pool);

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
```

---

## 🔐 Variables de Entorno y Configuración

```bash
pnpm add @nestjs/config dotenv
```

---

## 🔑 Autenticación y Seguridad

```bash
# JWT
pnpm add @nestjs/jwt passport-jwt

# Bcrypt (hash de contraseñas)
pnpm add bcrypt
pnpm add --save-dev @types/bcrypt
```

---

## ▶️ Ejecución en Desarrollo

### Levantar base de datos (requiere Docker)

```bash
docker-compose up -d
```

### Ejecutar migraciones

```bash
pnpm exec prisma migrate dev --name init
```

### Seed de la base de datos

Accede a:

```
http://{baseurl}/api/v2/seed
```

### Iniciar la aplicación

```bash
pnpm start:dev
```

---

## 🧰 Stack Tecnológico

- **Framework:** NestJS  
- **ORM:** Prisma v7  
- **Base de Datos:** PostgreSQL (Docker)  
- **Autenticación:** JWT + Bcrypt  

---

## 📝 Notas adicionales

> 💡 **TIP**
>
> Configura correctamente tu `DATABASE_URL` en el archivo `.env` antes de ejecutar las migraciones de Prisma.
>
> Si usas proveedores como Render, Supabase o Neon, asegúrate de habilitar SSL como se muestra arriba.