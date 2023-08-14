import ReactPlayer from "react-player";
import { useCurrentLesson, useStore } from "../store";

export function Video() {
  const next = useStore((state) => state.next);
  const { currentLesson } = useCurrentLesson();

  function handleNextPlay() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        onEnded={handleNextPlay}
        url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
      />
    </div>
  );
}
