"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  PageIntro,
  Pill,
  PrimaryButton,
  SectionTitle,
} from "@/components/ui";
import { getRecommendedQuests } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function QuestsPage() {
  const router = useRouter();
  const { state, startQuest } = useAppState();

  useEffect(() => {
    if (!state.diagnosis) {
      router.replace("/onboarding");
    }
  }, [router, state.diagnosis]);

  if (!state.diagnosis) {
    return null;
  }

  const recommended = getRecommendedQuests(state);
  const todayQuest = recommended[0];
  const nextQuests = recommended.slice(1, 4);

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="4. 홈 / 오늘의 퀘스트"
        description="오늘 할 수 있는 행동만 크게 보여주기"
      />

      <h1 className="text-[28px] font-bold leading-[1.2] text-ink">
        {state.profile.name}님, 오늘은
        <br />작은 한 걸음이면 충분해요
      </h1>

      <Card className="mt-10 bg-gradient-to-br from-white to-sky-soft">
        <Pill>AI 추천 1순위</Pill>
        <h2 className="mt-4 text-[23px] font-bold leading-[1.25] text-ink">
          {todayQuest.title}
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          예상 {todayQuest.expectedMinutes}분 · {todayQuest.mode} ·{" "}
          {todayQuest.capacityTags.join("/")}
        </p>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/quests/${todayQuest.id}`}
            onClick={() => startQuest(todayQuest.id)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-sky px-6 text-sm font-semibold text-white"
          >
            시작하기
          </Link>
        </div>
      </Card>

      <section className="mt-8">
        <SectionTitle title="다음 추천" />
        <div className="space-y-3">
          {nextQuests.map((quest) => (
            <Link
              key={quest.id}
              href={`/quests/${quest.id}`}
              onClick={() => startQuest(quest.id)}
              className="block"
            >
              <Card className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{quest.title}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      {quest.expectedMinutes}분 · {quest.stepLabel}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-sky">열기</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <PrimaryButton href="/growth">이번 주 성장 로그 보기</PrimaryButton>
      </div>
    </div>
  );
}
