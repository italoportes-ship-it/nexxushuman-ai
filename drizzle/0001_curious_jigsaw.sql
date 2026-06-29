CREATE TABLE `diagnosticos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`empresaNome` varchar(255) NOT NULL,
	`empresaSetor` varchar(100) NOT NULL,
	`empresaPorte` varchar(100) NOT NULL,
	`scoreGeral` int,
	`scoreProntidao` int,
	`scorePotencial` int,
	`scoreUrgencia` int,
	`scoreROI` int,
	`scoreFacilidade` int,
	`dadosCompletos` text,
	`recomendacoesIA` text,
	`status` enum('pendente','processando','concluido') NOT NULL DEFAULT 'pendente',
	`email` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `diagnosticos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`empresa` varchar(255),
	`cargo` varchar(255),
	`mensagem` text,
	`origem` varchar(50) NOT NULL DEFAULT 'contato',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`diagnosticoId` int,
	`fileName` varchar(500) NOT NULL,
	`fileKey` varchar(500) NOT NULL,
	`fileUrl` varchar(1000) NOT NULL,
	`mimeType` varchar(100),
	`fileSize` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `uploads_id` PRIMARY KEY(`id`)
);
