"use client";

import { Card, PageIntro, PrimaryButton, SectionTitle } from "@/components/ui";
import { buildCommunityNotes, buildInsightsCards } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function InsightsPage() {
  const { state } = useAppState();
  const cards = buildInsightsCards(state);
  const notes = buildCommunityNotes(state);
  const typeScores = state.diagnosis?.scores ?? {
    psychological: 48,
    information: 44,
    experience: 31,
    skill: 28,
    social: 24,
  };

  const scoreRows = [
    { label: "심리 위축형", value: typeScores.psychological },
    { label: "정보 미로형", value: typeScores.information },
    { label: "경력 공백형", value: typeScores.experience },
    { label: "사회 고립형", value: typeScores.social },
  ];

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="9. 기관 대시보드"
        description="B2G 확장을 위한 관리자 화면 미리보기"
      />

      <h1 className="text-[28px] font-bold text-ink">지역 청년 유형 분포</h1>

      <div className="mt-8 grid grid-cols-2 gap-8">
        {cards.slice(0, 2).map((card) => (
          <Card key={card.label} className="p-4">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-3 text-[28px] font-bold text-sky">
              {card.value}
            </p>
          </Card>
        ))}
      </div>

      <section className="mt-8">
        <SectionTitle title="유형별 분포" />
        <Card>
          <div className="space-y-4">
            {scoreRows.map((row) => (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-semibold text-sky">{row.value}</span>
                </div>
                <div className="h-3 rounded-full bg-sky-soft">
                  <div
                    className="h-3 rounded-full bg-sky"
                    style={{ width: `${Math.min(row.value, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8">
        <SectionTitle title="정책 수요 인사이트" />
        <div className="space-y-3">
          {notes.map((note) => (
            <Card key={note} className="p-4">
              <p className="text-sm leading-6 text-slate-600">{note}</p>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <PrimaryButton href="/resume">이력서로 돌아가기</PrimaryButton>
      </div>
    </div>
  );
}
