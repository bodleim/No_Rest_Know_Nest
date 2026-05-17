"use client";

import { Card, PageIntro, PrimaryButton, SectionTitle } from "@/components/ui";
import { buildGrowthInsight } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function GrowthPage() {
  const { state } = useAppState();
  const insight = buildGrowthInsight(state);

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="7. 성장 로그"
        description="활동이 쌓여 눈에 보이는 성장으로"
      />

      <h1 className="text-[28px] font-bold text-ink">이번 주 성장 로그</h1>

      <Card className="mt-8 px-6 py-7">
        <p className="text-base font-bold text-ink">누적 활동 {Math.max(insight.totalLogs, 7)}개</p>
        <div className="mt-5 space-y-4">
          {insight.capacityScores.map((score) => (
            <div key={score.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">{score.label}</span>
                <span className="font-semibold text-sky">{Math.min(score.value, 100)}</span>
              </div>
              <div className="h-3 rounded-full bg-sky-soft">
                <div
                  className="h-3 rounded-full bg-sky"
                  style={{ width: `${Math.min(score.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <section className="mt-10">
        <SectionTitle title="최근 로그" />
        <div className="space-y-3">
          {insight.recentSummaries.length > 0 ? (
            insight.recentSummaries.map((summary) => (
              <Card key={summary.title} className="p-4">
                <p className="font-semibold text-ink">{summary.title}</p>
                <p className="mt-2 text-sm text-sky">{summary.subtitle}</p>
              </Card>
            ))
          ) : (
            <Card className="p-4">
              <p className="text-sm leading-6 text-slate-500">
                아직 저장된 로그가 없어요. 오늘의 퀘스트를 완료하면 이 영역이 채워져요.
              </p>
            </Card>
          )}
        </div>
      </section>

      <div className="mt-8 space-y-3">
        <PrimaryButton href="/resume">AI 이력서 보기</PrimaryButton>
        <PrimaryButton href="/insights" className="bg-ink">
          역량 리포트 보기
        </PrimaryButton>
      </div>
    </div>
  );
}
