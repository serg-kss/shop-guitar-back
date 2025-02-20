/*
  Warnings:

  - You are about to drop the `ProductsOnCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductsOnCategories" DROP CONSTRAINT "ProductsOnCategories_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCategories" DROP CONSTRAINT "ProductsOnCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsOnCategories" DROP CONSTRAINT "ProductsOnCategories_productId_fkey";

-- DropTable
DROP TABLE "ProductsOnCategories";

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
