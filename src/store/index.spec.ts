import { beforeEach, describe, it, expect } from "vitest";
import { useStore as store } from ".";

const courseMock = {
  modules: [
    {
      id: 1,
      title: "Iniciando com React",
      lessons: [
        { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
        { id: "Jai8w6K_GnY", title: "CSS Modules", duration: "13:45" },
      ],
    },
    {
      id: 2,
      title: "Estrutura da aplicação",
      lessons: [
        {
          id: "gE48FQXRZ_o",
          title: "Componente: Comment",
          duration: "13:45",
        },
      ],
    },
  ],
};

const initialState = store.getState();

describe("store", () => {
  beforeEach(() => {
    store.setState(initialState);
  });

  it("should be able to play", () => {
    const { play } = store.getState();
    play([0, 1]);

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });

  it("should be able to play next video automatically", () => {
    store.setState({ course: courseMock });

    const { next } = store.getState();
    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(0);
    expect(currentLessonIndex).toEqual(1);
  });

  it("should be able to jump to the next module automatically", () => {
    const { next } = store.getState();

    store.setState({ course: courseMock, currentLessonIndex: 1 });

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });

  it("should not update the current module and lesson index if there is no next lesson available", () => {
    const { next } = store.getState();

    store.setState({
      course: courseMock,
      currentLessonIndex: 0,
      currentModuleIndex: 1,
    });

    next();

    const { currentLessonIndex, currentModuleIndex } = store.getState();

    expect(currentModuleIndex).toEqual(1);
    expect(currentLessonIndex).toEqual(0);
  });
});
