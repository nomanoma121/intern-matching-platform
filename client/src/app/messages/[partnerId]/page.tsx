"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useMessage } from "./internal/use-message";
import { useParams } from "next/navigation";
import { css } from "@styled-system/css";
import { useAuth } from "@/provider/auth";
import { Container } from "@/components/container";

const Message = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const { messages, loading, error, sendMessage } = useMessage(partnerId);
  const { user } = useAuth();

  if (!user || !partnerId) return null;

  return (
    <div>
      <Container>
        <h1
          className={css({
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
          })}
        >
          Messages with {partnerId} さん
        </h1>
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          })}
        >
          {loading && <p>Loading...</p>}
          {messages.map((message) => (
            <div
              key={message.id}
              className={css({
                padding: "16px",
                borderRadius: "8px",
                backgroundColor:
                  message.sender_id === user.display_id
                    ? "blue.100"
                    : "gray.100",
                alignSelf:
                  message.sender_id === user.display_id
                    ? "flex-end"
                    : "flex-start",
              })}
            >
              <p>{message.content}</p>
            </div>
          ))}
          {error && <p className={css({ color: "red.500" })}>{error}</p>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const content = formData.get("content") as string;
              if (content) {
                sendMessage(content);
                e.currentTarget.reset();
              }
            }}
            className={css({
              display: "flex",
              gap: "16px",
            })}
          >
            <Input
              name="content"
              placeholder="Type your message..."
              className={css({
                flex: 1,
              })}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Message;
