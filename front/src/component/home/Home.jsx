import React, { useState, useEffect, useRef } from "react";
const PHRASES = ["Don't Wait. Just Drive.", "Reserve in 10 Seconds.", "Your Dream Car. One Click Away.", "The Road is Yours. Reserve Now."];

const css = `
* { margin: 0; padding: 0; box-sizing: border-box; }
body { transition: background 0.3s; overflow-x: hidden; }

:root {
  --bg-color: #f0fdf4;
  --text-main: #064e3b;
  --text-muted: #166534;
  --nav-bg: rgba(255, 255, 255, 0.6);
  --nav-border: rgba(6, 78, 59, 0.1);
  --card-bg: rgba(255, 255, 255, 0.8);
  --card-border: rgba(6, 78, 59, 0.1);
  --grid-line: rgba(6, 78, 59, 0.05);
  --accent-gradient: linear-gradient(135deg, #059669 30%, #10b981 70%, #34d399 100%);
  --accent-color: #10b981;
  --btn-text: #ffffff;
}

[data-theme='dark'] {
  --bg-color: #060912;
  --text-main: #e6edf3;
  --text-muted: #9ca3af;
  --nav-bg: rgba(10, 14, 26, 0.7);
  --nav-border: rgba(255, 255, 255, 0.06);
  --card-bg: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.07);
  --grid-line: rgba(255, 255, 255, 0.03);
  --accent-gradient: linear-gradient(135deg, #e6edf3 30%, #818cf8 70%, #38bdf8 100%);
  --accent-color: #60a5fa;
  --btn-text: #060912;
}

body { background: var(--bg-color); color: var(--text-main); }

.gradient-text { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

@keyframes pulse { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(0.75);opacity:0.5;} }
@keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
@keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
@keyframes breathe { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.6;} 50%{transform:translate(-50%,-50%) scale(1.12);opacity:1;} }
@keyframes spinWheel { 100%{transform:rotate(360deg);} }
@keyframes driveBumps { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-1.5px);} }
@keyframes btnGradientMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }
@keyframes shineSweep { 0%{left:-100%;opacity:0;} 20%{opacity:1;} 60%{left:150%;opacity:0;} 100%{left:150%;opacity:0;} }
@keyframes badgeBlink { 0%,100%{opacity:1;background:rgba(255,255,255,0.15);} 50%{opacity:0.7;background:rgba(255,255,255,0.25);} }
@keyframes marquee { 0%{transform:translateX(0);} 100%{transform:translateX(-50%);} }
@keyframes footerFadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
@keyframes onlineDot { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4);} 50%{box-shadow:0 0 0 5px rgba(34,197,94,0);} }
@keyframes glowPulse { 0%,100%{opacity:0.4;transform:scale(1);} 50%{opacity:0.7;transform:scale(1.1);} }
@keyframes mobileSlideUp { from{opacity:0;transform:translateY(40px);} to{opacity:1;transform:translateY(0);} }
@keyframes mobilePing { 0%{transform:scale(1);opacity:1;} 100%{transform:scale(2);opacity:0;} }

.nav-wrapper { position: sticky; top: 10px; z-index: 100; margin: 0 20px; transition: all 0.3s ease; }
.nav-glass { display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; background: var(--nav-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--nav-border); border-radius: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.05); animation: fadeUp 0.6s ease-out; }
.nav-link { position: relative; color: var(--text-muted); text-decoration: none; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; padding: 8px 16px; border-radius: 12px; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); overflow: hidden; }
.nav-link::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:var(--text-main); opacity:0; z-index:-1; transition:opacity 0.3s ease; border-radius:12px; }
.nav-link:hover { color:var(--bg-color); transform:translateY(-2px); }
.nav-link:hover::before { opacity:1; }

.icon-btn { background:rgba(255,255,255,0.05); border:1px solid var(--nav-border); color:var(--text-main); cursor:pointer; padding:10px; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
.icon-btn:hover { background:var(--text-main); color:var(--bg-color); transform:scale(1.1) rotate(5deg); box-shadow:0 4px 12px rgba(0,0,0,0.1); }

.primary-btnDE {
  position:relative; background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 100%); background-size:200% 200%;
  color:#ffffff; border:none; border-radius:16px; font-family:'Syne',sans-serif; font-weight:800; cursor:pointer;
  display:flex; align-items:center; justify-content:center; gap:10px; letter-spacing:0.3px; overflow:hidden;
  transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); animation:btnGradientMove 4s ease infinite;
  box-shadow:0 0 0 1px rgba(37,99,235,0.3),0 4px 15px rgba(37,99,235,0.3),0 0 40px rgba(14,165,233,0.15);
}
.primary-btnDE::before { content:''; position:absolute; top:0; left:-100%; width:60%; height:100%; background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.25) 50%,transparent 100%); animation:shineSweep 3s ease-in-out infinite; pointer-events:none; }
.primary-btnDE::after { content:''; position:absolute; inset:-3px; border-radius:19px; background:var(--accent-gradient); background-size:300% 300%; z-index:-1; opacity:0.6; filter:blur(6px); animation:btnGradientMove 4s ease infinite; }
.primary-btnDE:hover { transform:translateY(-4px) scale(1.04); box-shadow:0 0 0 1px rgba(14,165,233,0.5),0 8px 30px rgba(37,99,235,0.5),0 0 60px rgba(14,165,233,0.3); }
.primary-btnDE:active { transform:translateY(1px) scale(0.98); }

:root .primary-btnDE { background:linear-gradient(135deg,#059669 0%,#0a523a9a 50%,#197553ff 100%); box-shadow:0 0 0 1px rgba(5,150,105,0.3),0 4px 15px rgba(5,150,105,0.3),0 0 40px rgba(52,211,153,0.15); }
:root .primary-btnDE::after { background:linear-gradient(135deg,#059669,#10b981,#34d399,#059669); }
[data-theme='dark'] .primary-btnDE { background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 100%); box-shadow:0 0 0 1px rgba(37,99,235,0.3),0 4px 15px rgba(37,99,235,0.3),0 0 40px rgba(14,165,233,0.15); }
[data-theme='dark'] .primary-btnDE::after { background:linear-gradient(135deg,#2563eb,#0ea5e9,#6366f1,#2563eb); }

.secondary-btn { background:transparent; color:var(--text-main); border:1px solid var(--card-border); padding:14px 28px; border-radius:16px; font-family:'Syne',sans-serif; font-size:16px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:10px; }
.secondary-btn:hover { background:var(--text-main); color:var(--bg-color); transform:translateY(-3px) scale(1.02); box-shadow:0 12px 32px rgba(0,0,0,0.15); border-color:var(--text-main); }
.secondary-btn svg { transition:transform 0.3s ease; }
.secondary-btn:hover svg { transform:translateX(4px); }

.primary-btnE { color:#ffffff; border:none; padding:10.5px 30px; border-radius:12px; font-family:'Syne',sans-serif; font-size:15.3px; font-weight:700; cursor:pointer; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); display:flex; align-items:center; justify-content:center; gap:8px; backdrop-filter:blur(4px); background:var(--text-main); }
.primary-btnE:hover { background:var(--accent-gradient); color:white; transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.1); border:none; }
[data-theme='dark'] .primary-btnE { background:linear-gradient(155deg,#1e3a8a,#1d4ed8); box-shadow:0px 0px 15px #1e3a8a; }

.fleet-card { background:var(--card-bg); border:1px solid var(--card-border); border-radius:24px; padding:32px; transition:all 0.4s cubic-bezier(0.2,0.8,0.2,1); display:flex; flex-direction:column; overflow:hidden; position:relative; }
.fleet-card:hover { transform:translateY(-10px); border-color:var(--accent-color); box-shadow:0 24px 48px rgba(0,0,0,0.1); }

/* Footer styles */
.f-link { color:var(--text-muted); text-decoration:none; font-size:16px; font-weight:500; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); position:relative; display:inline-block; padding-bottom:1px; }
.f-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--accent-color); transition:width 0.35s ease; }
.f-link:hover { color:var(--text-main); transform:translateX(5px); }
.f-link:hover::after { width:100%; }
.f-social { width:48px; height:48px; border-radius:50%; background:var(--card-bg); border:1px solid var(--card-border); display:flex; align-items:center; justify-content:center; color:var(--text-main); font-weight:700; font-size:14px; cursor:pointer; transition:all 0.4s cubic-bezier(0.34,1.56,0.64,1); position:relative; overflow:hidden; }
.f-social::before { content:''; position:absolute; inset:0; background:var(--accent-gradient); opacity:0; transition:opacity 0.3s; }
.f-social span { position:relative; z-index:1; transition:color 0.3s; }
.f-social:hover { transform:translateY(-6px) scale(1.1); border-color:var(--accent-color); box-shadow:0 12px 28px rgba(0,0,0,0.15),0 0 0 1px var(--accent-color); }
.f-social:hover::before { opacity:1; }
.f-social:hover span { color:var(--btn-text); }
.f-col-title { font-family:'Syne',sans-serif; font-size:14px; font-weight:800; color:var(--text-main); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:24px; position:relative; display:inline-block; }
.f-col-title::after { content:''; position:absolute; bottom:-6px; left:0; width:24px; height:2px; background:var(--accent-color); border-radius:2px; transition:width 0.4s ease; }
.f-col:hover .f-col-title::after { width:100%; }
.f-bottom-link { color:var(--text-muted); font-size:15px; text-decoration:none; transition:all 0.3s; }
.f-bottom-link:hover { color:var(--accent-color); }

/* ══════════════════════════════════
   MOBILE STYLES — Ultra Modern
══════════════════════════════════ */
@media (max-width: 768px) {

  /* NAV */
  .nav-wrapper { margin: 0 10px; top: 8px; }
  .nav-glass { padding: 10px 14px; border-radius: 18px; }
  .nav-glass ul { display: none !important; }

  /* BUTTONS */
  .primary-btnDE { border-radius: 14px !important; }
  .secondary-btn { border-radius: 14px !important; }

  /* FOOTER MOBILE */
  .f-link { font-size: 14px; }
  .f-col-title { font-size: 12px; margin-bottom: 16px; }
  .f-social { width: 42px; height: 42px; font-size: 12px; }

  /* HIDE SCROLLBAR */
  .mobile-scroll::-webkit-scrollbar { display: none; }
  .mobile-scroll { -ms-overflow-style: none; scrollbar-width: none; }

  /* MOBILE NAV BOTTOM */
 
  /* MOBILE CARD SWIPE */
  .mobile-card-row {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding: 4px 16px 8px;
    margin: 0 -16px;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .mobile-card-row::-webkit-scrollbar { display: none; }
  .mobile-card-snap { scroll-snap-align: start; flex-shrink: 0; }

  /* PANEL MOBILE */
  .hiw-panel-mobile {
    border-right: none !important;
    border-bottom: 1px solid var(--card-border);
    padding: 40px 20px !important;
  }
  .hiw-panel-mobile:last-child { border-bottom: none; }
}
`;

