export interface SaveMessageRequest {
  chat_id: string;
  sender_id: string;
  content: string;
  date_of_message: Date;
}
