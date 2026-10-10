(() => {
  window.mountReviewQuiz=({root,chapters,quiz,formulas,prose,math,escape,syncGlass})=>{
    const engine=window.REVIEW_QUIZ_ENGINE;
    const config={chapter:'all',kind:'mixed',count:10};
    let round=[],index=0,stage='setup',isRetry=false,showAll=false;
    const $=id=>root.querySelector('#'+id);
    const title=q=>chapters.find(c=>c.id===q.chapter).title;
    const refs=ids=>`<div class="formula-references" aria-label="关联公式">${ids.map(id=>`<button type="button" class="formula-reference" data-formula="${id}">${escape(formulas.find(f=>f.id===id).title)} ↗</button>`).join('')}</div>`;
    function updatePool(){
      const n=engine.eligible(quiz.questions,config).length,count=Math.min(config.count,n);
      $('quiz-pool-count').textContent=`当前范围 ${n} 道题，本次随机抽取 ${count} 道。`;
      $('quiz-start').disabled=n===0;
    }
    function setup(){
      stage='setup';
      root.innerHTML=`<div class="quiz-intro"><span class="eyebrow">QUICK CHECK</span><h2>用几道题，看看记住了多少。</h2><p>公式、知识点与题目解法，都来自现有课程内容。每题为单项选择；提交后显示解析，一轮内题目不重复，选项随机排列。</p><div class="summary-stats"><span>${quiz.questions.length} 道选择题</span><span>${chapters.length} 个章节</span><span>公式 · 概念 · 解法</span></div></div>
        <form id="quiz-setup-form" class="quiz-setup"><div class="quiz-setting"><label for="quiz-chapter">考察范围</label><select id="quiz-chapter"><option value="all">全部章节</option>${chapters.map(c=>`<option value="${c.id}" ${config.chapter===c.id?'selected':''}>${c.number} ${c.title}</option>`).join('')}</select></div><div class="quiz-setting"><label for="quiz-kind">题型</label><select id="quiz-kind"><option value="mixed">混合抽题</option>${Object.entries(quiz.kinds).map(([value,label])=>`<option value="${value}" ${config.kind===value?'selected':''}>${label}</option>`).join('')}</select></div><div class="quiz-setting"><label for="quiz-count">本轮题数</label><select id="quiz-count">${[5,10,15].map(n=>`<option value="${n}" ${config.count===n?'selected':''}>${n} 题</option>`).join('')}</select></div><p id="quiz-pool-count" role="status" aria-live="polite"></p><button id="quiz-start" type="submit" class="primary-button">开始随机小测 <span aria-hidden="true">→</span></button></form>
        <div class="quiz-scope-note"><strong>怎么用？</strong><p>混合模式兼顾三类题，并优先分散到不同章节。范围内题目少于所选题数时，会抽取该范围的全部题目。错题解析可直接打开关联公式，结束后也可重练错题。</p></div>`;
      $('quiz-chapter').value=config.chapter;$('quiz-kind').value=config.kind;
      updatePool();syncGlass();
    }
    function start(questions=null){
      const selected=questions?engine.shuffle(questions):engine.draw(quiz.questions,config);
      if(!selected.length)return;
      round=engine.createRound(selected);index=0;stage='playing';isRetry=Boolean(questions);showAll=false;
      questionView(true);
    }
    function feedback(entry){
      if(!entry.submitted)return '<section id="quiz-feedback" class="quiz-feedback" hidden></section>';
      const correct=entry.selection===entry.answer;
      return `<section id="quiz-feedback" class="quiz-feedback ${correct?'is-correct':'is-wrong'}" role="status" tabindex="-1"><h3>${correct?'✓ 回答正确':'× 回答错误'}</h3><p class="quiz-correct-answer"><strong>正确答案：</strong>${prose(entry.choices[entry.answer].text)}</p><p>${prose(entry.question.explanation)}</p>${refs(entry.question.refs)}</section>`;
    }
    function questionView(focus=false){
      const entry=round[index],q=entry.question,score=engine.grade(round);
      root.innerHTML=`<div class="quiz-session-header"><div><span class="eyebrow">${isRetry?'RETRY THE MISTAKES':'RANDOM QUIZ'}</span><p>${isRetry?'错题重练':config.chapter==='all'?'全部章节':title(q)} · ${round.length} 题</p></div><button id="quiz-back" type="button" class="browse-button">返回设置</button></div><div class="quiz-progress-meta"><span>第 ${index+1} / ${round.length} 题</span><span>已提交 ${score.answered} 道 · 正确 ${score.correct} 道</span></div><progress id="quiz-progress" value="${score.answered}" max="${round.length}" aria-label="已提交题数"></progress>
        <article class="quiz-question" data-question-id="${q.id}"><div class="quiz-question-meta"><span class="quiz-kind">${quiz.kinds[q.kind]}</span><span>${title(q)}</span><span>单项选择</span></div><h2 id="quiz-question-title" tabindex="-1">${prose(q.prompt)}</h2><form id="quiz-answer-form"><fieldset class="quiz-choices"><legend class="sr-only">选择一个答案</legend>${entry.choices.map((choice,i)=>{
          const correct=entry.submitted&&choice.id===entry.answer,wrong=entry.submitted&&choice.id===entry.selection&&!correct;
          return `<div class="quiz-choice${correct?' choice-correct':wrong?' choice-wrong':''}"><input id="quiz-option-${i}" type="radio" name="quiz-answer" value="${choice.id}" ${entry.selection===choice.id?'checked':''} ${entry.submitted?'disabled':''}><label for="quiz-option-${i}"><span class="quiz-choice-letter">${String.fromCharCode(65+i)}</span><span class="quiz-choice-text">${prose(choice.text)}</span>${correct?'<span class="quiz-choice-state">✓ 正确</span>':wrong?'<span class="quiz-choice-state">× 你的选择</span>':''}</label></div>`;
        }).join('')}</fieldset><div class="quiz-answer-actions"><button id="quiz-submit" type="submit" class="primary-button" ${entry.selection===null||entry.submitted?'disabled':''}>${entry.submitted?'已提交':'提交答案'}</button><button id="quiz-next" type="button" class="browse-button" ${entry.submitted?'':'disabled'}>${index===round.length-1?'查看成绩':'下一题 →'}</button></div></form></article>${feedback(entry)}`;
      syncGlass();if(focus)$('quiz-question-title').focus();
    }
    function resultView(focus=false){
      stage='results';const score=engine.grade(round),rows=showAll?round:score.wrong;
      root.innerHTML=`<section class="quiz-results"><span class="eyebrow">ROUND COMPLETE</span><h2 id="quiz-result-title" tabindex="-1">${score.correct===score.total?'这一轮，全答对了。':'先把这几处，复习扎实。'}</h2><div class="quiz-score" data-correct="${score.correct}" data-total="${score.total}"><strong>${score.percent}<span>%</span></strong><p>${score.total} 题中答对 ${score.correct} 题 · 错 ${score.wrong.length} 题</p></div><div class="quiz-type-results">${Object.entries(quiz.kinds).map(([kind,label])=>{const entries=round.filter(e=>e.question.kind===kind),grade=engine.grade(entries);return `<span>${label}<strong>${grade.correct} / ${grade.total}</strong></span>`;}).join('')}</div><div class="quiz-result-actions"><button id="quiz-again" type="button" class="primary-button">再抽一组</button><button id="quiz-retry" type="button" class="browse-button" ${score.wrong.length?'':'disabled'}>重练 ${score.wrong.length} 道错题</button><button id="quiz-back" type="button" class="browse-button">调整范围</button></div></section>
        <section class="quiz-review"><div class="quiz-review-heading"><h2>${showAll?'本轮全部解析':'错题回顾'}</h2><button id="quiz-review-toggle" type="button" class="text-button" aria-pressed="${showAll}">${showAll?'只看错题':'查看全部解析'}</button></div>${rows.length?rows.map((entry,i)=>{const correct=entry.selection===entry.answer;return `<details class="quiz-review-item" ${!correct&&i===0?'open':''}><summary><span class="quiz-review-state ${correct?'review-correct':'review-wrong'}">${correct?'✓ 正确':'× 错误'}</span><span>${prose(entry.question.prompt)}</span><span class="expand-mark" aria-hidden="true">+</span></summary><div class="quiz-review-body"><p><strong>你的选择：</strong>${prose(entry.choices[entry.selection].text)}</p><p><strong>正确答案：</strong>${prose(entry.choices[entry.answer].text)}</p><p>${prose(entry.question.explanation)}</p>${refs(entry.question.refs)}</div></details>`;}).join(''):'<p class="quiz-no-mistakes">本轮没有错题。可以查看全部解析，或再抽一组继续练习。</p>'}</section>`;
      syncGlass();if(focus)$('quiz-result-title').focus();
    }
    root.addEventListener('change',event=>{
      if(stage==='setup'){
        if(event.target.id==='quiz-chapter')config.chapter=event.target.value;
        if(event.target.id==='quiz-kind')config.kind=event.target.value;
        if(event.target.id==='quiz-count')config.count=Number(event.target.value);
        updatePool();
      }else if(stage==='playing'&&event.target.name==='quiz-answer'){
        if(engine.choose(round[index],Number(event.target.value)))$('quiz-submit').disabled=false;
      }
    });
    root.addEventListener('submit',event=>{
      event.preventDefault();if(event.target.id==='quiz-setup-form')start();
      else if(event.target.id==='quiz-answer-form'&&stage==='playing'){
        const entry=round[index];if(entry.selection===null||entry.submitted)return;
        engine.submit(entry);questionView();$('quiz-feedback').focus();
      }
    });
    root.addEventListener('click',event=>{
      const button=event.target.closest('button');if(!button||button.disabled)return;
      if(button.id==='quiz-next'&&stage==='playing'&&round[index].submitted){if(index===round.length-1)resultView(true);else{index++;questionView(true);}}
      else if(button.id==='quiz-back')setup();
      else if(button.id==='quiz-again')start();
      else if(button.id==='quiz-retry'&&stage==='results')start(engine.grade(round).wrong.map(entry=>entry.question));
      else if(button.id==='quiz-review-toggle'&&stage==='results'){showAll=!showAll;resultView();$('quiz-review-toggle').focus();}
    });
    setup();
    return {onShow:()=>syncGlass()};
  };
})();
