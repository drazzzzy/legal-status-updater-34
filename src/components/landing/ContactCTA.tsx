import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            ابدأ في تنظيم وإدارة قضاياك اليوم
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            انضم إلى آلاف المحامين الذين يستخدمون نظامنا لإدارة مكاتبهم بكفاءة عالية
          </p>
          <Button 
            className="bg-[#4CD6B4] hover:bg-[#3BC5A3] text-black font-medium px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            ابدأ الآن مجاناً
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}