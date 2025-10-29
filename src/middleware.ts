import { paymentMiddleware } from 'x402-next';
import { facilitator } from "@coinbase/x402"; // For mainnet

// Get wallet address from environment variable for mainnet
const RECEIVER_ADDRESS = (process.env.X402_RECEIVER_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

// Configure the payment middleware
export const middleware = paymentMiddleware(
  RECEIVER_ADDRESS, // your receiving wallet address
  {  // Route configurations for protected endpoints
    '/api/generate': {
      price: '$0.10',
      network: "base", // Mainnet
      config: {
        description: 'Generate artistic pet portrait using AI',
        // Optional: Add schemas for better discovery
        inputSchema: {
          type: "object",
          properties: {
            image: {
              type: "string",
              description: "Base64 encoded image file or image URL"
            },
            theme: {
              type: "string",
              description: "Theme for portrait generation (superhero, historical, fantasy, or custom)"
            }
          },
          required: ["image", "theme"]
        },
        outputSchema: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            imageUrl: { type: "string" },
            prompt: { type: "string" }
          }
        }
      } as any, // Type assertion needed due to strict typing
    },
  },
  {
    facilitator // Mainnet facilitator
  }
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/generate',
  ]
};

