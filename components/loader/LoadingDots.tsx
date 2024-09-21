const LoadingDots = () => {
    return (
      <div className="flex space-x-2">
        <div className="dot bg-slate-600 w-5 h-5 rounded-full animate-bounce"></div>
        <div className="dot bg-slate-600 w-5 h-5 rounded-full animate-bounce animation-delay-200"></div>
        <div className="dot bg-slate-600 w-5 h-5 rounded-full animate-bounce animation-delay-400"></div>
        <style jsx>{`
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      </div>
    );
  };
  
  export default LoadingDots;
  