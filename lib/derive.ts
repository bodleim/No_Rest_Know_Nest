import { communityDemandNotes, communityInsightCards, quests } from "@/lib/data";
import {
  AppState,
  CapacityKey,
  CAPACITY_LABELS,
  DiagnosisCategory,
  GrowthInsight,
  InsightsCard,
  Quest,
  QuestLog,
  ResumeDraft,
} from "@/lib/types";

const categoryWeights: Record<DiagnosisCategory, number> = {
  psychological: 3,
  information: 3,
  experience: 2,
  skill: 2,
  social: 2,
};

function scoreQuestMatch(quest: Quest, state: AppState) {
  const diagnosis = state.diagnosis;
  let score = 0;

  if (!diagnosis) {
    return score;
  }

  quest.categories.forEach((category) => {
    score += diagnosis.scores[category] / 10;
    score += categoryWeights[category];
  });

  if (state.profile.activityPreference.includes("비대면") && quest.mode === "비대면") {
    score += 4;
  }

  if (state.profile.availableHours.includes("15") && quest.expectedMinutes <= 15) {
    score += 3;
  }

  if (state.completedQuestIds.includes(quest.id)) {
    score -= 20;
  }

  return score;
}

export function getRecommendedQuests(state: AppState) {
  return [...quests].sort((a, b) => scoreQuestMatch(b, state) - scoreQuestMatch(a, state));
}

export function getQuestById(id: string | null | undefined) {
  return quests.find((quest) => quest.id === id) ?? null;
}

export function buildDerivedStrengths(log: QuestLog, questTitle: string) {
  const strengths = new Set<string>();
  const note = `${questTitle} ${log.note} ${log.reflectionLines.join(" ")}`;

  if (note.includes("정리") || note.includes("기록")) {
    strengths.add("경험을 구조화해 언어로 정리하는 역량");
  }
  if (note.includes("데이터") || note.includes("분석") || note.includes("비교")) {
    strengths.add("정보를 비교하고 핵심 포인트를 추리는 역량");
  }
  if (note.includes("강의") || note.includes("학습") || note.includes("배우")) {
    strengths.add("새로운 도구를 빠르게 학습하는 태도");
  }
  if (note.includes("영상") || note.includes("직무")) {
    strengths.add("직무 이해도를 바탕으로 자기 탐색을 이어가는 태도");
  }

  if (!strengths.size) {
    strengths.add("작은 활동을 끝까지 완료하고 기록으로 남기는 실행력");
  }

  return Array.from(strengths).slice(0, 3);
}

export function buildGrowthInsight(state: AppState): GrowthInsight {
  const totals: Record<CapacityKey, number> = {
    exploration: 0,
    recovery: 0,
    documentation: 0,
    practice: 0,
  };

  state.logs.forEach((log) => {
    const quest = getQuestById(log.questId);
    if (!quest) {
      return;
    }

    quest.capacityTags.forEach((tag) => {
      if (tag === CAPACITY_LABELS.exploration) totals.exploration += 1;
      if (tag === CAPACITY_LABELS.recovery) totals.recovery += 1;
      if (tag === CAPACITY_LABELS.documentation) totals.documentation += 1;
      if (tag === CAPACITY_LABELS.practice) totals.practice += 1;
    });
  });

  return {
    totalLogs: state.logs.length,
    capacityScores: [
      { label: CAPACITY_LABELS.recovery, value: totals.recovery * 22 + 18 },
      { label: CAPACITY_LABELS.exploration, value: totals.exploration * 22 + 20 },
      { label: CAPACITY_LABELS.documentation, value: totals.documentation * 20 + 14 },
      { label: CAPACITY_LABELS.practice, value: totals.practice * 18 + 10 },
    ],
    recentSummaries: state.logs
      .slice()
      .reverse()
      .slice(0, 3)
      .map((log) => {
        const quest = getQuestById(log.questId);

        return {
          title: quest?.title ?? "활동 로그",
          subtitle: log.derivedStrengths[0] ?? "작은 활동을 역량 언어로 바꾸는 중",
        };
      }),
  };
}

export function buildResumeDraft(state: AppState): ResumeDraft {
  const preferredRole = state.profile.desiredRole || "직무 탐색";
  const logs = state.logs.slice().reverse();
  const strengths = new Set<string>();

  logs.forEach((log) => {
    log.derivedStrengths.forEach((strength) => strengths.add(strength));
  });

  const coreStrengths = Array.from(strengths).slice(0, 3);

  const experienceBullets = logs.slice(0, 3).map((log) => {
    const quest = getQuestById(log.questId);
    const firstLine = log.reflectionLines[0] || log.note;

    return `${quest?.title ?? "활동"}를 수행하며 ${firstLine.replace(/\.$/, "")} 관점의 인사이트를 정리했습니다.`;
  });

  const nextRoadmap = getRecommendedQuests(state)
    .slice(0, 3)
    .map((quest) => quest.title);

  return {
    headline: state.profile.name || "이도윤",
    focusLine: `${preferredRole} 중심의 재진입 준비 후보자`,
    coreStrengths:
      coreStrengths.length > 0
        ? coreStrengths
        : [
            "작은 행동을 기록 자산으로 연결하는 실행력",
            "관심 직무를 탐색하며 언어화하는 자기 이해",
            "짧은 실무 노출을 통해 학습 계획을 세우는 태도",
          ],
    experienceBullets:
      experienceBullets.length > 0
        ? experienceBullets
        : [
            "관심 직무와 관련된 정책과 자료를 비교하며 필요한 정보를 선별했습니다.",
            "작은 활동 로그를 기반으로 직무 이해도와 자기 탐색 결과를 정리했습니다.",
          ],
    nextRoadmap:
      nextRoadmap.length > 0
        ? nextRoadmap
        : ["무료 GA 강의 수강", "미니 프로젝트 탐색", "포트폴리오 초안 생성"],
  };
}

export function buildInsightsCards(state: AppState): InsightsCard[] {
  const diagnosticBoost = state.diagnosis ? Math.round(state.diagnosis.readinessScore / 8) : 4;
  const logBoost = state.logs.length * 3;

  return [
    communityInsightCards[0],
    {
      label: "퀘스트 수행률",
      value: `${Math.min(92, 56 + logBoost)}%`,
    },
    {
      label: "오늘의 회복지수",
      value: `${Math.min(88, 42 + diagnosticBoost + logBoost)}점`,
    },
  ];
}

export function buildCommunityNotes(state: AppState) {
  const notes = [...communityDemandNotes];

  if (state.diagnosis) {
    notes.unshift(
      `현재 사용자 입력 기준 ${state.diagnosis.typeLabel} 비중이 높아 회복형 퀘스트 수요가 예상돼요.`,
    );
  }

  return notes.slice(0, 3);
}
