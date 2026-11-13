CREATE TABLE `cards_inbox` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`deck` text NOT NULL,
	`front` text NOT NULL,
	`back` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`receivedAt` integer DEFAULT (cast(strftime('%s', 'now') as integer) * 1000) NOT NULL,
	`state` integer DEFAULT 0 NOT NULL,
	`due_at` integer DEFAULT (cast(strftime('%s', 'now') as integer) * 1000) NOT NULL,
	`stability` real DEFAULT 0 NOT NULL,
	`difficulty` real DEFAULT 0 NOT NULL,
	`scheduled_days` integer DEFAULT 0 NOT NULL,
	`reps` integer DEFAULT 0 NOT NULL,
	`lapses` integer DEFAULT 0 NOT NULL,
	`stability_fast` real DEFAULT 0 NOT NULL,
	`learning_step` integer DEFAULT 0 NOT NULL,
	`reviewedAt` integer,
	`schedule_status` text DEFAULT 'new' NOT NULL,
	CONSTRAINT "status_accepeted_values" CHECK( "cards_inbox"."status" IN ('PENDING', 'ACCEPTED', 'REJECTED'))
);
--> statement-breakpoint
CREATE TABLE `refresh_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`tokenHash` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`revoked` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`passwordHash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);