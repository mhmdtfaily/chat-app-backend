export type UserResponse = {
    id: string;
    full_name?:string;
    email?:string;
  };
export interface ChatResponse {
  chat_id: string;
  sender_id: string;
  last_message: string;
  date_of_last_message: string;
  sender_name: string;
  is_online: boolean;
}