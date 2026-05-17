"use client";

import { jsPDF } from "jspdf";
import { Card, PageIntro, PrimaryButton, SecondaryButton } from "@/components/ui";
import { buildResumeDraft } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function ResumePage() {
  const { state } = useAppState();
  const resume = buildResumeDraft(state);

  function exportPdf() {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    let y = 56;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("AI Re-entry Resume", 40, y);
    y += 28;

    doc.setFontSize(16);
    doc.text(resume.headline, 40, y);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(resume.focusLine, 40, y);
    y += 28;

    doc.setFont("helvetica", "bold");
    doc.text("Core strengths", 40, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    resume.coreStrengths.forEach((strength) => {
      const lines = doc.splitTextToSize(`- ${strength}`, 500);
      doc.text(lines, 44, y);
      y += lines.length * 16;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Experience signals", 40, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    resume.experienceBullets.forEach((bullet) => {
      const lines = doc.splitTextToSize(`- ${bullet}`, 500);
      doc.text(lines, 44, y);
      y += lines.length * 16;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Next roadmap", 40, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    resume.nextRoadmap.forEach((item) => {
      const lines = doc.splitTextToSize(`- ${item}`, 500);
      doc.text(lines, 44, y);
      y += lines.length * 16;
    });

    doc.save("nrkn-resume.pdf");
  }

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="8. AI 이력서 생성"
        description="작은 활동을 전문적인 문장으로 합성"
      />

      <h1 className="text-[28px] font-bold text-ink">AI 재진입 이력서</h1>

      <Card className="mt-8 px-6 py-7">
        <h2 className="text-[24px] font-bold text-ink">이도윤</h2>
        <p className="mt-2 text-sm font-bold text-sky">마케팅/기획 직무 탐색형 후보자</p>

        <div className="mt-7 border-t border-line pt-6">
          <h3 className="text-base font-semibold text-ink">핵심 역량 요약</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {resume.coreStrengths.map((strength) => (
              <li key={strength}>- {strength}</li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-line pt-6">
          <h3 className="text-base font-semibold text-ink">경험 문장 초안</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {resume.experienceBullets.map((bullet) => (
              <li key={bullet}>- {bullet}</li>
            ))}
          </ul>
        </div>

        <div className="mt-7 border-t border-line pt-6">
          <h3 className="text-base font-semibold text-ink">다음 성장 로드맵</h3>
          <p className="mt-4 text-sm leading-7 text-sky">
            {resume.nextRoadmap.join(" -> ")}
          </p>
        </div>
      </Card>

      <div className="mt-8 space-y-3">
        <PrimaryButton onClick={exportPdf}>PDF로 내보내기</PrimaryButton>
        <SecondaryButton onClick={() => window.alert("프로토타입에서는 멘토 검토 요청이 연결되지 않아요.")}>
          멘토에게 검토 요청
        </SecondaryButton>
      </div>
    </div>
  );
}
