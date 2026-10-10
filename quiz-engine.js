(() => {
  const shuffle=(values,random=Math.random)=>{
    const result=[...values];
    for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
    return result;
  };
  const eligible=(questions,{chapter='all',kind='mixed'}={})=>questions.filter(q=>(chapter==='all'||q.chapter===chapter)&&(kind==='mixed'||q.kind===kind));
  function draw(questions,config={},random=Math.random){
    const count=config.count??10;if(!Number.isInteger(count)||count<1)throw new Error('Invalid question count');
    const pool=eligible(questions,config),limit=Math.min(count,pool.length);
    const buckets=Object.fromEntries(['formula','concept','method'].map(kind=>[kind,pool.filter(q=>q.kind===kind)]));
    const kindOrder=shuffle(Object.keys(buckets).filter(kind=>buckets[kind].length),random),selected=[],chapterCounts=new Map();
    while(selected.length<limit)for(const kind of kindOrder){
      if(selected.length===limit)break;const bucket=buckets[kind];if(!bucket.length)continue;
      // Balance kinds, then favor less sampled chapters within the current kind.
      const min=Math.min(...bucket.map(q=>chapterCounts.get(q.chapter)||0));
      const choices=bucket.filter(q=>(chapterCounts.get(q.chapter)||0)===min);
      const question=choices[Math.floor(random()*choices.length)];
      bucket.splice(bucket.indexOf(question),1);selected.push(question);
      chapterCounts.set(question.chapter,(chapterCounts.get(question.chapter)||0)+1);
    }
    return shuffle(selected,random);
  }
  function createRound(questions,random=Math.random){
    return questions.map(question=>{
      const options=shuffle(question.options.map((text,index)=>({text,index})),random);
      return {question,choices:options.map((option,id)=>({id,text:option.text})),answer:options.findIndex(option=>option.index===question.answer),selection:null,submitted:false};
    });
  }
  function choose(entry,id){if(entry.submitted||!entry.choices.some(choice=>choice.id===id))return false;entry.selection=id;return true;}
  function submit(entry){
    if(!entry.choices.some(choice=>choice.id===entry.selection))throw new Error('Select an answer first');
    entry.submitted=true;return entry.selection===entry.answer;
  }
  function grade(entries){
    const answered=entries.filter(entry=>entry.submitted),wrong=answered.filter(entry=>entry.selection!==entry.answer);
    return {total:entries.length,answered:answered.length,correct:answered.length-wrong.length,wrong,percent:entries.length?Math.round((answered.length-wrong.length)/entries.length*100):0};
  }
  window.REVIEW_QUIZ_ENGINE=Object.freeze({shuffle,eligible,draw,createRound,choose,submit,grade});
})();
