export type DiagnosisCategory =
  | "psychological"
  | "information"
  | "experience"
  | "skill"
  | "social";

export interface UserProfile {
  name: string;
  desiredRole: string;
  activityPreference: string;
  availableHours: string;
  pauseReason: string;
  extractedTags: string[];
}

export interface RecommendationPath {
  category: DiagnosisCategory;
  title: string;
  subtitle: string;
}

export interface DiagnosisResult {
  scores: Record<DiagnosisCategory, number>;
  primaryCategory: DiagnosisCategory;
  secondaryCategory: DiagnosisCategory;
  typeLabel: string;
  readinessScore: number;
  recommendedPaths: RecommendationPath[];
  extractedTags: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  expectedMinutes: number;
  difficulty: "low" | "medium";
  mode: "비대면" | "혼합";
  categories: DiagnosisCategory[];
  capacityTags: string[];
  stepLabel: string;
  steps: string[];
}

export interface QuestLog {
  id: string;
  questId: string;
  createdAt: string;
  note: string;
  imageDataUrl?: string;
  reflectionLines: string[];
  derivedStrengths: string[];
}

export interface GrowthInsight {
  totalLogs: number;
  capacityScores: Array<{ label: string; value: number }>;
  recentSummaries: Array<{
    title: string;
    subtitle: string;
  }>;
}

export interface ResumeDraft {
  headline: string;
  focusLine: string;
  coreStrengths: string[];
  experienceBullets: string[];
  nextRoadmap: string[];
}

export interface InsightsCard {
  label: string;
  value: string;
}

export interface AppState {
  profile: UserProfile;
  diagnosis: DiagnosisResult | null;
  activeQuestId: string | null;
  completedQuestIds: string[];
  logs: QuestLog[];
}

export const CATEGORY_LABELS: Record<DiagnosisCategory, string> = {
  psychological: "심리 위축형",
  information: "정보 미로형",
  experience: "경력 공백형",
  skill: "역량 부족형",
  social: "사회 고립형",
};

export const CAPACITY_LABELS = {
  exploration: "탐색",
  recovery: "회복",
  documentation: "기록",
  practice: "강화",
};

export type CapacityKey = keyof typeof CAPACITY_LABELS;
