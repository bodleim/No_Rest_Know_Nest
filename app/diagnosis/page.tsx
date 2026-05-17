"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, PageIntro, PrimaryButton, ProgressBar, SectionTitle } from "@/components/ui";
import { useAppState } from "@/state/app-state";

export default function DiagnosisPage() {
  const router = useRouter();
  const { state } = useAppState();

  useEffect(() => {
    if (!state.diagnosis) {
      router.replace("/onboarding");
    }
  }, [router, state.diagnosis]);

  if (!state.diagnosis) {
    return null;
  }

  return (
    <div className="pb-4">
      <PageIntro
        eyebrow="3. 진단 결과"
        description="유형과 준비도를 시각적으로 안내"
      />

      <Card className="px-6 py-7">
        <p className="text-sm font-bold text-sky">현재 유형</p>
        <p className="mt-5 text-[25px] font-bold leading-[1.25] text-ink">
          {state.diagnosis.typeLabel}
        </p>

        <div className="mt-5">
          <ProgressBar value={state.diagnosis.readinessScore} />
          <p className="mt-4 text-sm font-bold text-sky">
            재진입 준비도 {state.diagnosis.readinessScore} / 100
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            오늘은 지원서 작성보다 작은 외부 접점과 직무 탐색이 더 좋아요.
          </p>
        </div>

      </Card>

      <section className="mt-9">
        <SectionTitle title="추천 경로" />
        <div className="space-y-3">
          {state.diagnosis.recommendedPaths.map((path) => (
            <Card key={path.title} className="rounded-[20px] p-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-[10px] bg-sky-soft" />
                <div>
                  <p className="font-bold text-ink">{path.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{path.subtitle}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <PrimaryButton href="/quests">오늘의 퀘스트 보기</PrimaryButton>
      </div>
    </div>
  );
}
