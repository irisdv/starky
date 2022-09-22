import {
  Entity,
  Column,
  ManyToOne,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";
import { DiscordServer } from "./DiscordServer";

@Entity()
@Index(["discordMemberId", "discordServerId", "deletedAt"], {
  unique: true,
  where: '"deletedAt" IS NOT NULL',
})
@Index(["discordMemberId", "discordServerId"], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class DiscordMember {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  discordMemberId: string;

  @Column()
  discordServerId: string;

  @ManyToOne((type) => DiscordServer, (server) => server.members)
  discordServer: DiscordServer;

  @Column({ nullable: true })
  starknetWalletAddress?: string;

  @Column()
  customLink: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
