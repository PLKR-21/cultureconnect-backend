import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface VoiceReaderProps {
  text: string;
  lang: string;
  isPlaying: boolean;
  onEnd?: () => void;
}

const languageCodes: { [key: string]: string } = {
  'English': 'en-US',
  'French': 'fr-FR',
  'Spanish': 'es-ES',
  'German': 'de-DE',
  'Italian': 'it-IT',
  'Portuguese': 'pt-PT',
  'Russian': 'ru-RU',
  'Japanese': 'ja-JP',
  'Korean': 'ko-KR',
  'Chinese': 'zh-CN',
  'Arabic': 'ar-SA',
  'Hindi': 'hi-IN'
};

export const VoiceReader = ({ text, lang, isPlaying, onEnd }: VoiceReaderProps) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Create utterance instance
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = languageCodes[lang] || 'en-US';
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;

    // Add event listeners
    utteranceRef.current.onend = () => {
      onEnd?.();
    };

    // Cleanup
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [text, lang, onEnd]);

  useEffect(() => {
    if (!utteranceRef.current) return;

    if (isPlaying) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utteranceRef.current);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isPlaying]);

  return null;
};

export default VoiceReader; 