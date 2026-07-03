import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, Play, Pause, Upload, SkipBack, SkipForward, 
  Volume2, VolumeX, Trash2
} from 'lucide-react';
import { cn } from '../utils';

interface Track {
  id: string;
  name: string;
  url: string;
}

export default function BardicSoundscapes() {
  // Playlist states - loads custom tracks uploaded by the user from localStorage
  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem('bardic_custom_tracks');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTrack, setCurrentTrack] = useState<Track | null>(() => {
    const saved = localStorage.getItem('bardic_custom_tracks');
    const parsed = saved ? JSON.parse(saved) : [];
    return parsed.length > 0 ? parsed[0] : null;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Synchronize tracks with localStorage
  const saveTracks = (newTracks: Track[]) => {
    setTracks(newTracks);
    localStorage.setItem('bardic_custom_tracks', JSON.stringify(newTracks));
  };

  // Sync Audio playback with currentTrack and isPlaying
  useEffect(() => {
    if (!currentTrack) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
    } else {
      audioRef.current.src = currentTrack.url;
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;
    audio.playbackRate = playbackRate;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn('Playback blocked by browser autoplay policy:', err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  // Sync state modifications to current audio instance
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn('Playback block:', err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle Play/Pause
  const handlePlayPause = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  // Previous & Next controls
  const handleNext = () => {
    if (tracks.length <= 1) return;
    const idx = tracks.findIndex(t => t.id === currentTrack?.id);
    const nextIdx = (idx + 1) % tracks.length;
    setProgress(0);
    setCurrentTrack(tracks[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    if (tracks.length <= 1) return;
    const idx = tracks.findIndex(t => t.id === currentTrack?.id);
    const prevIdx = idx === 0 ? tracks.length - 1 : idx - 1;
    setProgress(0);
    setCurrentTrack(tracks[prevIdx]);
    setIsPlaying(true);
  };

  const handleSeek = (time: number) => {
    setProgress(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Custom Local File Uploads
  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newUploaded: Track[] = (Array.from(files) as File[]).map(file => {
      const url = URL.createObjectURL(file);
      return {
        id: `local_${Date.now()}_${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        url
      };
    });

    const updatedTracks = [...tracks, ...newUploaded];
    saveTracks(updatedTracks);
    if (!currentTrack) {
      setCurrentTrack(newUploaded[0]);
    }
    setIsPlaying(true);
  };

  const removeTrack = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = tracks.filter(t => t.id !== id);
    saveTracks(updated);
    if (currentTrack?.id === id) {
      if (updated.length > 0) {
        setCurrentTrack(updated[0]);
        setIsPlaying(true);
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <Music className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-md font-serif tracking-widest text-slate-200 uppercase font-bold flex items-center gap-2">
              Bardic Soundscapes
            </h3>
            <p className="text-[10px] text-slate-500 font-serif italic truncate max-w-[200px] md:max-w-[300px]">
              {currentTrack ? currentTrack.name : 'No track selected'}
            </p>
          </div>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-serif cursor-pointer transition-all hover:border-slate-700 shadow-md">
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload Audio</span>
          <input 
            type="file" 
            accept="audio/*" 
            multiple 
            onChange={handleLocalUpload} 
            className="hidden" 
          />
        </label>
      </div>

      {/* Main Track Manager & Player */}
      <div className="space-y-4">
        {/* Playlist Codex */}
        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-900 flex flex-col min-h-[120px] max-h-[180px]">
          <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-900">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Bardic Codex</span>
            <span className="text-[9px] text-slate-600 font-mono">Custom Ambiance List</span>
          </div>

          {tracks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <p className="text-[11px] text-slate-600 font-serif italic">
                Codex is empty. Upload audio files to customize your campaign soundscapes!
              </p>
            </div>
          ) : (
            <div className="space-y-1 overflow-y-auto pr-1 flex-1 hide-scrollbar">
              {tracks.map(track => (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(track);
                    setIsPlaying(true);
                  }}
                  className={cn(
                    "w-full text-left py-2 px-3 rounded-xl text-xs font-serif transition-all duration-300 border flex items-center justify-between gap-2 group cursor-pointer",
                    currentTrack?.id === track.id
                      ? "bg-amber-500/10 text-amber-300 border-amber-500/30 font-bold"
                      : "text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/40"
                  )}
                >
                  <span className="truncate pr-1 text-[11px]">{track.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {currentTrack?.id === track.id && isPlaying && (
                      <span className="flex gap-0.5 items-end h-3">
                        <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.6s_infinite_alternate]" style={{ height: '40%' }} />
                        <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.4s_infinite_alternate]" style={{ height: '80%' }} />
                        <span className="w-0.5 bg-amber-400 rounded-full animate-[pulse_0.8s_infinite_alternate]" style={{ height: '50%' }} />
                      </span>
                    )}
                    <button 
                      onClick={(e) => removeTrack(track.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-600 hover:text-rose-400 rounded-md hover:bg-rose-500/10 transition-all duration-200"
                      title="Remove track"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audio Controls Console */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 space-y-3">
          {/* Progress Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={(e) => handleSeek(parseFloat(e.target.value))}
              disabled={!currentTrack}
              className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:opacity-35"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={tracks.length <= 1}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40 disabled:hover:bg-slate-900"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                disabled={!currentTrack}
                className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] flex items-center justify-center disabled:opacity-45"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                disabled={tracks.length <= 1}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-slate-400 hover:text-slate-200 transition-colors disabled:opacity-40 disabled:hover:bg-slate-900"
                title="Next track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* Playback speed selector */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            <span>Ambiance Speed / Tempo:</span>
            <div className="flex items-center gap-1.5">
              {[0.75, 1.0, 1.25, 1.5].map(rate => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={cn(
                    "px-1.5 py-0.5 rounded border text-[9px] transition-all",
                    playbackRate === rate 
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300 font-bold"
                      : "border-slate-800 hover:border-slate-700 text-slate-400"
                  )}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
