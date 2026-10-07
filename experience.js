const dreamSummaries={
 wime:['One celebration. One visual identity.','Bring the fifth-anniversary WIME Awards into a connected visual world, with clear speaker announcements, community messages and event-day graphics.'],
 geo:['Give the week a recognisable voice.','Create a consistent campaign for OOU Geosciences Week, helping the programme, symposium and closing message feel like parts of the same event.'],
 tourism:['Make the conversation worth joining.','Introduce an online discussion about virtual tourism in Nigeria with a clear topic, prominent speakers and a recognisable DigGeoNaija identity.'],
 birthdays:['Make their moment feel personal.','Use portraits, expressive typography and colour to celebrate each person with a design that feels made for them.'],
 diamond:['Let the school’s personality shine.','Create warm, expressive graphics for school celebrations and community moments, with a consistent Diamond Springs identity.'],
 diggeo:['Keep the community connected.','Present giveaways, environmental observances and everyday community messages within a recognisable DigGeoNaija visual style.'],
 earth:['Give campus conversations a clear voice.','Bring departmental activities, student announcements and seasonal messages together through readable, engaging designs.'],
 glossed:['Make the offer as polished as the service.','Present beauty promotions and price information with a consistent photographic style and a clear hierarchy.'],
 church:['Bring people into the conversation.','Communicate church programmes, celebrations and family conversations through inviting, readable event graphics.'],
 achievements:['Give achievements a place on the page.','Organise portraits and supporting information into a print layout that can be read and explored.'],
 flyers:['Introduce the brand at a glance.','Bring DigGeoNaija’s identity and services into a clear flyer format with a strong visual introduction.'],
 brochure:['Tell a bigger story in a folded format.','Organise DigGeoNaija’s services and supporting information across a trifold brochure, balancing imagery with readable content.']
};
const storyTabs=[document.getElementById('dream-tab'),document.getElementById('creation-tab')];
function selectStory(index){storyTabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1});document.getElementById('dream-panel').hidden=index!==0;document.getElementById('creation-panel').hidden=index!==1}
storyTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectStory(index));tab.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?1:1-index;selectStory(next);storyTabs[next].focus()}})});
document.getElementById('show-creation').addEventListener('click',()=>{selectStory(1);storyTabs[1].focus()});
window.configureProjectStory=(key,creation=false)=>{const certificate=key==='certificates';document.querySelector('.story-tabs').hidden=certificate;selectStory(certificate||creation?1:0);const brief=dreamSummaries[key];if(brief){document.getElementById('dream-title').textContent=brief[0];document.getElementById('dream-description').textContent=brief[1]}};

// Keep the complete archive available through its category links.
function revealFolder(hash){const target=document.getElementById(hash.replace('#',''));if(!target)return;const folder=target.closest('details');if(folder)folder.open=true;}
document.querySelectorAll('.collection-index a').forEach(link=>link.addEventListener('click',()=>revealFolder(link.hash)));
window.addEventListener('hashchange',()=>revealFolder(location.hash));revealFolder(location.hash);

// This form prepares a message; visitors send it themselves in their chosen app.
const dreamForm=document.getElementById('dream-form');const messageField=document.getElementById('dream-message');
dreamForm.querySelectorAll('[name="intent"]').forEach(input=>input.addEventListener('change',()=>{const request=dreamForm.elements.intent.value==='questionnaire';messageField.required=!request;document.querySelector('label[for="dream-message"]').textContent=request?'Your idea (optional)':'Your idea';messageField.placeholder=request?'Tell me a little about your dream project, or request a questionnaire to get started…':'Tell me your dream project…'}));
dreamForm.addEventListener('submit',event=>{event.preventDefault();const name=dreamForm.elements.name.value.trim();const idea=messageField.value.trim();const intent=dreamForm.elements.intent.value;const text=`Hi Ella!${name?` My name is ${name}.`:''}\n\n${intent==='questionnaire'?'I’d like a questionnaire tailored to my project.':'I’d like to share a brief for my project.'}${idea?`\n\n${idea}`:''}`;const channel=event.submitter?.value||'whatsapp';const url=channel==='email'?`mailto:ellaiscreativee@gmail.com?subject=${encodeURIComponent(intent==='questionnaire'?'Questionnaire request — Ella’s Creative':'New project brief — Ella’s Creative')}&body=${encodeURIComponent(text)}`:`https://wa.me/2348120370144?text=${encodeURIComponent(text)}`;if(channel==='email'){window.location.href=url}else{window.open(url,'_blank','noopener,noreferrer')}document.getElementById('contact-status').textContent=channel==='email'?'Your email draft is ready to open in your email app. Review and send it there.':'Continue in WhatsApp to review and send your message.'});

const progressButton=document.getElementById('reading-progress');let scrollQueued=false;
function paintProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;const fraction=max>0?Math.max(0,Math.min(1,window.scrollY/max)):0;progressButton.style.setProperty('--reading',fraction);document.getElementById('reading-percent').textContent=`${Math.round(fraction*100)}%`;progressButton.setAttribute('aria-label',`Back to top — ${Math.round(fraction*100)} percent through the page`);scrollQueued=false}
window.addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(paintProgress)}},{passive:true});window.addEventListener('resize',paintProgress);document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',paintProgress));window.addEventListener('load',paintProgress);progressButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:motionPreference.matches||document.documentElement.classList.contains('motion-off')?'auto':'smooth'}));paintProgress();
