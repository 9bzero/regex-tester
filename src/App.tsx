import{useState,useMemo}from'react'
  const PRESETS=[
    {label:'Email',pattern:'^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$',flags:'i',test:'user@example.com'},
    {label:'URL',pattern:'https?:\/\/(www\\.)?[-a-z0-9@:%._+~#=]{1,256}\\.[a-z]{2,}\\b([-a-z0-9@:%_+.~#?&/=]*)',flags:'i',test:'https://github.com/9bzero'},
    {label:'Phone',pattern:'^[+]?[0-9]{7,15}$',flags:'',test:'+966501234567'},
    {label:'Hex Color',pattern:'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',flags:'',test:'#38bdf8'},
    {label:'IPv4',pattern:'^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',flags:'',test:'192.168.1.1'},
  ]
  export default function App(){
    const[pattern,setPattern]=useState('[A-Z][a-z]+')
    const[flags,setFlags]=useState('g')
    const[text,setText]=useState('Hello World from Taif, Saudi Arabia. TypeScript and React are awesome!')
    const[error,setError]=useState('')
    const result=useMemo(()=>{
      if(!pattern)return{matches:[],highlighted:''}
      try{
        const re=new RegExp(pattern,flags.includes('g')?flags:flags+'g')
        setError('')
        const matches:string[]=[]
        let m;while((m=re.exec(text))!==null){matches.push(m[0]);if(!flags.includes('g'))break}
        const highlighted=text.replace(new RegExp(pattern,flags.includes('g')?flags:flags+'g'),'<mark style="background:#fbbf24;color:#0f172a;border-radius:2px;padding:0 2px">$&</mark>')
        return{matches,highlighted}
      }catch(e:any){setError(e.message);return{matches:[],highlighted:''}}
    },[pattern,flags,text])
    const FLAG_LIST=['g','i','m','s']
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0',padding:'2rem'}}>
        <div style={{maxWidth:860,margin:'0 auto'}}>
          <h1 style={{fontWeight:800,fontSize:'1.75rem',marginBottom:'0.5rem',color:'#f8fafc'}}>⚡ Regex Tester</h1>
          <p style={{color:'#94a3b8',marginBottom:'1.5rem',fontSize:'0.9rem'}}>Test regular expressions in real time with match highlighting</p>
          <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem',flexWrap:'wrap'}}>
            {PRESETS.map(p=><button key={p.label} onClick={()=>{setPattern(p.pattern);setFlags(p.flags);setText(p.test)}} style={{padding:'0.35rem 0.9rem',background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:20,cursor:'pointer',fontSize:'0.8rem'}}>{p.label}</button>)}
          </div>
          <div style={{display:'flex',gap:'1rem',marginBottom:'1rem',alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.4rem'}}>PATTERN</label>
              <div style={{display:'flex',alignItems:'center',background:'#111827',border:`1px solid ${error?'#ef4444':'#334155'}`,borderRadius:8,padding:'0.5rem 1rem',fontFamily:'JetBrains Mono,monospace'}}>
                <span style={{color:'#475569'}}>/</span>
                <input value={pattern} onChange={e=>setPattern(e.target.value)} style={{flex:1,background:'none',border:'none',outline:'none',color:'#38bdf8',fontFamily:'inherit',fontSize:'0.9rem',padding:'0 6px'}}/>
                <span style={{color:'#475569'}}>/{flags}</span>
              </div>
              {error&&<div style={{color:'#f87171',fontSize:'0.8rem',marginTop:'0.4rem'}}>❌ {error}</div>}
            </div>
            <div>
              <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.4rem'}}>FLAGS</label>
              <div style={{display:'flex',gap:4}}>
                {FLAG_LIST.map(f=><button key={f} onClick={()=>setFlags(prev=>prev.includes(f)?prev.replace(f,''):prev+f)} style={{width:36,height:36,background:flags.includes(f)?'#1e40af':'#1e293b',color:flags.includes(f)?'#93c5fd':'#94a3b8',border:'1px solid #334155',borderRadius:6,cursor:'pointer',fontFamily:'monospace',fontWeight:700}}>{f}</button>)}
              </div>
            </div>
          </div>
          <div style={{marginBottom:'1rem'}}>
            <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.4rem'}}>TEST STRING</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} rows={3} style={{width:'100%',background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'0.75rem 1rem',color:'#e2e8f0',fontFamily:'Inter,system-ui',fontSize:'0.9rem',outline:'none',resize:'vertical'}}/>
          </div>
          <div style={{marginBottom:'1rem'}}>
            <label style={{color:'#94a3b8',fontSize:'0.8rem',display:'block',marginBottom:'0.4rem'}}>HIGHLIGHTED MATCHES</label>
            <div style={{background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'0.75rem 1rem',lineHeight:1.7,minHeight:60}} dangerouslySetInnerHTML={{__html:result.highlighted||'<span style="color:#475569">No matches</span>'}}/>
          </div>
          <div style={{background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'1rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.75rem'}}>
              <span style={{color:'#94a3b8',fontSize:'0.85rem'}}>MATCHES</span>
              <span style={{background:result.matches.length>0?'#16a34a':'#374151',color:result.matches.length>0?'#bbf7d0':'#9ca3af',padding:'0.15rem 0.6rem',borderRadius:10,fontSize:'0.75rem',fontWeight:700}}>{result.matches.length} found</span>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem'}}>
              {result.matches.map((m,i)=><code key={i} style={{background:'#0f172a',border:'1px solid #1e293b',borderRadius:4,padding:'0.2rem 0.5rem',color:'#fbbf24',fontSize:'0.85rem'}}>{m}</code>)}
            </div>
          </div>
        </div>
      </div>
    )
  }