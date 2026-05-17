"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Pill, PrimaryButton } from "@/components/ui";
import { onboardingPrompts } from "@/lib/data";
import { useAppState } from "@/state/app-state";

export default function OnboardingPage() {
  const router = useRouter();
  const { hydrated, state, setProfileField, commitOnboarding } = useAppState();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState({
    pauseReason: "",
    desiredRole: "",
    activityPreference: "",
    availableHours: "",
  });

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    setDraft({
      pauseReason: state.profile.pauseReason,
      desiredRole: state.profile.desiredRole,
      activityPreference: state.profile.activityPreference,
      availableHours: state.profile.availableHours,
    });
  }, [hydrated, state.profile]);

  const currentPrompt = onboardingPrompts[step];
  const currentKey = currentPrompt.key;
  const currentValue = draft[currentKey];
  const extractedTags = currentValue
    .split(/[\s,]+/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length >= 2)
    .slice(0, 3);

  function updateField(
    key: keyof typeof draft,
    value: string,
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleNext() {
    if (!currentValue.trim()) {
      return;
    }

    setProfileField(currentKey, currentValue.trim());

    if (step < onboardingPrompts.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    const diagnosis = commitOnboarding({
      name: state.profile.name,
      pauseReason: draft.pauseReason.trim(),
      desiredRole: draft.desiredRole.trim(),
      activityPreference: draft.activityPreference.trim(),
      availableHours: draft.availableHours.trim(),
      extractedTags: state.profile.extractedTags,
    });

    if (diagnosis) {
      router.push("/diagnosis");
    }
  }

  return (
    <div className="pb-4">
      <header className="mb-6">
        <p className="text-[15px] font-bold text-sky">2. AI 온보딩</p>
        <p className="mt-1 text-sm text-slate-500">
          대화형 진단이 자연어를 데이터로 변환
        </p>
      </header>

      <Card className="compact-screen-card p-4">
        <p className="text-sm font-bold text-sky">{currentPrompt.title}</p>

        <div className="mt-3 rounded-[22px] border border-line bg-white px-4 py-4 text-[15px] leading-7 text-ink">
          {currentPrompt.question}
        </div>

        {step > 0 ? (
          <div className="mt-3 space-y-3">
            {onboardingPrompts.slice(0, step).map((prompt) => (
              <div
                key={prompt.key}
                className="rounded-[22px] bg-sky-soft px-4 py-4 text-[14px] leading-6 text-slate-600"
              >
                {draft[prompt.key]}
              </div>
            ))}
          </div>
        ) : null}

        {currentValue.trim() ? (
          <div className="mt-3 rounded-[22px] bg-sky-soft px-4 py-4 text-[14px] leading-6 text-slate-600">
            {currentValue}
          </div>
        ) : null}

        <div className="mt-4">
          <p className="mb-2 text-[12px] font-bold text-slate-400">
            AI가 추출한 프로필 신호
          </p>
          <div className="flex flex-wrap gap-2">
            {(extractedTags.length ? extractedTags : ["심리 위축", "정보 미로", "비대면 선호"]).map(
              (tag) => (
                <Pill key={tag}>{tag}</Pill>
              ),
            )}
          </div>
        </div>
      </Card>

      <div className="mt-5">
        <input
          value={currentValue}
          onChange={(event) => updateField(currentKey, event.target.value)}
          placeholder="답변을 입력하세요"
          className="h-14 w-full rounded-[20px] border border-line bg-white px-4 text-[15px] text-ink outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="mt-5 pb-[calc(2rem+var(--safe-bottom))]">
        <PrimaryButton onClick={handleNext} disabled={!currentValue.trim()}>
          {step === onboardingPrompts.length - 1 ? "진단 결과로" : "다음 질문으로"}
        </PrimaryButton>
      </div>
    </div>
  );
}
