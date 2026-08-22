-- CreateTable
CREATE TABLE "profiles" (
    "username" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("username")
);

ALTER TABLE "profiles"
  ADD CONSTRAINT "profiles_username_format"
  CHECK ("username" ~ '^[a-z0-9_]{2,32}$');
