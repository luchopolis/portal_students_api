-- CreateEnum
CREATE TYPE "activity_type" AS ENUM ('TASK', 'MATERIAL');

-- CreateEnum
CREATE TYPE "type_post" AS ENUM ('NORMAL', 'ACTIVITY');

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "code_class" TEXT NOT NULL,
    "removed" BOOLEAN NOT NULL DEFAULT false,
    "teachersId" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "type" "activity_type" NOT NULL,
    "available_to" TIMESTAMP(3),
    "score" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_content" (
    "id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adm_files" (
    "id" SERIAL NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adm_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adm_file_activity_content" (
    "id" SERIAL NOT NULL,
    "activity_content_id" INTEGER NOT NULL,
    "adm_files_id" INTEGER NOT NULL,

    CONSTRAINT "adm_file_activity_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_student" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "score_obtained" INTEGER NOT NULL DEFAULT 0,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adm_file_activity_student" (
    "id" SERIAL NOT NULL,
    "activity_student_id" INTEGER NOT NULL,
    "adm_files_id" INTEGER NOT NULL,

    CONSTRAINT "adm_file_activity_student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_course" (
    "id" SERIAL NOT NULL,
    "course_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,

    CONSTRAINT "student_course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_publications" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "course_id" INTEGER NOT NULL,
    "type" "type_post" NOT NULL,
    "activity_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "class_publications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_teachersId_fkey" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_content" ADD CONSTRAINT "activity_content_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adm_file_activity_content" ADD CONSTRAINT "adm_file_activity_content_activity_content_id_fkey" FOREIGN KEY ("activity_content_id") REFERENCES "activity_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adm_file_activity_content" ADD CONSTRAINT "adm_file_activity_content_adm_files_id_fkey" FOREIGN KEY ("adm_files_id") REFERENCES "adm_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_student" ADD CONSTRAINT "activity_student_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_student" ADD CONSTRAINT "activity_student_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adm_file_activity_student" ADD CONSTRAINT "adm_file_activity_student_activity_student_id_fkey" FOREIGN KEY ("activity_student_id") REFERENCES "activity_student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adm_file_activity_student" ADD CONSTRAINT "adm_file_activity_student_adm_files_id_fkey" FOREIGN KEY ("adm_files_id") REFERENCES "adm_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_publications" ADD CONSTRAINT "class_publications_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_publications" ADD CONSTRAINT "class_publications_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO public."roles" ("id", "name") VALUES (1,'admin'), (2, 'teacher'), (3, 'student') ON CONFLICT ("id") DO NOTHING;