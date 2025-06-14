-- CreateTable
CREATE TABLE "FlashCard" (
    "flashcard_id" TEXT NOT NULL,
    "flashcard_title" TEXT NOT NULL,
    "flashcard_content" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashCard_pkey" PRIMARY KEY ("flashcard_id")
);
