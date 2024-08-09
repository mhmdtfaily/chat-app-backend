export interface Message {
  id?: string;
  sender_id: string;
  chat_id: string;
  content: string;
  sent_at: Date;
  delivered_at?: Date;
  read_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
