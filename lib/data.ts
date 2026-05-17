import {
  CATEGORY_LABELS,
  DiagnosisCategory,
  InsightsCard,
  Quest,
  RecommendationPath,
} from "@/lib/types";

export const onboardingPrompts = [
  {
    key: "pauseReason",
    title: "Nest AI",
    question: "요즘 구직을 쉬게 된 가장 큰 이유가 무엇인지 편하게 말해줄래요?",
    placeholder: "예: 떨어지는 경험이 반복돼서 바깥에 나가는 것도 부담스러워요.",
  },
  {
    key: "desiredRole",
    title: "Nest AI",
    question: "다시 움직이게 된다면 어떤 직무나 분야를 가장 먼저 탐색해보고 싶나요?",
    placeholder: "예: 마케팅, 콘텐츠, 서비스 기획처럼 사람과 데이터를 함께 다루는 일",
  },
  {
    key: "activityPreference",
    title: "Nest AI",
    question: "지금은 어떤 방식의 활동이 가장 덜 부담스러운가요?",
    placeholder: "예: 비대면으로 짧게 할 수 있는 활동이 좋아요.",
  },
  {
    key: "availableHours",
    title: "Nest AI",
    question: "하루에 어느 정도 시간까지는 무리 없이 써볼 수 있을까요?",
    placeholder: "예: 15분에서 30분 정도는 괜찮아요.",
  },
] as const;

export const recommendationPathMap: Record<
  DiagnosisCategory,
  RecommendationPath
> = {
  psychological: {
    category: "psychological",
    title: "회복: 부담 낮은 활동",
    subtitle: "센터 위치 확인, 직무 영상 보기",
  },
  information: {
    category: "information",
    title: "탐색: 정보 선별",
    subtitle: "지역 정책 저장, 공고 비교",
  },
  experience: {
    category: "experience",
    title: "기록: 경험 정리",
    subtitle: "과거 경험 3줄 정리",
  },
  skill: {
    category: "skill",
    title: "강화: 실무 감각 회복",
    subtitle: "무료 강의, 미니 프로젝트",
  },
  social: {
    category: "social",
    title: "연결: 외부 접점 만들기",
    subtitle: "비대면 상담, 커뮤니티 가입",
  },
};

