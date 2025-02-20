
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use browser cache
env.allowLocalModels = false;
env.useBrowserCache = true;

interface HealthAlert {
  type: "warning" | "error" | "info";
  message: string;
  recommendation: string;
  confidence: number;
}

type ImageClassificationResult = {
  label: string;
  score: number;
}

export const analyzeImage = async (imageUrl: string): Promise<HealthAlert[]> => {
  try {
    console.log('Starting image analysis...');
    
    // Initialize the image classification pipeline
    const classifier = await pipeline('image-classification', 'Xenova/crop-disease-detection', {
      device: 'webgpu',
    });
    
    // Analyze the image and get the results
    const results = await classifier(imageUrl) as ImageClassificationResult[];
    
    // Map the results to health alerts with proper typing
    return results.map((result) => ({
      type: result.score > 0.7 ? "error" : "warning",
      message: `Detected: ${result.label}`,
      recommendation: getRecommendation(result.label),
      confidence: result.score
    }));
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};

const getRecommendation = (disease: string): string => {
  // Add more disease-specific recommendations here
  const recommendations: Record<string, string> = {
    'healthy': 'Continue current care practices',
    'blight': 'Apply copper-based fungicide and ensure proper air circulation',
    'rust': 'Remove affected leaves and apply appropriate fungicide',
    'leaf_spot': 'Increase plant spacing and avoid overhead watering',
    // Add more diseases and recommendations
  };

  return recommendations[disease.toLowerCase()] || 'Consult with a local agricultural expert';
};
