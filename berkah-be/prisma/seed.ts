// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { uuid, uuidv4 } from "zod/v4";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  await prisma.users.createMany({
    data: [
      {
        id: "3bac99a6-d524-4c08-8301-04a8f9fc6e7c",
        name: "Admin",
        email: "admin@example.com",
        password: await hash("12345678", 10),
        role: "admin",
        createdAt: new Date("2025-06-17T09:30:09.915Z"),
        updatedAt: new Date("2025-06-17T09:30:09.915Z"),
      },
      {
        id: "53a3394b-b7b1-4f2e-b9d6-fe379e0d4afe",
        name: "User",
        email: "user@example.com",
        password: await hash("12345678", 10),
        role: "user",
        createdAt: new Date("2025-06-17T09:30:09.915Z"),
        updatedAt: new Date("2025-06-17T09:30:09.915Z"),
      },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { id: "3af21147-6886-48a0-a6d6-197b949b1f9e", name: "Peralatan Dapur" },
      { id: "48918e9d-5eb1-4a63-a5f3-dd923420fed6", name: "Peralatan Makan" },
    ],
  });

  await prisma.products.createMany({
    data: [
      {
        name: "Cobek",
        price: 15000,
        stock: 20,
        description: "15x15 cm",
        image: "storage/images/cobek.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "3af21147-6886-48a0-a6d6-197b949b1f9e",
      },
      {
        name: "Irus",
        price: 10000,
        stock: 20,
        description: "Panjang 10 cm",
        image: "storage/images/irus.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "3af21147-6886-48a0-a6d6-197b949b1f9e",
      },
      {
        name: "Irus Sayur",
        price: 13000,
        stock: 20,
        description: "Panjang 15 cm",
        image: "storage/images/irus sayur.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "3af21147-6886-48a0-a6d6-197b949b1f9e",
      },
      {
        name: "Sutil",
        price: 10000,
        stock: 20,
        description: "Panjang 15 cm",
        image: "storage/images/sutil.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "3af21147-6886-48a0-a6d6-197b949b1f9e",
      },
      {
        name: "Ulekan",
        price: 15000,
        stock: 20,
        description: "Panjang 8 cm",
        image: "storage/images/ulekan.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "3af21147-6886-48a0-a6d6-197b949b1f9e",
      },
      {
        name: "Sendok",
        price: 8000,
        stock: 20,
        description: "Panjang 13 cm",
        image: "storage/images/sendok.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "48918e9d-5eb1-4a63-a5f3-dd923420fed6",
      },
      {
        name: "Gelas",
        price: 15000,
        stock: 20,
        description: "Panjang 10 cm, Diameter 8 cm",
        image: "storage/images/gelas.png",
        createdAt: new Date(),
        updatedAt: new Date(),
        category_id: "48918e9d-5eb1-4a63-a5f3-dd923420fed6",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
