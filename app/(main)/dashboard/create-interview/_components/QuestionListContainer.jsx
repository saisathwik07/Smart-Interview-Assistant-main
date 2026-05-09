import React from 'react';
import { MessageSquare } from 'lucide-react';

function QuestionListContainer({ questionList }) {
  return (
    <div className="mt-6">
      <h2 className='font-bold text-lg text-foreground mb-4'>Generated Interview Questions</h2>
      <div className='glass-card p-5 rounded-2xl space-y-3'>
        {questionList.map((item, index) => (
          <div key={index} className="flex gap-3 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </div>
            <div>
              <h2 className='font-medium text-foreground text-sm'>{item.question}</h2>
              {item?.type && (
                <span className='inline-flex items-center gap-1 mt-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full'>
                  <MessageSquare className="w-3 h-3" />
                  {item.type}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
