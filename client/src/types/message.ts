export type TMessage = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  partner: {
    id: string;
    display_id: string;
    role: "COMPANY" | "INTERN";
  };
}
