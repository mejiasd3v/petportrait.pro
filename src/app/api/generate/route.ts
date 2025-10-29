import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

// Configure Fal.ai client with API key
if (process.env.FAL_KEY) {
  fal.config({
    credentials: process.env.FAL_KEY,
  });
} else {
  console.warn(
    "FAL_KEY not found in environment variables. Image generation will fail."
  );
}

/**
 * Image Generation API Route
 * Uses Fal.ai to generate artistic pet portraits
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const theme = formData.get("theme") as string;

    if (!imageFile) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    if (!theme) {
      return NextResponse.json(
        { error: "No theme provided" },
        { status: 400 }
      );
    }

    // Convert theme to prompt
    const themePrompts: Record<string, string> = {
      superhero:
        "Transform this pet into a superhero character with a cape and heroic pose, comic book style, vibrant colors",
      historical:
        "Transform this pet into a historical figure from the Renaissance era, oil painting style, elegant and regal",
      fantasy:
        "Transform this pet into a fantasy character like a wizard or warrior, magical and mystical style, epic fantasy art",
    };

    const prompt =
      themePrompts[theme] ||
      `Transform this pet with an artistic style: ${theme}`;

    // Convert File to blob URL for Fal.ai
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBlob = new Blob([imageBuffer], { type: imageFile.type });

    // Upload image to Fal.ai storage
    const imageUrl = await fal.storage.upload(imageBlob);

    // Generate portrait using Fal.ai nano-banana/edit model
    const result = await fal.subscribe("fal-ai/nano-banana/edit", {
      input: {
        prompt: prompt,
        image_urls: [imageUrl],
        num_images: 1,
        output_format: "jpeg",
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    // Extract image URL from result
    // nano-banana/edit returns images array with url property nested under data
    const generatedImageUrl = result?.data?.images?.[0]?.url;

    if (!generatedImageUrl) {
      console.error("Result structure:", JSON.stringify(result, null, 2));
      throw new Error("Generated image URL not found in response");
    }

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageUrl,
      prompt: prompt,
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Image generation failed. Please try again.",
      },
      { status: 500 }
    );
  }
}

