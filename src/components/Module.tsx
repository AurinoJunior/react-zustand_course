import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useStore } from "../store";

import { Lesson } from "./Lesson";

interface IModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ title, amountOfLessons, moduleIndex }: IModuleProps) {
  const { currentLessonIndex, currentModuleIndex, lessons, play } = useStore(
    (state) => {
      const { currentModuleIndex, currentLessonIndex } = state;
      const lessons = state.course?.modules[moduleIndex].lessons;

      return {
        lessons,
        currentModuleIndex,
        currentLessonIndex,
        play: state.play,
      };
    }
  );

  const [isOpen, setIsOpen] = useState(
    currentModuleIndex === moduleIndex ? true : false
  );

  function handleOpenOrClosedModule() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button
        className="flex w-full items-center gap-3 bg-zinc-800 p-4"
        onClick={handleOpenOrClosedModule}
      >
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown
          className={`w-5 h-5 ml-auto text-zinc-400 ${
            isOpen && "rotate-180 transition-transform"
          }`}
        />
      </button>

      {isOpen && (
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map(({ title, duration, id }, lessonIndex) => {
            const isCurrent =
              currentModuleIndex === moduleIndex &&
              currentLessonIndex === lessonIndex;

            return (
              <Lesson
                key={id}
                title={title}
                duration={duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      )}
    </div>
  );
}
