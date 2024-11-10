import { Schema, model, models } from 'mongoose';

export interface IPrompt {
  userId: Schema.Types.ObjectId;
  promptText: string;
  responseMatrix: {
    models: Array<{
      name: string;
      probability: number;
    }>;
    selectedModel: string;
  };
  createdAt: Date;
}

const promptSchema = new Schema<IPrompt>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  promptText: { 
    type: String, 
    required: true 
  },
  responseMatrix: {
    models: [{
      name: String,
      probability: Number
    }],
    selectedModel: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Prompt = models.Prompt || model<IPrompt>('Prompt', promptSchema); 