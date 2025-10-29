import { NextResponse } from "next/server";

/**
 * LLMs.txt endpoint - Documentation for LLMs about PetPortrait Pro
 * Provides information about the app API and x402 payment integration
 */
export async function GET() {
  const documentation = `# PetPortrait Pro - API Documentation

## Overview
PetPortrait Pro is a web application that transforms pet photos into artistic portraits using AI. The service uses the x402 payment protocol for pay-per-use API access.

## Payment Integration (x402 Protocol)

### Payment Details
- **Price**: $0.10 per image generation
- **Network**: Base (mainnet)
- **Payment Protocol**: x402 (HTTP 402 Payment Required)
- **Payment Handler**: Automatic payment processing via x402-fetch wrapper

### How Payments Work
1. Users must connect a crypto wallet (supports Coinbase Wallet, WalletConnect, etc.)
2. The \`/api/generate\` endpoint is protected by x402 payment middleware
3. When making a request, if payment is required, the client receives a 402 Payment Required response
4. The x402-fetch wrapper automatically handles the payment flow:
   - Detects 402 response
   - Initiates payment transaction
   - Retries the request after successful payment
5. Payments are processed on-chain using the Base network

## API Endpoint

### POST /api/generate

Generates an artistic portrait of a pet from an uploaded image.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body Parameters:
  - \`image\` (File): Pet photo image file (required)
  - \`theme\` (String): Theme for portrait generation (required)
    - Options: "superhero", "historical", "fantasy", or custom theme string

**Payment:** Requires x402 payment ($0.10) via authenticated wallet connection

**Response:**
\`\`\`json
{
  "success": true,
  "imageUrl": "https://fal.ai/files/...",
  "prompt": "Transform this pet into a superhero character..."
}
\`\`\`

**Error Response:**
\`\`\`json
{
  "success": false,
  "error": "Error message"
}
\`\`\`

**Status Codes:**
- 200: Success - Image generated
- 400: Bad Request - Missing image or theme
- 402: Payment Required - Wallet not connected or payment needed
- 500: Server Error - Generation failed

## Available Themes

1. **superhero**: Transform pet into a superhero character with cape and heroic pose, comic book style
2. **historical**: Transform pet into a Renaissance historical figure, oil painting style
3. **fantasy**: Transform pet into a fantasy character (wizard/warrior), epic fantasy art style
4. Custom themes can be passed as strings

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **AI Model**: Fal.ai (nano-banana/edit model)
- **Payment**: x402 protocol via @coinbase/x402
- **Blockchain**: Base Network (mainnet)
- **Wallet Integration**: Coinbase OnchainKit, Wagmi

## Usage Example

1. Upload a pet image file
2. Select a theme (superhero, historical, fantasy, or custom)
3. Connect your crypto wallet
4. Click "Generate Portrait"
5. Payment is automatically processed via x402
6. Receive the generated artistic portrait

## Important Notes

- Wallet must be connected before generating portraits
- Payment is required for each generation request
- Configured for Base mainnet
- Receiving wallet address configured via X402_RECEIVER_ADDRESS environment variable
- Fal.ai API key required via FAL_KEY environment variable
`;

  return new NextResponse(documentation, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}