function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>;
}
function SunIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}
function MoonIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
}
function GlobeIcon({ size = 24, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function ZapIcon({ size = 24, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function CheckIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
}
function ShieldIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
function CrosshairIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="22" y1="12" x2="18" y2="12" /><line x1="6" y1="12" x2="2" y2="12" /><line x1="12" y1="6" x2="12" y2="2" /><line x1="12" y1="22" x2="12" y2="18" /></svg>;
}
function MapPinIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
function ArrowRightIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}
function CompassIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>;
}

function AnimatedLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
      <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 14, background: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg,transparent 0%,var(--accent-color) 30%,transparent 40%)', animation: 'spinWheel 4s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 2, background: 'var(--bg-color)', borderRadius: 12, zIndex: 1 }} />
        <svg style={{ zIndex: 2, animation: 'driveBumps 2s ease-in-out infinite' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3" />
          <circle cx="6.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '6.5px 16.5px' }} />
          <circle cx="16.5" cy="16.5" r="2.5" style={{ animation: 'spinWheel 1s linear infinite', transformOrigin: '16.5px 16.5px' }} />
        </svg>
      </div>
      <div style={{ position: 'relative', fontFamily: "'Syne',sans-serif", fontWeight: 900, fontSize: 26, letterSpacing: "-0.5px" }}>
        <span style={{ color: "var(--text-main)" }}>Upp</span>
        <span style={{ color: "var(--accent-color)" }}>Car</span>
        <span style={{ position: 'absolute', bottom: 6, right: -12, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-color)', animation: 'blink 2s infinite' }} />
      </div>
    </div>
  );
}

class Particle {
  constructor(W, H) { this.W = W; this.H = H; this.reset(); }
  reset() { this.x = Math.random() * this.W; this.y = Math.random() * this.H; this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4; this.r = Math.random() * 1.5 + 0.5; this.alpha = Math.random() * 0.5 + 0.2; const colors = ["#6366f1", "#3b82f6", "#38bdf8", "#a78bfa", "#34d399"]; this.color = colors[Math.floor(Math.random() * colors.length)]; }
  update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > this.W || this.y < 0 || this.y > this.H) this.reset(); }
}



