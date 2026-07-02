import { createFeedbackIssueUrl, createSubmitIssueUrl } from "@/utils/feedback";
import { ExternalLink, MessageSquare, Send } from "lucide-react";

const standards = [
  "能明确提升开发、学习、调试、协作或产品设计效率。",
  "有稳定官网、文档或开源仓库，方便用户验证。",
  "推荐理由要具体，说明适合谁、解决什么问题。",
  "不收录只有广告落地页、无法访问或信息严重不透明的资源。",
];

const feedbackTypes = [
  { label: "链接失效", type: "broken-link" as const },
  { label: "信息错误", type: "wrong-info" as const },
  { label: "资源不推荐", type: "not-recommended" as const },
  { label: "其他建议", type: "other" as const },
];

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-white lg:p-10">
        <p className="text-sm font-semibold text-blue-300">Submit</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight">提交资源或反馈问题</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
          首版不使用后端表单。所有提交会跳转到 GitHub Issue，并自动带上标题和正文模板，方便维护者审核后更新静态数据。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={createSubmitIssueUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            <Send className="h-4 w-4" />
            去 GitHub Issue 提交资源
          </a>
          <a
            href={createFeedbackIssueUrl("other")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-blue-300"
          >
            <MessageSquare className="h-4 w-4" />
            反馈问题
          </a>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">收录标准</h2>
          <div className="mt-5 grid gap-3">
            {standards.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {item}
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold text-slate-950">推荐填写字段</h2>
          <pre className="mt-4 overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-200">
{`工具名称：
官网链接：
所属分类：
推荐理由：
适用场景：
价格信息：
替代工具：`}
          </pre>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">问题反馈</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">发现链接失效、信息错误或推荐不准确，可以直接提交对应反馈。</p>
          <div className="mt-5 grid gap-3">
            {feedbackTypes.map((item) => (
              <a
                key={item.type}
                href={createFeedbackIssueUrl(item.type)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
