-- CreateTable
CREATE TABLE "Trabalho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estilo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