export const quests: Quest[] = [
  {
    id: "video-reflection",
    title: "관심 직무 영상 1개 보고 느낀 점 3줄 기록하기",
    description:
      "바로 지원서를 쓰기보다, 부담 없는 탐색 활동으로 직무 언어를 다시 회복하는 단계예요.",
    expectedMinutes: 15,
    difficulty: "low",
    mode: "비대면",
    categories: ["psychological", "information"],
    capacityTags: ["탐색", "회복"],
    stepLabel: "저강도 회복",
    steps: [
      "AI 추천 직무 영상을 하나 선택해요.",
      "15분 이내로 시청해요.",
      "기억에 남은 포인트 3줄을 적어요.",
      "완료 버튼으로 오늘의 로그를 저장해요.",
    ],
  },
  {
    id: "policy-compare",
    title: "지역 청년 정책 2개 비교하고 저장하기",
    description:
      "정보가 너무 많을 때는 한 번에 다 보지 않고, 오늘 필요한 후보만 추려두는 것이 중요해요.",
    expectedMinutes: 20,
    difficulty: "low",
    mode: "비대면",
    categories: ["information", "experience"],
    capacityTags: ["탐색", "기록"],
    stepLabel: "정보 선별",
    steps: [
      "거주 지역 또는 가까운 청년센터 정책 카드 2개를 확인해요.",
      "신청 대상, 일정, 준비물만 비교해요.",
      "지금 나에게 맞는 정책 1개를 저장 이유와 함께 기록해요.",
    ],
  },
  {
    id: "experience-sort",
    title: "과거 프로젝트 경험 3줄 정리하기",
    description:
      "비어 있다고 느끼는 공백에도 다시 꺼내보면 기록 자산으로 바꿀 수 있는 경험이 숨어 있어요.",
    expectedMinutes: 15,
    difficulty: "low",
    mode: "비대면",
    categories: ["experience", "psychological"],
    capacityTags: ["기록", "회복"],
    stepLabel: "기초 자산 만들기",
    steps: [
      "학교, 동아리, 아르바이트, 인턴 중 하나를 선택해요.",
      "내가 맡은 역할과 결과를 각각 한 줄씩 적어요.",
      "배운 점 또는 다음에 써볼 수 있는 역량을 한 줄 추가해요.",
    ],
  },
  {
    id: "micro-course",
    title: "무료 GA 강의 20분 수강 후 실무 키워드 3개 저장",
    description:
      "역량 부족감이 클수록 긴 학습보다 짧은 실무 노출이 다시 시작하는 데 더 효과적일 수 있어요.",
    expectedMinutes: 20,
    difficulty: "medium",
    mode: "비대면",
    categories: ["skill", "information"],
    capacityTags: ["강화", "탐색"],
    stepLabel: "기초 역량 강화",
    steps: [
      "추천된 무료 강의 링크를 열어요.",
      "20분 내로 한 챕터만 수강해요.",
      "처음 알게 된 실무 키워드 3개를 저장해요.",
    ],
  },
  {
    id: "community-touchpoint",
    title: "온라인 커뮤니티 1곳 가입하고 공감되는 글 저장",
    description:
      "고립감이 클수록 낮은 강도의 외부 접점이 다시 움직이기 위한 안전한 시작점이 될 수 있어요.",
    expectedMinutes: 10,
    difficulty: "low",
    mode: "비대면",
    categories: ["social", "psychological"],
    capacityTags: ["회복", "탐색"],
    stepLabel: "사회 연결 회복",
    steps: [
      "관심 직무 또는 청년 지원 관련 온라인 커뮤니티를 한 곳 찾어요.",
      "가입 후 공감되는 글 하나를 저장해요.",
      "왜 저장했는지 짧게 기록해요.",
    ],
  },
  {
    id: "resume-seed",
    title: "이력서 한 줄 제목과 소개문 초안 쓰기",
    description:
      "완성된 이력서를 만들지 않아도 괜찮아요. 나를 설명하는 첫 한 줄부터 시작해도 충분해요.",
    expectedMinutes: 15,
    difficulty: "medium",
    mode: "비대면",
    categories: ["experience", "skill"],
    capacityTags: ["기록", "강화"],
    stepLabel: "이력서 씨앗 만들기",
    steps: [
      "희망 직무를 기준으로 한 줄 제목을 적어요.",
      "내가 가진 강점 2가지를 짧게 써요.",
      "다음 주 보완하고 싶은 점 1가지를 덧붙여요.",
    ],
  },
];

export const starterMetrics = [
  { label: "비난 없는 AI 대화", value: "1:1" },
  { label: "15분 퀘스트", value: "15분" },
];

export const defaultReflectionLines = [
  "마케팅 직무는 데이터 해석이 중요해 보였다.",
  "동아리 홍보 경험과 연결지을 수 있겠다고 느꼈다.",
  "GA 무료 강의를 들어보고 싶다는 생각이 들었다.",
];

export const communityInsightCards: InsightsCard[] = [
  { label: "이탈 위험", value: "128명" },
  { label: "퀘스트 수행률", value: "64%" },
];

export const communityDemandNotes = [
  "비대면 상담과 저강도 직무 탐색 수요가 가장 높아요.",
  "무료 교육과 미니 프로젝트 연계 수요가 뒤를 잇고 있어요.",
  "짧은 기록형 퀘스트의 재방문율이 가장 안정적이에요.",
];

export const defaultName = "도윤";

export function buildTypeLabel(
  primaryCategory: DiagnosisCategory,
  secondaryCategory: DiagnosisCategory,
) {
  if (primaryCategory === secondaryCategory) {
    return CATEGORY_LABELS[primaryCategory];
  }

  return `${CATEGORY_LABELS[primaryCategory]} + ${CATEGORY_LABELS[secondaryCategory]}`;
}
