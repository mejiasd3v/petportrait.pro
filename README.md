# PetPortrait Pro

A full-stack Next.js web application that transforms uploaded pet photos into artistic portraits using AI. Features micropayments per portrait generation using the x402 payment protocol.

## Features

- 🖼️ **Image Upload**: Upload pet photos in JPG or PNG format
- 🎨 **Theme Selection**: Choose from predefined themes (Superhero, Historical, Fantasy) or create custom prompts
- 💳 **Micropayments**: Pay $0.10 per portrait generation using x402 payment protocol
- 🤖 **AI Generation**: Uses Fal.ai to generate artistic pet portraits
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- 🔗 **Social Sharing**: Download and share generated portraits using Web Share API

## Tech Stack

- **Frontend & Backend**: Next.js 16 with App Router
- **Payments**: x402-next package for micropayment integration
- **AI**: Fal.ai serverless client for image generation
- **Styling**: Tailwind CSS v4
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Fal.ai API key ([Get one here](https://fal.ai/dashboard))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd petportrait.pro
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
# Fal.ai API Key (required)
FAL_KEY=your_fal_ai_api_key_here

# Optional: x402 Payment Configuration
# X402_FACILITATOR_URL=https://x402.org/facilitator
# X402_RECEIVER_ADDRESS=your_payment_receiver_address
# PAYMENT_AMOUNT=0.10
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
petportrait.pro/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ImageUpload.tsx      # File upload component
│   │   │   ├── ThemeSelector.tsx    # Theme selection dropdown
│   │   │   ├── GenerateButton.tsx   # Payment & generation trigger
│   │   │   └── ImageDisplay.tsx     # Display original & generated images
│   │   ├── api/
│   │   │   ├── payment/
│   │   │   │   └── route.ts         # Payment processing endpoint
│   │   │   └── generate/
│   │   │       └── route.ts         # AI image generation endpoint
│   │   ├── page.tsx                 # Main homepage
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   └── ...
├── .env.local                       # Environment variables (create this)
├── package.json
└── README.md
```

## Usage

1. **Upload Photo**: Click the upload area and select a pet photo (JPG or PNG)
2. **Select Theme**: Choose from Superhero, Historical, Fantasy, or enter a custom prompt
3. **Generate Portrait**: Click "Generate Portrait ($0.10)" to initiate payment
4. **View Result**: After payment and generation, view the original and generated images side-by-side
5. **Download/Share**: Download the portrait or share it using the Web Share API

## API Routes

### `/api/payment` (POST)
Handles payment processing using x402 protocol.

**Request Body:**
```json
{
  "amount": 0.1,
  "currency": "USD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "amount": 0.1,
  "currency": "USD"
}
```

### `/api/generate` (POST)
Generates artistic portrait using Fal.ai.

**Request (FormData):**
- `image`: File - Pet photo to transform
- `theme`: string - Theme or custom prompt

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://...",
  "prompt": "Transform this pet..."
}
```

## Configuration

### Fal.ai Models

The app uses Fal.ai's Flux model for image-to-image transformation. You can modify the model in `src/app/api/generate/route.ts`:

- `fal-ai/flux/dev/image-to-image` - Primary model
- `fal-ai/flux/dev` - Fallback model

### Payment Configuration

For production, configure x402 payment settings in `.env.local`:
- `X402_FACILITATOR_URL`: Payment facilitator endpoint
- `X402_RECEIVER_ADDRESS`: Address to receive payments
- `PAYMENT_AMOUNT`: Amount per portrait (default: 0.10)

## Development

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

## Environment Variables

Required:
- `FAL_KEY`: Your Fal.ai API key

Optional:
- `X402_FACILITATOR_URL`: x402 payment facilitator URL
- `X402_RECEIVER_ADDRESS`: Payment receiver address
- `PAYMENT_AMOUNT`: Payment amount in USD (default: 0.10)

## Notes

- **Payment Flow**: Currently uses a simulated payment for MVP demo. For production, integrate with x402 payment protocol properly.
- **Image Generation**: Requires a valid Fal.ai API key. Some models may have rate limits or costs.
- **File Uploads**: Images are uploaded directly to Fal.ai storage, not stored locally.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
