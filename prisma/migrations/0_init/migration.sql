-- CreateTable
CREATE TABLE "channels" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "isPublic" BOOLEAN DEFAULT false,
    "isVoiceChannel" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "serverID" VARCHAR(255),

    CONSTRAINT "channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" VARCHAR(255) NOT NULL,
    "content" VARCHAR(255) DEFAULT '',
    "imageUrls" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "channelID" VARCHAR(255),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servers" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "isPublic" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),
    "deletedAt" TIMESTAMPTZ(6),

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "servers_name_key" ON "servers"("name");

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_serverID_fkey" FOREIGN KEY ("serverID") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_channelID_fkey" FOREIGN KEY ("channelID") REFERENCES "channels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

