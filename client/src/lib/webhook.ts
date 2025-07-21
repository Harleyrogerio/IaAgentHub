import { apiRequest } from "./queryClient";

export interface WebhookMessage {
  agent: string;
  message: string;
  type: "text" | "audio";
  session_id: string;
}

export interface WebhookResponse {
  messages: Array<{
    message: string;
    type?: "text" | "audio";
  }>;
}

export async function sendToWebhook(payload: WebhookMessage): Promise<WebhookResponse> {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    throw new Error("VITE_WEBHOOK_URL environment variable is not configured");
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as WebhookResponse;
  } catch (error) {
    console.error("Webhook error:", error);
    throw error;
  }
}
