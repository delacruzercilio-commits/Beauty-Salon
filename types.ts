
export interface UploadedImage {
  id: string;
  dataUrl: string;
  file: File;
}

export interface GenerationResult {
  imageUrl: string;
  timestamp: number;
}
