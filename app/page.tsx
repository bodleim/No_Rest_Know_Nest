"use client";

import { Card, PageIntro, PrimaryButton } from "@/components/ui";
import { starterMetrics } from "@/lib/data";
import { useAppState } from "@/state/app-state";

export default function HomePage() {
  const { resetDemo } = useAppState();

  return (
    <div className="flex min-h-full flex-col justify-between pb-3">
      <div>
        <PageIntro
          eyebrow="1. 시작 화면"
          description="화이트 여백으로 안전한 첫 인상"
        />

        <Card className="rounded-[30px] bg-gradient-to-br from-sky-soft to-white px-7 py-8">
          <div className="inline-flex rounded-[18px] bg-white px-4 py-3 text-[29px] font-bold text-sky shadow-card">
            Know Nest
          </div>
          <p className="mt-7 text-[28px] font-bold leading-[1.22] text-ink">
            쉬어도 괜찮아요.
            <br />오늘은 아주 작은
            <br />한 걸음만.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {starterMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[18px] bg-white/90 px-3 py-3 text-center">
                <p className="text-xs font-bold text-sky">{metric.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <p className="mt-14 text-[15px] leading-6 text-slate-500">
          구직을 멈춘 이유를 편하게 정리하고, 지금 할 수 있는 행동만 추천해요.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        <PrimaryButton href="/onboarding">내 둥지 만들기</PrimaryButton>
        <button
          type="button"
          onClick={resetDemo}
          className="w-full text-center text-sm font-bold text-sky"
        >
          이미 계정이 있어요
        </button>
      </div>
    </div>
  );
}