export default function UppCarLanding() {
  const canvasRef = useRef(null);
  const footerRef = useRef(null);
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        setShowScrollButton(footerTop < window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  useEffect(() => {
    const current = PHRASES[phraseIndex];
    let timeout;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), isMobile ? 8 : 28);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), isMobile ? 500 : 1200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), isMobile ? 5 : 18);
    } else {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, phraseIndex, isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], animId, t = 0;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; particles = Array.from({ length: 120 }, () => new Particle(W, H)); }
    function drawGrid() { ctx.globalAlpha = 0.03; ctx.strokeStyle = isDarkMode ? "#6366f1" : "#10b981"; ctx.lineWidth = 0.5; for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
    function drawConnections() { for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const d = Math.sqrt(dx * dx + dy * dy); if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.08; ctx.strokeStyle = isDarkMode ? "#6366f1" : "#059669"; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } } } }
    function drawAurora() { t += 0.005; const g1 = ctx.createRadialGradient(W * 0.5 + Math.sin(t) * 80, H * 0.2 + Math.cos(t * 0.7) * 40, 0, W * 0.5, H * 0.3, W * 0.6); g1.addColorStop(0, isDarkMode ? "rgba(99,102,241,0.07)" : "transparent"); g1.addColorStop(0.4, isDarkMode ? "rgba(59,130,246,0.04)" : "transparent"); g1.addColorStop(1, "transparent"); ctx.globalAlpha = 1; ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H); const g2 = ctx.createRadialGradient(W * 0.8 + Math.cos(t * 0.6) * 60, H * 0.6 + Math.sin(t) * 50, 0, W * 0.8, H * 0.6, W * 0.4); g2.addColorStop(0, isDarkMode ? "rgba(167,139,250,0.05)" : "rgba(5,150,105,0.05)"); g2.addColorStop(1, "transparent"); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H); }
    function loop() { ctx.clearRect(0, 0, W, H); ctx.fillStyle = isDarkMode ? "#060912" : "#f0fdf4"; ctx.globalAlpha = 1; ctx.fillRect(0, 0, W, H); drawGrid(); drawAurora(); if (isDarkMode) { drawConnections(); particles.forEach(p => { p.update(); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha; ctx.fill(); }); } animId = requestAnimationFrame(loop); }
    resize(); window.addEventListener("resize", resize); loop();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [isDarkMode]);

  const brandColors = {
    "Mercedes-Benz": { light: "#00ADEF", dark: "#38bdf8" }, "Porsche": { light: "#D5001C", dark: "#f87171" },
    "BMW": { light: "#1C69D4", dark: "#60a5fa" }, "Audi": { light: "#BB0A14", dark: "#fb923c" },
    "Range Rover": { light: "#005A2B", dark: "#34d399" }, "Maserati": { light: "#1B3A6B", dark: "#818cf8" },
    "Aston Martin": { light: "#004225", dark: "#6ee7b7" }, "Tesla": { light: "#CC0000", dark: "#f87171" },
    "Jaguar": { light: "#2563eb", dark: "#93c5fd" }, "Lexus": { light: "#9f1239", dark: "#fca5a5" },
    "Volvo": { light: "#003057", dark: "#7dd3fc" }, "Alfa Romeo": { light: "#991b1b", dark: "#fca5a5" },
    "Bentley": { light: "#065f46", dark: "#6ee7b7" }, "Ferrari": { light: "#D40000", dark: "#f87171" },
    "Lamborghini": { light: "#b45309", dark: "#fcd34d" }, "Bugatti": { light: "#1C3F8F", dark: "#a5b4fc" },
  };
  const getColor = (brand) => isDarkMode ? brandColors[brand]?.dark : brandColors[brand]?.light;

  return (
    <>
      <style>{css}</style>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ══ NAV ══ */}
        <div className="nav-wrapper">
          <nav className="nav-glass">
            <AnimatedLogo />
            {!isMobile && (
              <ul style={{ display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0 }}>
                {[{ l: "Vehicles" }, { l: "Services" }, { l: "Pricing", b: true }, { l: "About Us" }].map(({ l, b }) => (
                  <li key={l}>
                    <a href="/" className="nav-link" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      {l}
                      {b && <span style={{ background: "var(--accent-gradient)", color: isDarkMode ? "#000" : "#fff", fontSize: 9, padding: "2px 6px", borderRadius: 6, fontWeight: 800, textTransform: "uppercase" }}>New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12 }}>
              {!isMobile && <button className="icon-btn"><SearchIcon /></button>}
              <button className="icon-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
              </button>
              {!isMobile && <div style={{ width: 1, height: 24, background: "var(--nav-border)", margin: "0 4px" }} />}
              <button className="primary-btnE" style={isMobile ? { padding: "8px 14px", fontSize: 13 } : {}}>
                {isMobile ? "Sign In" : "Sign In"}
              </button>
            </div>
          </nav>
        </div>

        {/* ══ HERO ══ */}
        <section style={{
          display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          padding: isMobile ? "60px 16px 48px" : "90px 20px 70px",
          position: "relative",
        }}>
          {isDarkMode && (
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              width: isMobile ? 280 : 600, height: isMobile ? 280 : 600,
              borderRadius: "50%",
              background: "radial-gradient(ellipse,rgba(99,102,241,0.12) 0%,rgba(59,130,246,0.06) 40%,transparent 70%)",
              pointerEvents: "none", animation: "breathe 6s ease-in-out infinite",
              transform: "translate(-50%,-50%)",
            }} />
          )}

          {/* Mobile live badge */}
          {isMobile && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              borderRadius: 20, padding: "6px 14px", marginBottom: 26,
              animation: "mobileSlideUp 0.5s ease both",
            }}>
              <div style={{ position: "relative", width: 8, height: 8 }}>
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e", animation: "mobilePing 1.5s ease-out infinite" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e" }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.1em" }}>500+ cars available now</span>
            </div>
          )}

          <h1 style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: isMobile ? "clamp(36px,9vw,37px)" : "clamp(50px,4.8vw,90px)",
            fontWeight: 800,
            letterSpacing: isMobile ? -2 : -3,
            lineHeight: isMobile ? 1.1 : 1,
            marginBottom: isMobile ? 20 : 79,
            background: "var(--accent-gradient)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "fadeUp 0.7s 0.1s ease both",
            position: "relative", top: isMobile ? 0 : 36,
            maxWidth: isMobile ? 340 : "100%",
          }}>
            {isMobile
              ? <>The Car You Want Ready To Drive<br /></>
              : <>The Car You Want The Second<br />You Need It</>
            }
          </h1>

          {/* Typewriter */}
          <div style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: isMobile ? "clamp(16px,5vw,24px)" : "clamp(55px,3.5vw,37px)",
            fontWeight: 400, color: "var(--accent-color)",
            marginBottom: isMobile ? 30 : 28,
            height: "1.5em", width: "100%",
            maxWidth: isMobile ? 370 : 900,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
            animation: "fadeUp 0.7s 0.2s ease both",
          }}>
            <span>{displayed}</span>
            <span style={{ display: "inline-block", width: 2, height: "0.85em", background: "var(--accent-color)", animation: "blink 1s infinite", flexShrink: 0, boxShadow: `0 0 6px var(--accent-color)` }} />
          </div>

          {!isMobile && (
            <p style={{ color: "var(--text-muted)", fontSize: 25, maxWidth: 760, marginBottom: 38, animation: "fadeUp 0.7s 0.3s ease both" }}>
              Professional-grade quantitative tools. No coding required.<br />Verification built into the architecture.
            </p>
          )}

          {/* Info badge */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--card-bg)", border: "1px solid var(--card-border)",
            color: "var(--accent-color)",
            fontSize: isMobile ? 13 : 16,
            fontWeight: 600,
            padding: isMobile ? "10px 18px" : "13px 32px",
            borderRadius: 16, marginBottom: isMobile ? 24 : 48,
            animation: "fadeUp 0.7s 0.4s ease both",
            width: isMobile ? "100%" : 560,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {isMobile ? "No Deposit · Fully Insured" : "No Deposit Required – Fully Insured Vehicles"}
          </div>

          {/* CTA buttons */}
          <div style={{
            display: "flex", gap: 12, marginBottom: isMobile ? 38 : 44,
            animation: "fadeUp 0.7s 0.6s ease both",
            width: isMobile ? "100%" : "auto",
            flexDirection: isMobile ? "row" : "row",
            justifyContent: isMobile ? "center" : "center",
          }}>
            <button className="primary-btnDE" style={{ padding: isMobile ? "16px 24px" : "16px 36px", fontSize: 16, width: isMobile ? "200px" : "auto" }}>
              Reserve Now <ArrowRightIcon size={19} />
            </button>
            <button className="secondary-btn" style={{ padding: isMobile ? "14px 24px" : "16px 36px", fontSize: isMobile ? 15 : 16, width: isMobile ? "200px" : "auto" }}>
              <CompassIcon size={18} /> Browse Fleet
            </button>
          </div>

          {/* Feature pills */}
          <div className={isMobile ? "mobile-scroll" : ""} style={{
            display: "flex",
            gap: isMobile ? 8 : 28,
            flexWrap: isMobile ? "nowrap" : "wrap",
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: isMobile ? "auto" : "visible",
            width: isMobile ? "calc(100% + 32px)" : "auto",
            marginLeft: isMobile ? -16 : 0,
            paddingLeft: isMobile ? 16 : 0,
            paddingRight: isMobile ? 16 : 0,
            paddingBottom: isMobile ? 4 : 0,
            animation: "fadeUp 0.7s 0.7s ease both",
          }}>
            {[
              { icon: <CheckIcon />, l: isMobile ? "No Deposit" : "No Deposit Required" },
              { icon: <CrosshairIcon />, l: isMobile ? "Contactless" : "Contactless Handover" },
              { icon: <ShieldIcon />, l: "Fully Insured" },
              { icon: <MapPinIcon />, l: isMobile ? "150+ Locs" : "150+ Locations" },
            ].map(({ icon, l }) => (
              <div key={l} style={{
                display: "flex", alignItems: "center", gap: 7,
                color: "var(--text-muted)", fontSize: isMobile ? 12 : 13, fontWeight: 600,
                background: "var(--card-bg)", padding: isMobile ? "8px 14px" : "10px 20px",
                borderRadius: 20, border: "1px solid var(--card-border)",
                flexShrink: 0,
              }}>
                <span style={{ color: "var(--accent-color)", display: "flex", alignItems: "center" }}>{icon}</span>{l}
              </div>
            ))}
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <section style={{ padding: isMobile ? "32px 0" : "50px 0", position: "relative", marginTop: isMobile ? 20 : 60 }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "15%", height: "100%", background: "linear-gradient(to right,var(--bg-color),transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "15%", height: "100%", background: "linear-gradient(to left,var(--bg-color),transparent)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ textAlign: "center", marginBottom: isMobile ? 24 : 40, position: "relative", zIndex: 1 }}>
            <span style={{ fontSize: isMobile ? 12 : 22, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent-color)" }}>
              Trusted by world-class manufacturers
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 24 : 40, position: "relative", zIndex: 1 }}>
            {/* ROW 1 */}
            <div style={{ display: "flex", width: "fit-content" }}>
              <div style={{ display: "flex", gap: isMobile ? 60 : 100, alignItems: "center", paddingRight: isMobile ? 60 : 100, animation: "marquee 40s linear infinite" }}>
                {["Mercedes-Benz", "Porsche", "BMW", "Audi", "Range Rover", "Maserati", "Aston Martin", "Tesla",
                  "Mercedes-Benz", "Porsche", "BMW", "Audi", "Range Rover", "Maserati", "Aston Martin", "Tesla"].map((brand, i) => {
                    const color = getColor(brand);
                    return (
                      <div key={`r1-${i}`} style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, opacity: 0.5, transition: "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)", cursor: "pointer", filter: "grayscale(40%)" }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.transform = "scale(1.15) translateY(-5px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.5; e.currentTarget.style.filter = "grayscale(40%)"; e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
                        <div style={{ width: isMobile ? 32 : 44, height: isMobile ? 32 : 44, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 20px ${color}25`, transition: "all 0.5s" }}>
                          <GlobeIcon size={isMobile ? 14 : 20} color={color} />
                        </div>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 36, letterSpacing: "-0.02em", color: color, whiteSpace: "nowrap", transition: "color 0.5s", textShadow: `0 0 40px ${color}30` }}>{brand}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* ROW 2 */}
            <div style={{ display: "flex", width: "fit-content" }}>
              <div style={{ display: "flex", gap: isMobile ? 60 : 100, alignItems: "center", paddingRight: isMobile ? 60 : 100, animation: "marquee 50s linear infinite reverse" }}>
                {["Jaguar", "Lexus", "Volvo", "Alfa Romeo", "Bentley", "Ferrari", "Lamborghini", "Bugatti",
                  "Jaguar", "Lexus", "Volvo", "Alfa Romeo", "Bentley", "Ferrari", "Lamborghini", "Bugatti"].map((brand, i) => {
                    const color = getColor(brand);
                    return (
                      <div key={`r2-${i}`} style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 16, opacity: 0.4, transition: "all 0.5s cubic-bezier(0.175,0.885,0.32,1.275)", cursor: "pointer", filter: "grayscale(40%)" }}
                        onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.transform = "scale(1.15) translateY(-5px)"; }}
                        onMouseLeave={e => { e.currentTarget.style.opacity = 0.4; e.currentTarget.style.filter = "grayscale(40%)"; e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
                        <div style={{ width: isMobile ? 26 : 36, height: isMobile ? 26 : 36, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 16px ${color}20` }}>
                          <ZapIcon size={isMobile ? 12 : 16} color={color} />
                        </div>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 15 : 24, letterSpacing: "-0.01em", color: color, whiteSpace: "nowrap", textShadow: `0 0 30px ${color}25` }}>{brand}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section style={{ padding: isMobile ? "0" : "50px 0 0", position: "relative", marginTop: isMobile ? 40 : 6 }}>

          {/* TOP HEADER BAND */}
          <div style={{
            padding: isMobile ? "48px 20px 40px" : "100px 80px 80px",
            display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
            borderBottom: "1px solid var(--card-border)",
            flexWrap: "wrap", gap: isMobile ? 24 : 40, position: "relative",
            flexDirection: isMobile ? "column" : "row",
          }}>
            <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, background: "radial-gradient(circle,var(--accent-color) 0%,transparent 70%)", opacity: 0.06, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, width: isMobile ? "100%" : "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: isMobile ? 20 : 32 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-color)", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.3em", textTransform: "uppercase" }}>How It Works</span>
                <div style={{ width: 48, height: 1, background: "var(--card-border)" }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--text-muted)", letterSpacing: "0.15em", display: isMobile ? "none" : "inline" }}>3 steps · Under 60 seconds</span>
              </div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(44px,11vw,64px)" : "clamp(56px,6vw,96px)", color: "var(--text-main)", letterSpacing: -4, lineHeight: 0.88, margin: 0 }}>
                From Zero<br />
                <span style={{ WebkitTextStroke: "2px var(--accent-color)", WebkitTextFillColor: "transparent", color: "transparent" }}>to Rolling.</span>
              </h2>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile ? "row" : "column", gap: isMobile ? 24 : 32, alignItems: isMobile ? "center" : "flex-end", width: isMobile ? "100%" : "auto", justifyContent: isMobile ? "space-around" : "flex-end" }}>
              {!isMobile && (
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 380, textAlign: "right", margin: 0 }}>
                  We rebuilt car rental from the ground up. No deposits. No paperwork. No queues.
                </p>
              )}
              <div style={{ display: "flex", gap: isMobile ? 16 : 32 }}>
                {[{ v: "50K+", l: "drivers" }, { v: "4.9", l: "rating" }, { v: "0s", l: "paperwork" }].map(s => (
                  <div key={s.l} style={{ textAlign: isMobile ? "center" : "right" }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "var(--text-main)", letterSpacing: -1 }}>{s.v}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THREE PANELS */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", minHeight: isMobile ? "auto" : 680 }}>

            {/* PANEL 1 */}
            {[
              {
                num: "01", color: "#10b981", title: "Browse & Pick", desc: "500+ hand-selected vehicles. Filter by brand, model, specs, and live availability.", features: ["Real-time availability", "500+ vehicles", "Filter by specs & price"], badge: "10 seconds",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>,
                content: null
              },
              {
                num: "02", color: "#3b82f6", title: "Confirm Instantly", desc: "No paperwork. No deposit. One tap confirms your booking — insurance activates immediately.", features: [], badge: "Zero deposit",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>,
                content: "booking"
              },
              {
                num: "03", color: "#a855f7", title: "Unlock & Drive", desc: "Walk up, tap your phone, doors open. Drive anywhere. Return to any UppCar hub.", features: [], badge: "No keys needed",
                icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86A1 1 0 0 0 1 12.85V16h3" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>,
                content: "unlock"
              },
            ].map((panel, idx) => (
              <div key={panel.num}
                className={isMobile ? "hiw-panel-mobile" : ""}
                style={{
                  borderRight: !isMobile && idx < 2 ? "1px solid var(--card-border)" : "none",
                  borderBottom: isMobile && idx < 2 ? "1px solid var(--card-border)" : "none",
                  padding: isMobile ? "40px 20px" : "72px 60px",
                  position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
                  transition: "background 0.6s ease", cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.background = `rgba(${panel.color === "#10b981" ? "16,185,129" : panel.color === "#3b82f6" ? "59,130,246" : "168,85,247"},0.035)`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ position: "absolute", bottom: -30, left: -20, fontFamily: "'Syne',sans-serif", fontSize: isMobile ? 160 : 260, fontWeight: 800, lineHeight: 1, color: panel.color, opacity: 0.04, userSelect: "none", pointerEvents: "none", letterSpacing: -12 }}>{panel.num}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 32 : 64 }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: panel.color, letterSpacing: "0.2em" }}>{panel.num} —</div>
                  <div style={{ padding: "6px 16px", border: `1px solid ${panel.color}4D`, borderRadius: 30, fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: panel.color, letterSpacing: "0.1em", textTransform: "uppercase", background: `${panel.color}0D` }}>{panel.badge}</div>
                </div>
                <div style={{ width: isMobile ? 56 : 72, height: isMobile ? 56 : 72, borderRadius: 20, border: `1px solid ${panel.color}40`, background: `${panel.color}0F`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: isMobile ? 24 : 36 }}>
                  {panel.icon}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : 36, color: "var(--text-main)", letterSpacing: -1.5, lineHeight: 1.05, marginBottom: 16 }}
                  dangerouslySetInnerHTML={{ __html: panel.title.replace(" & ", "<br/>&amp; ").replace(" I", "<br/>I") }}
                />
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: isMobile ? 24 : 48, maxWidth: 300 }}>{panel.desc}</p>
                {panel.features.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
                    {panel.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${panel.color}66`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={panel.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
                {panel.content === "booking" && (
                  <div style={{ marginTop: "auto", border: "1px solid var(--card-border)", borderRadius: 20, padding: "20px 24px", background: "var(--card-bg)", position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Your booking</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-main)" }}>Tesla Model 3</div>
                      </div>
                      <div style={{ padding: "6px 14px", borderRadius: 20, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, color: "#10b981" }}>Confirmed ✓</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--card-border)" }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "var(--text-muted)" }}>Deposit</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: "#10b981" }}>$0.00</div>
                    </div>
                  </div>
                )}
                {panel.content === "unlock" && (
                  <div style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
                    {[
                      { stroke: "#a855f7", bg: "rgba(168,85,247,0.12)", bdr: "rgba(168,85,247,0.25)", status: "Locked · Tap to unlock", dot: "#f59e0b", pathD: "M7 11V7a5 5 0 0 1 10 0v4" },
                      { stroke: "#10b981", bg: "rgba(16,185,129,0.12)", bdr: "rgba(16,185,129,0.25)", status: "Unlocked · Ready to drive", dot: "#10b981", pathD: "M7 11V7a5 5 0 0 1 9.9-1", statusColor: "#10b981" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, border: `1px solid ${i === 0 ? "var(--card-border)" : item.bdr}`, borderRadius: 20, padding: "14px 18px", background: i === 0 ? "var(--card-bg)" : `rgba(16,185,129,0.04)`, marginBottom: i === 0 ? 10 : 0 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: item.bg, border: `1px solid ${item.bdr}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d={item.pathD} />
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "var(--text-muted)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>Vehicle status</div>
                          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: item.statusColor || "var(--text-main)" }}>{item.status}</div>
                        </div>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.dot, animation: "pulse 1.5s infinite" }} />
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right,${panel.color},transparent)`, opacity: 0, transition: "opacity 0.4s" }}
                  ref={el => { if (el) { const p = el.parentElement; p.addEventListener("mouseenter", () => el.style.opacity = "1"); p.addEventListener("mouseleave", () => el.style.opacity = "0"); } }}
                />
              </div>
            ))}
          </div>

          {/* BOTTOM BAND */}
          <div style={{
            borderTop: "1px solid var(--card-border)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1px 1fr 1px 1fr 1px auto",
            alignItems: "stretch",
            gap: isMobile ? 0 : "unset",
          }}>
            {isMobile ? (
              <>
                {[{ n: "1", c: "#10b981", l: "Browse → 10s" }, { n: "2", c: "#3b82f6", l: "Confirm → $0" }, { n: "3", c: "#a855f7", l: "Unlock → Drive" }].map((s, i) => (
                  <div key={s.n} style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 12, borderRight: i === 0 ? "1px solid var(--card-border)" : "none", borderBottom: i < 2 ? "1px solid var(--card-border)" : "none", gridColumn: i === 2 ? "1/-1" : "auto" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.c}1A`, border: `1px solid ${s.c}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 800, color: s.c }}>{s.n}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: s.c, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginBottom: 2 }}>Step {s.n}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-main)" }}>{s.l}</div>
                    </div>
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px solid var(--card-border)" }}>
                  <button className="primary-btnDE" style={{ padding: "14px 32px", fontSize: 14, whiteSpace: "nowrap", width: "100%" }}>
                    Try It Now <ArrowRightIcon size={15} />
                  </button>
                </div>
              </>
            ) : (
              <>
                {[{ n: "1", c: "#10b981", l: "Browse → 10s", s: "Step 1" }, { n: "2", c: "#3b82f6", l: "Confirm → $0", s: "Step 2" }, { n: "3", c: "#a855f7", l: "Unlock → Drive", s: "Step 3" }].map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div style={{ padding: "36px 60px", display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.c}1A`, border: `1px solid ${s.c}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: s.c }}>{s.n}</span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: s.c, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, marginBottom: 2 }}>{s.s}</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: "var(--text-main)" }}>{s.l}</div>
                      </div>
                    </div>
                    {i < 2 && <div style={{ width: 1, background: "var(--card-border)" }} />}
                  </React.Fragment>
                ))}
                <div style={{ width: 1, background: "var(--card-border)" }} />
                <div style={{ padding: "36px 60px", display: "flex", alignItems: "center" }}>
                  <button className="primary-btnDE" style={{ padding: "16px 36px", fontSize: 14, whiteSpace: "nowrap" }}>
                    Try It Now <ArrowRightIcon size={15} />
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ══ FLEET ══ */}
        <section style={{ padding: isMobile ? "80px 16px" : "120px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", flexWrap: "wrap", gap: 24, marginBottom: isMobile ? 32 : 64, flexDirection: isMobile ? "column" : "row" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 30, padding: "6px 16px", marginBottom: 16 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-color)", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Premium Fleet</span>
                </div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(32px,8vw,48px)" : "clamp(36px,4vw,60px)", color: "var(--text-main)", letterSpacing: -2, lineHeight: 1, margin: 0 }}>
                  Every Car.<br /><span style={{ color: "var(--text-muted)", fontWeight: 400 }}>Every Dream.</span>
                </h2>
              </div>
              <button className="secondary-btn" style={{ fontSize: 15, width: isMobile ? "100%" : "auto" }}>
                Full Catalogue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            </div>

            {isMobile ? (
              /* Mobile: Big card + horizontal scroll for small cards */
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Big card mobile */}
                <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 28, padding: 28, position: "relative", overflow: "hidden", cursor: "pointer", transition: "all 0.5s cubic-bezier(0.2,0.8,0.2,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(59,130,246,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, position: "relative", zIndex: 1 }}>
                    <span style={{ padding: "5px 12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 16, fontSize: 11, fontWeight: 700, color: "#3b82f6" }}>⚡ Electric Luxury</span>
                    <div style={{ padding: "5px 12px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>★ Featured</div>
                  </div>
                  <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                    <img src="https://pngimg.com/uploads/tesla_car/tesla_car_PNG44.png" alt="Tesla" style={{ maxWidth: "90%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 24px rgba(59,130,246,0.3))", transition: "transform 0.5s ease" }} />
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                      {["1,020 hp", "AWD", "2.1s", "Electric"].map(s => (
                        <span key={s} style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2px 8px", borderRadius: 12 }}>{s}</span>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "var(--text-main)", marginBottom: 16, letterSpacing: -0.5 }}>Tesla Model S Plaid</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--card-border)" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>From</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, color: "var(--text-main)", letterSpacing: -1 }}>$145<span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>/day</span></div>
                      </div>
                      <button className="primary-btnDE" style={{ padding: "12px 22px", fontSize: 13 }}>Reserve Now</button>
                    </div>
                  </div>
                </div>

                {/* Small cards — horizontal scroll */}
                {/* Small cards — vertical stack sur mobile */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { img: "https://pngimg.com/uploads/land_rover/land_rover_PNG77.png", name: "Range Rover Sport", tag: "Executive SUV", tagColor: "#10b981", price: "$95", specs: ["395 hp", "AWD", "Hybrid"], glow: "rgba(16,185,129,0.1)" },
                    { img: "https://pngimg.com/uploads/porsche/porsche_PNG102847.png", name: "Porsche 911 Carrera S", tag: "Sport Coupé", tagColor: "#f59e0b", price: "$150", specs: ["450 hp", "RWD", "Petrol"], glow: "rgba(245,158,11,0.1)" },
                  ].map(card => (
                    <div key={card.name} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 24, padding: 24, position: "relative", overflow: "hidden", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.2,0.8,0.2,1)", width: "100%" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = card.tagColor; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ position: "absolute", top: "40%", right: -30, width: 160, height: 160, background: `radial-gradient(circle,${card.glow} 0%,transparent 70%)` }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, position: "relative", zIndex: 1 }}>
                        <span style={{ padding: "4px 10px", background: `${card.tagColor}1A`, border: `1px solid ${card.tagColor}4D`, borderRadius: 12, fontSize: 10, fontWeight: 700, color: card.tagColor }}>{card.tag}</span>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 800, color: "var(--text-main)" }}>{card.price}<span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>/day</span></span>
                      </div>
                      <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                        <img src={card.img} alt={card.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 12px 12px rgba(0,0,0,0.35))" }} />
                      </div>
                      <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "var(--text-main)", marginTop: 12, marginBottom: 6, position: "relative", zIndex: 1 }}>{card.name}</h3>
                      <div style={{ display: "flex", gap: 5, position: "relative", zIndex: 1 }}>
                        {card.specs.map(s => <span key={s} style={{ fontSize: 10, color: "var(--text-muted)", background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2px 7px", borderRadius: 10, fontWeight: 500 }}>{s}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop: original grid */
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gridTemplateRows: "auto auto", gap: 24 }}>
                <div style={{ gridRow: "1/3", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 32, padding: 40, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 540, cursor: "pointer", transition: "all 0.5s cubic-bezier(0.2,0.8,0.2,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 32px 64px rgba(59,130,246,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "auto", position: "relative", zIndex: 1 }}>
                    <span style={{ padding: "6px 16px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "#3b82f6", letterSpacing: "0.05em" }}>Electric Luxury</span>
                    <div style={{ padding: "6px 14px", background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 20, fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>Featured</div>
                  </div>
                  <div style={{ height: 260, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                    <img src="https://pngimg.com/uploads/tesla_car/tesla_car_PNG44.png" alt="Tesla" style={{ maxWidth: "90%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 30px 30px rgba(59,130,246,0.3))", transition: "transform 0.5s ease" }} />
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 32, color: "var(--text-main)", marginBottom: 8, letterSpacing: -1 }}>Tesla Model S Plaid</h3>
                    <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
                      {["1,020 hp", "AWD", "0–100 in 2.1s", "Electric"].map(s => <span key={s} style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>{s}</span>)}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid var(--card-border)" }}>
                      <div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>From</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, color: "var(--text-main)", letterSpacing: -1 }}>$145<span style={{ fontSize: 15, color: "var(--text-muted)", fontWeight: 500 }}>/day</span></div>
                      </div>
                      <button className="primary-btnDE" style={{ padding: "14px 28px", fontSize: 14 }}>Reserve Now</button>
                    </div>
                  </div>
                </div>
                {[
                  { img: "https://pngimg.com/uploads/land_rover/land_rover_PNG77.png", name: "Range Rover Sport", tag: "Executive SUV", tagColor: "#10b981", price: "$95", specs: "395 hp · AWD · Hybrid", glow: "rgba(16,185,129,0.1)" },
                  { img: "https://pngimg.com/uploads/porsche/porsche_PNG102847.png", name: "Porsche 911 Carrera S", tag: "Sport Coupé", tagColor: "#f59e0b", price: "$150", specs: "450 hp · RWD · Petrol", glow: "rgba(245,158,11,0.1)" },
                ].map(card => (
                  <div key={card.name} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 28, padding: 32, position: "relative", overflow: "hidden", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.2,0.8,0.2,1)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = card.tagColor; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--card-border)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    <div style={{ position: "absolute", top: "40%", right: -40, width: 200, height: 200, background: `radial-gradient(circle,${card.glow} 0%,transparent 70%)` }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, position: "relative", zIndex: 1 }}>
                      <span style={{ padding: "5px 12px", background: `${card.tagColor}1A`, border: `1px solid ${card.tagColor}4D`, borderRadius: 16, fontSize: 11, fontWeight: 700, color: card.tagColor }}>{card.tag}</span>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-main)" }}>{card.price}<span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500 }}>/day</span></span>
                    </div>
                    <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                      <img src={card.img} alt={card.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.4))" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "var(--text-main)", marginTop: 16, position: "relative", zIndex: 1 }}>{card.name}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "6px 0 0", position: "relative", zIndex: 1 }}>{card.specs}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ padding: isMobile ? "64px 16px" : "80px 20px", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 400 : 700, height: isMobile ? 400 : 700, borderRadius: "50%", border: "1px solid var(--card-border)", animation: "breathe 6s ease-in-out infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: isMobile ? 260 : 500, height: isMobile ? 260 : 500, borderRadius: "50%", border: "1px solid var(--card-border)", animation: "breathe 6s ease-in-out infinite 1s", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(circle,var(--accent-color) 0%,transparent 70%)", opacity: 0.07, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 30, padding: "6px 16px", marginBottom: isMobile ? 24 : 40 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-color)", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-color)", letterSpacing: "0.15em", textTransform: "uppercase" }}>Start Today</span>
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(40px,5.5vw,90px)", color: "var(--text-main)", letterSpacing: -2, lineHeight: 1.05, marginBottom: isMobile ? 20 : 40 }}>
              <span style={{ whiteSpace: "nowrap", display: "block" }}>The Road is Yours</span>
              <span style={{ background: "var(--accent-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>Reserve Now?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: isMobile ? 15 : 18, lineHeight: 1.7, maxWidth: 520, margin: "0 auto", marginBottom: isMobile ? 32 : 60 }}>
              Join 50,000+ drivers already using UppCar. No deposit. No queues. Just open the app and go.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", padding: isMobile ? "0 8px" : 0 }}>
              <button className="primary-btnDE" style={{ padding: isMobile ? "16px 24px" : "20px 52px", fontSize: 16 }}>
                Reserve Your First Ride
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
              <button className="secondary-btn" style={{ padding: isMobile ? "16px 24px" : "20px 40px", fontSize: 16 }}>
                Explore the App
              </button>
            </div>
            <div style={{ display: "flex", gap: isMobile ? 16 : 40, justifyContent: "center", marginTop: isMobile ? 32 : 56, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", alignItems: "center" }}>
              {["No deposit required", "Free cancellation", "Insured from day one"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: 14, fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer ref={footerRef} style={{
          borderTop: "1px solid var(--card-border)",
          padding: isMobile ? "56px 16px 40px" : "100px 40px 40px",
          background: "var(--bg-color)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", bottom: -60, left: "30%", width: 400, height: 300, borderRadius: "50%", background: isDarkMode ? "rgba(96,165,250,0.04)" : "rgba(16,185,129,0.06)", filter: "blur(60px)", animation: "glowPulse 7s ease-in-out infinite", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: isMobile ? 40 : 80,
              justifyContent: isMobile ? "flex-start" : "space-between",
              marginBottom: isMobile ? 48 : 80,
              animation: "footerFadeUp 0.8s ease both",
              flexDirection: isMobile ? "column" : "row",
            }}>
              {/* Brand */}
              <div style={{ maxWidth: isMobile ? "100%" : 350 }}>
                <AnimatedLogo />
                <p style={{ color: "var(--text-muted)", fontSize: isMobile ? 14 : 16, lineHeight: 1.7, marginTop: 20, marginBottom: isMobile ? 24 : 32 }}>
                  Redefining mobility for the modern era. Fully digital, seamless, and premium car rental experiences across the globe.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  {["X", "IG", "IN"].map(s => (
                    <div key={s} className="f-social"><span>{s}</span></div>
                  ))}
                </div>
              </div>

              {/* Links — 2 columns on mobile */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "auto auto auto",
                gap: isMobile ? 32 : 80,
                width: isMobile ? "100%" : "auto",
              }}>
                {[
                  { title: "Platform", links: ["App Features", "Pricing & Plans", "Global Locations", "Our Fleet"] },
                  { title: "Company", links: ["About Us", "Careers", "Press & Media", "Sustainability"] },
                  { title: "Resources", links: ["Help Center", "Contact Support", "API Documentation", "System Status"] },
                ].map(({ title, links }, ci) => (
                  <div key={title} className="f-col" style={{ animation: `footerFadeUp 0.8s ${0.1 + ci * 0.1}s ease both`, gridColumn: isMobile && ci === 2 ? "1/-1" : "auto" }}>
                    <div className="f-col-title">{title}</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: isMobile ? 12 : 16 }}>
                      {links.map((link, li) => (
                        <li key={link} style={{ animation: `footerFadeUp 0.6s ${0.2 + ci * 0.1 + li * 0.05}s ease both` }}>
                          <a href="/" className="f-link" style={{ fontSize: isMobile ? 14 : 16 }}>{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop: "1px solid var(--card-border)", paddingTop: isMobile ? 24 : 40,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between", alignItems: "center",
              gap: isMobile ? 16 : 20,
              textAlign: isMobile ? "center" : "left",
              animation: "footerFadeUp 0.8s 0.4s ease both",
            }}>
              <div style={{ color: "var(--text-muted)", fontSize: isMobile ? 13 : 15, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "onlineDot 2s ease-in-out infinite" }} />
                &copy; 2026 <span style={{ color: "var(--text-main)", fontWeight: 600, marginLeft: 5 }}>UppCar Technologies Inc.</span> All rights reserved.
              </div>
              <div style={{ display: "flex", gap: isMobile ? 16 : 32, flexWrap: "wrap", justifyContent: "center" }}>
                {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map(l => (
                  <a key={l} href="#" className="f-bottom-link" style={{ fontSize: isMobile ? 13 : 15 }}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile bottom nav */}


      </div>

      {/* Scroll to top */}
      <div style={{
        position: "fixed",
        bottom: isMobile ? 24 : 40,
        right: isMobile ? 16 : 40,
        zIndex: 1000,
        opacity: showScrollButton ? 1 : 0,
        visibility: showScrollButton ? "visible" : "hidden",
        transition: "opacity 0.4s ease,visibility 0.4s ease",
        pointerEvents: showScrollButton ? "auto" : "none",
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          width: isMobile ? 46 : 55, height: isMobile ? 46 : 55,
          borderRadius: "14px",
          background: isDarkMode
            ? "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#0ea5e9 90%)"
            : "linear-gradient(135deg,#059669 0%,#10b981 50%,#34d399 90%)",
          border: "none", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: isDarkMode ? "0 8px 24px rgba(37,99,235,0.4)" : "0 8px 24px rgba(16,185,129,0.4)",
          transition: "transform 0.2s,box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>
    </>
  );
}