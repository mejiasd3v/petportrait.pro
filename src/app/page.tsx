"use client";

import { useState } from "react";
import { useAccount, useWalletClient, useConnect } from "wagmi";
import ImageUpload from "./components/ImageUpload";
import ThemeSelector from "./components/ThemeSelector";
import GenerateButton from "./components/GenerateButton";
import ImageDisplay from "./components/ImageDisplay";
import { createFetchWithPayment } from "./utils/x402";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("superhero");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { connect, connectors } = useConnect();

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first");
      return;
    }

    if (!isConnected || !walletClient) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // Create fetch with payment handling
      const fetchWithPayment = createFetchWithPayment(walletClient);

      // Prepare form data
      const formData = new FormData();
      const blob = await fetch(uploadedImage).then((r) => r.blob());
      formData.append("image", blob);
      formData.append("theme", selectedTheme);

      // Make request - x402-fetch will automatically handle 402 responses and payment
      const generateResponse = await fetchWithPayment("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Image generation failed");
      }

      const generateData = await generateResponse.json();
      setGeneratedImage(generateData.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 flex-1 flex flex-col">
      <div className="container mx-auto px-4 py-8 md:py-16 flex-1 flex flex-col">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8 md:mb-12">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your pet photos into artistic masterpieces
            </p>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 mb-8">
            {error && (
              <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded">
                {error}
              </div>
            )}

            {isConnected && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-200 rounded text-sm">
                ✅ Wallet connected. Ready to generate portraits with x402 payments.
              </div>
            )}

            <div className="space-y-6">
              <ImageUpload onFileSelect={handleFileSelect} />
              <ThemeSelector
                selectedTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
              {!isConnected ? (
                <GenerateButton
                  onClick={() => {
                    const connector = connectors.find((c) => c.ready);
                    if (connector) {
                      connect({ connector });
                    } else if (connectors.length > 0) {
                      connect({ connector: connectors[0] });
                    }
                  }}
                  disabled={false}
                  isLoading={false}
                  showConnectWallet={true}
                />
              ) : (
                <GenerateButton
                  onClick={handleGenerate}
                  disabled={isLoading || !uploadedImage}
                  isLoading={isLoading}
                  showConnectWallet={false}
                />
              )}
            </div>
          </div>

          {uploadedImage && generatedImage && (
            <ImageDisplay
              originalImage={uploadedImage}
              generatedImage={generatedImage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
