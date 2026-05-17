"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { defaultName, defaultReflectionLines } from "@/lib/data";
import { diagnoseProfile } from "@/lib/diagnosis";
import { buildDerivedStrengths, getQuestById } from "@/lib/derive";
import { AppState, DiagnosisResult, QuestLog, UserProfile } from "@/lib/types";

const STORAGE_KEY = "nrkn-mobile-state";

const initialProfile: UserProfile = {
  name: defaultName,
  desiredRole: "마케팅/기획",
  activityPreference: "비대면으로 짧게 할 수 있는 활동",
  availableHours: "15분에서 30분",
  pauseReason: "",
  extractedTags: [],
};

const initialState: AppState = {
  profile: initialProfile,
  diagnosis: null,
  activeQuestId: null,
  completedQuestIds: [],
  logs: [],
};

interface AppStateContextValue {
  state: AppState;
  hydrated: boolean;
  setProfileField: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
  commitOnboarding: (profile: UserProfile) => DiagnosisResult;
  runDiagnosis: () => DiagnosisResult;
  startQuest: (questId: string) => void;
  saveQuestLog: (params: {
    questId: string;
    note: string;
    reflectionLines: string[];
    imageDataUrl?: string;
  }) => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setState(JSON.parse(saved) as AppState);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  function setProfileField<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) {
    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        [key]: value,
      },
    }));
  }

  function runDiagnosis() {
    const diagnosis = diagnoseProfile(state.profile);

    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        extractedTags: diagnosis.extractedTags,
      },
      diagnosis,
    }));

    return diagnosis;
  }

  function commitOnboarding(profile: UserProfile) {
    const diagnosis = diagnoseProfile(profile);

    setState((current) => ({
      ...current,
      profile: {
        ...profile,
        extractedTags: diagnosis.extractedTags,
      },
      diagnosis,
    }));

    return diagnosis;
  }

  function startQuest(questId: string) {
    setState((current) => ({
      ...current,
      activeQuestId: questId,
    }));
  }

  function saveQuestLog(params: {
    questId: string;
    note: string;
    reflectionLines: string[];
    imageDataUrl?: string;
  }) {
    const logId = `${params.questId}-${Date.now()}`;
    const questTitle = getQuestById(params.questId)?.title ?? "오늘의 퀘스트";
    const derivedStrengths = buildDerivedStrengths(
      {
        id: logId,
        questId: params.questId,
        createdAt: new Date().toISOString(),
        note: params.note,
        imageDataUrl: params.imageDataUrl,
        reflectionLines:
          params.reflectionLines.length > 0
            ? params.reflectionLines
            : defaultReflectionLines,
        derivedStrengths: [],
      },
      questTitle,
    );

    const nextLog: QuestLog = {
      id: logId,
      questId: params.questId,
      createdAt: new Date().toISOString(),
      note: params.note,
      imageDataUrl: params.imageDataUrl,
      reflectionLines:
        params.reflectionLines.length > 0
          ? params.reflectionLines
          : defaultReflectionLines,
      derivedStrengths,
    };

    setState((current) => ({
      ...current,
      activeQuestId: params.questId,
      completedQuestIds: Array.from(
        new Set([...current.completedQuestIds, params.questId]),
      ),
      logs: [...current.logs, nextLog],
    }));
  }

  function resetDemo() {
    setState(initialState);
  }

  return (
    <AppStateContext.Provider
      value={{
        state,
        hydrated,
        setProfileField,
        commitOnboarding,
        runDiagnosis,
        startQuest,
        saveQuestLog,
        resetDemo,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
