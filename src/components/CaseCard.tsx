import { Calendar, User, Scale } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface CaseCardProps {
  caseNumber: string;
  title: string;
  status: string;
  nextHearing: string;
  client: string;
}

export function CaseCard({ caseNumber, title, status, nextHearing, client }: CaseCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl border border-legal-200/10 hover:border-legal-200/20 transition-all duration-300 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">رقم القضية: {caseNumber}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar className="w-4 h-4 text-[#4CD6B4]" />
          <span className="text-sm">الجلسة القادمة: {nextHearing}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <User className="w-4 h-4 text-[#4CD6B4]" />
          <span className="text-sm">العميل: {client}</span>
        </div>
      </div>
      
      <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#4CD6B4] text-[#4CD6B4] hover:bg-[#4CD6B4] hover:text-white transition-all duration-300">
        <Scale className="w-4 h-4" />
        <span>عرض التفاصيل</span>
      </button>
    </div>
  );
}