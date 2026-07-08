CREATE TABLE `propostas` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(20) NOT NULL,
	`empresaNome` varchar(255) NOT NULL,
	`planoSelecionado` varchar(50),
	`dadosExtras` text,
	`visualizacoes` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `propostas_id` PRIMARY KEY(`id`),
	CONSTRAINT `propostas_slug_unique` UNIQUE(`slug`)
);
