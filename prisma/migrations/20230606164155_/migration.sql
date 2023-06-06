/*
  Warnings:

  - You are about to drop the `Parcela` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parcela" DROP CONSTRAINT "Parcela_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Parcela" DROP CONSTRAINT "Parcela_contaId_fkey";

-- DropForeignKey
ALTER TABLE "Parcela" DROP CONSTRAINT "Parcela_lancamentoId_fkey";

-- DropTable
DROP TABLE "Parcela";

-- CreateTable
CREATE TABLE "parcelas" (
    "id" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "lancamentoId" INTEGER NOT NULL,
    "contaId" INTEGER DEFAULT 0,
    "numeroParcela" INTEGER NOT NULL,
    "vencimento" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_lancamentoId_fkey" FOREIGN KEY ("lancamentoId") REFERENCES "lancamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "contas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
