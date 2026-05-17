"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Card, PageIntro, Pill, PrimaryButton } from "@/components/ui";
import { getQuestById } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function QuestDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { state, startQuest } = useAppState();
  const quest = getQuestById(params.id);

  useEffect(() => {
    if (!state.diagnosis) {
      router.replace("/onboarding");
    }
  }, [router, state.diagnosis]);

  if (!state.diagnosis || !quest) {
    return null;
  }

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="5. 퀘스트 상세"
        description="활동 이유와 단계를 부담 없이 설명"
      />

      <div className="mb-6">
        <Pill>{quest.stepLabel}</Pill>
      </div>

      <h1 className="text-[28px] font-bold leading-[1.18] text-ink">{quest.title}</h1>
      <p className="mt-7 text-[15px] leading-7 text-slate-500">{quest.description}</p>

      <Card className="mt-10 px-6 py-7">
        <p className="text-base font-bold text-ink">수행 단계</p>
        <ol className="mt-4 space-y-4">
          {quest.steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-soft text-sm font-semibold text-sky">
                {index + 1}
              </span>
              <p className="pt-1 text-sm leading-6 text-ink">{step}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="mt-6 p-5">
        <p className="text-sm font-bold leading-6 text-sky">
          이 활동은 나중에 <span className="font-semibold text-sky">직무 탐색 역량</span> 또는{" "}
          <span className="font-semibold text-sky">자기 이해 데이터</span>로 변환돼요.
        </p>
      </Card>

      <div className="mt-8 space-y-3">
        <PrimaryButton
          href={`/logs/new?questId=${quest.id}`}
          onClick={() => startQuest(quest.id)}
        >
          퀘스트 시작
        </PrimaryButton>
        <Link href="/quests" className="block text-center text-sm font-semibold text-slate-400">
          다른 퀘스트 보기
        </Link>
      </div>
    </div>
  );
}
