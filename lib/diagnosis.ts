import { buildTypeLabel, recommendationPathMap } from "@/lib/data";
import {
  CATEGORY_LABELS,
  DiagnosisCategory,
  DiagnosisResult,
  RecommendationPath,
  UserProfile,
} from "@/lib/types";

const keywordMap: Record<DiagnosisCategory, string[]> = {
  psychological: [
    "불안",
    "무기력",
    "자신감",
    "부담",
    "위축",
    "두려",
    "쉬고",
    "지쳤",
    "막막",
  ],
  information: [
    "정보",
    "정책",
    "공고",
    "찾",
    "비교",
    "탐색",
    "모르겠",
    "어디",
  ],
  experience: [
    "경험",
    "이력서",
    "프로젝트",
    "포트폴리오",
    "경력",
    "정리",
    "쓸게",
    "실적",
  ],
  skill: [
    "역량",
    "부족",
    "실무",
    "강의",
    "공부",
    "배우",
    "스킬",
    "자격",
  ],
  social: [
    "혼자",
    "상담",
    "사람",
    "소통",
    "고립",
    "커뮤니티",
    "대면",
    "밖",
  ],
};

const positiveSignals = ["괜찮", "시작", "해보고", "가능", "조금", "관심"];
const distressSignals = ["무섭", "부담", "떨", "막막", "지쳤", "어렵"];

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function extractTags(text: string) {
  const tags = new Set<string>();
  const words = text
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  words.forEach((word) => {
    if (word.length >= 2) {
      tags.add(word);
    }
  });

  return Array.from(tags).slice(0, 8);
}

function rankCategories(scores: Record<DiagnosisCategory, number>) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([category]) => category as DiagnosisCategory);
}

function buildRecommendedPaths(
  primaryCategory: DiagnosisCategory,
  secondaryCategory: DiagnosisCategory,
): RecommendationPath[] {
  const ranked = [
    primaryCategory,
    secondaryCategory,
    ...(
      ["psychological", "information", "experience", "skill", "social"] as DiagnosisCategory[]
    ).filter(
      (category) =>
        category !== primaryCategory && category !== secondaryCategory,
    ),
  ];

  return ranked.slice(0, 3).map((category) => recommendationPathMap[category]);
}

export function diagnoseProfile(profile: UserProfile): DiagnosisResult {
  const textBlob = normalizeText(
    [
      profile.pauseReason,
      profile.desiredRole,
      profile.activityPreference,
      profile.availableHours,
    ].join(" "),
  );

  const scores: Record<DiagnosisCategory, number> = {
    psychological: 28,
    information: 24,
    experience: 22,
    skill: 22,
    social: 18,
  };

  const extractedTags = extractTags(textBlob);

  (Object.keys(keywordMap) as DiagnosisCategory[]).forEach((category) => {
    keywordMap[category].forEach((keyword) => {
      if (textBlob.includes(keyword)) {
        scores[category] += 10;
      }
    });
  });

  if (textBlob.includes("비대면")) {
    scores.psychological += 6;
    scores.social += 3;
  }

  if (textBlob.includes("15분") || textBlob.includes("20분") || textBlob.includes("30분")) {
    scores.psychological += 4;
    scores.information += 2;
  }

  const positiveCount = positiveSignals.reduce(
    (count, keyword) => count + (textBlob.includes(keyword) ? 1 : 0),
    0,
  );
  const distressCount = distressSignals.reduce(
    (count, keyword) => count + (textBlob.includes(keyword) ? 1 : 0),
    0,
  );

  const [primaryCategory, secondaryCategory] = rankCategories(scores);
  const readinessScore = Math.max(
    32,
    Math.min(
      84,
      46 +
        positiveCount * 5 -
        distressCount * 3 +
        Math.min(extractedTags.length, 6) * 2,
    ),
  );

  return {
    scores,
    primaryCategory,
    secondaryCategory,
    typeLabel: buildTypeLabel(primaryCategory, secondaryCategory),
    readinessScore,
    recommendedPaths: buildRecommendedPaths(primaryCategory, secondaryCategory),
    extractedTags: extractedTags.length ? extractedTags : [CATEGORY_LABELS[primaryCategory]],
  };
}
