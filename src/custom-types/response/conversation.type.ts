export interface MessageResponse {
    is_me: boolean;
    message: string;
    date_of_message: Date;
  }
  
  export interface ConversationResponse {
    name: string;
    is_online: boolean;
    last_seen: Date;
    messages: MessageResponse[];
  }
  