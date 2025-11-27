"use client";

import {useChat} from "@ai-sdk/react";
import {type ChatStatus, DefaultChatTransport, type UIMessage} from "ai";
import {useImperativeHandle, useRef} from "react";

import {cn} from "@/lib/cn";

export function Chat() {
  const formRef = useRef<React.ComponentRef<typeof Form>>(null);
  const {messages, status, sendMessage} = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    onFinish() {
      formRef.current?.focusInput();
    },
  });
  return (
    <div className={cn("flex h-full flex-col")}>
      <Messages messages={messages} />
      <Form
        ref={formRef}
        status={status}
        action={(formData) => {
          const text = formData.get("text");
          if (typeof text === "string") {
            sendMessage({
              text,
            });
          }
        }}
      />
    </div>
  );
}

function Messages({messages}: {messages: UIMessage[]}) {
  return (
    <div className={cn("flex-1 overflow-y-auto p-4")}>
      {messages.map((m) => (
        <div
          key={m.id}
          className={cn("chat", m.role === "user" ? "chat-end" : "chat-start")}>
          <div
            className={cn(
              "chat-bubble",
              m.role === "user" && "chat-bubble-primary",
            )}>
            {m.parts.map((p, i) =>
              p.type === "text" ? <span key={i}>{p.text}</span> : null,
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

interface FormProps {
  ref: React.Ref<{focusInput: () => void}>;
  status: ChatStatus;
  action: (formData: FormData) => void;
}

function Form({ref, status, action}: FormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    },
  }));
  const disabled = status !== "ready";
  return (
    <form className={cn("flex gap-2 p-4")} action={action}>
      <input
        ref={inputRef}
        name="text"
        type="text"
        placeholder="Type your message..."
        disabled={disabled}
        autoFocus
        required
        className={cn("input input-bordered flex-1")}
      />
      <button
        type="submit"
        disabled={disabled}
        className={cn("btn btn-primary")}>
        Send
      </button>
    </form>
  );
}
