"use client";

import { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, PageIntro, Pill, PrimaryButton } from "@/components/ui";
import { defaultReflectionLines } from "@/lib/data";
import { getQuestById, getRecommendedQuests } from "@/lib/derive";
import { useAppState } from "@/state/app-state";

export default function NewLogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, saveQuestLog } = useAppState();
  const questId = searchParams.get("questId") || state.activeQuestId;
  const fallbackQuest = getRecommendedQuests(state)[0];
  const quest = getQuestById(questId) ?? fallbackQuest;
  const [note, setNote] = useState("");
  const [reflectionText, setReflectionText] = useState(defaultReflectionLines.join("\n"));
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>();

  if (!quest) {
    return null;
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    const reflectionLines = reflectionText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    saveQuestLog({
      questId: quest.id,
      note: note.trim() || quest.title,
      reflectionLines,
      imageDataUrl,
    });
    router.push("/growth");
  }

  return (
    <div className="pb-5">
      <PageIntro
        eyebrow="6. 수행 인증 / 로그"
        title="오늘의 기록을 남겨주세요"
        description="작은 행동도 나중에 이력서에 들어갈 데이터가 되도록 저장해요."
      />

      <Card className="p-4">
        <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-line bg-sky-soft/50 p-6 text-center">
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          {imageDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageDataUrl}
              alt="업로드 미리보기"
              className="h-full max-h-[180px] w-auto rounded-[20px] object-cover"
            />
          ) : (
            <>
              <div className="h-16 w-16 rounded-[20px] bg-white" />
              <p className="mt-4 text-sm font-medium text-slate-500">사진 또는 캡처 업로드</p>
            </>
          )}
        </label>
      </Card>

      <div className="mt-6 space-y-5">
        <div>
          <p className="mb-2 text-sm font-medium text-slate-500">오늘 수행한 퀘스트</p>
          <Card className="p-4">
            <p className="font-semibold text-ink">{quest.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {quest.capacityTags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </Card>
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-500">한 줄 메모</span>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="예: 영상 속 데이터 해석 포인트가 인상적이었어요."
            className="h-24 w-full rounded-[24px] border border-line px-4 py-4 text-[15px] leading-6 outline-none placeholder:text-slate-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-500">느낀 점 3줄</span>
          <textarea
            value={reflectionText}
            onChange={(event) => setReflectionText(event.target.value)}
            className="h-36 w-full rounded-[24px] border border-line px-4 py-4 text-[15px] leading-6 outline-none"
          />
        </label>

        <Card className="bg-sky-soft/50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            AI 변환 예정 역량
          </p>
          <p className="mt-3 text-sm font-medium leading-6 text-ink">
            직무 이해도 · 자기주도 탐색 · 학습 계획 수립
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={handleSubmit}>완료하고 로그 저장</PrimaryButton>
      </div>
    </div>
  );
}
