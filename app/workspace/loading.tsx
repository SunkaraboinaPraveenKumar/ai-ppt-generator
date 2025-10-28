import { FileText } from "lucide-react";

export default function Loading(){
  return (
    <div className="flex flex-col items-center justify-center py-30">
      <div className="relative mb-6">    
        {/* PowerPoint icon with bounce animation */}
        <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce" style={{ animationDuration: '1.5s' }}>
          <FileText className="w-10 h-10 text-white" />
        </div>
      </div>
      
      {/* Loading text with fade animation */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2 animate-pulse">Loading your projects...</h3>
        <p className="text-muted-foreground">This will only take a moment</p>
      </div>
      
      {/* Loading dots animation */}
      <div className="flex gap-2 mt-6">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  )
}
