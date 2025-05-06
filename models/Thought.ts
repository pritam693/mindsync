import mongoose, { Schema, Document } from 'mongoose';

export interface IThought extends Document {
  text: string;
  mood: 'happy' | 'sad' | 'anxious' | 'calm' | 'angry' | 'neutral';
  createdAt: Date;
}

const ThoughtSchema = new Schema<IThought>({
  text: { type: String, required: true, trim: true, maxlength: 200 },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'calm', 'angry', 'neutral'],
    required: true
  },
  createdAt: { type: Date, default: () => new Date(), expires: 86400 }
});

export default mongoose.models.Thought || mongoose.model<IThought>('Thought', ThoughtSchema);
