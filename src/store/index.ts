import { create } from "zustand";
import { api } from "../services/api";

interface ICourse {
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface IPlayerState {
  course: ICourse | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoading: boolean;

  load: () => Promise<void>;
  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
}

export const useStore = create<IPlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,

    load: async () => {
      const response = await api.get("/course");

      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      });
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();

      const nextLessonIndex = currentLessonIndex + 1;

      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          currentLessonIndex: nextLessonIndex,
        });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          });
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentLessonIndex, currentModuleIndex } = state;
    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
