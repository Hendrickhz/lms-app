"use client";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import { Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  title: string;
  nextChapterId: string | null;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}
const VideoPlayer = ({
  courseId,
  chapterId,
  title,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  return (
    <div className=" relative aspect-video">
      {!isReady && !isLocked && (
        <div className=" bg-slate-800 absolute flex items-center inset-0 justify-center">
          <Loader2 className=" w-8 h-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className=" bg-slate-800 absolute flex flex-col items-center inset-0 justify-center text-secondary gap-y-2">
          <Lock className=" w-8 h-8  " />
          <p className=" text-sm">This chapter is locked.</p>
        </div>
      )}
      {!isLocked && (
        <div>
          <MuxPlayer
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={() => {}}
            autoPlay={true}
            playbackId={playbackId}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
