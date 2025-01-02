import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Search } from "@/components/Search";
import { CaseCard } from "@/components/CaseCard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewCaseForm from "@/components/NewCaseForm";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

interface Case {
  id: string;
  title: string;
  case_number: string;
  status: string;
  next_hearing: string;
  client: string;
}

export default function CaseTracking() {
  const { session } = useAuth();
  const [isNewCaseDialogOpen, setIsNewCaseDialogOpen] = useState(false);

  const { data: cases, isLoading } = useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Case[];
    },
  });

  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-[#1A1F2C] to-[#1A1F2C]/90">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-[#9b87f5]/20 to-transparent rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-t from-[#9b87f5]/10 to-transparent rounded-full blur-3xl opacity-10" />
      </div>

      <Sidebar />
      
      <main className="flex-1 p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">القضايا</h1>
            <Button 
              className={cn(
                "bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-medium",
                "px-6 py-2 rounded-full transition-all duration-300",
                "transform hover:scale-105"
              )}
              onClick={() => setIsNewCaseDialogOpen(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              إنشاء قضية
            </Button>
          </div>

          <div className="glass-card p-4 rounded-xl bg-[#1A1F2C]/50 border border-[#9b87f5]/20">
            <Search />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="text-[#9b87f5] animate-pulse">جاري التحميل...</div>
            ) : cases?.length === 0 ? (
              <div className="text-[#D6BCFA]">لا توجد قضايا</div>
            ) : (
              cases?.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseNumber={caseItem.case_number}
                  title={caseItem.title}
                  status={caseItem.status}
                  nextHearing={caseItem.next_hearing}
                  client={caseItem.client}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <NewCaseForm 
        open={isNewCaseDialogOpen} 
        onOpenChange={setIsNewCaseDialogOpen}
      />
    </div>
  );
}