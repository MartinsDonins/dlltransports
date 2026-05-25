// === Variant A — Tweaks ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFD200",
  "ink": "#161616",
  "bgTone": "#FFFFFF",
  "headingFont": "Space Grotesk",
  "density": "regular",
  "stripVisible": true
}/*EDITMODE-END*/;

function VariantATweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--yellow', t.accent);
    r.style.setProperty('--ink', t.ink);
    r.style.setProperty('--bg', t.bgTone);
    r.style.setProperty('--font-display', `"${t.headingFont}", system-ui, sans-serif`);
    // density
    const pad = t.density === 'compact' ? '64px' : t.density === 'comfy' ? '128px' : '96px';
    document.querySelectorAll('.section').forEach(s => { s.style.paddingTop = pad; s.style.paddingBottom = pad; });
    // strip
    const strip = document.querySelector('.hero-strip');
    if (strip) strip.style.display = t.stripVisible ? '' : 'none';
  }, [t]);

  return (
    <TweaksPanel title="Variants A · Tweaks">
      <TweakSection label="Krāsas" />
      <TweakColor label="Akcents" value={t.accent}
        options={['#FFD200', '#F5C518', '#FF8A00', '#FFB300']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="Teksta tonis" value={t.ink}
        options={['#161616', '#1E1E1E', '#0E0E0E', '#222222']}
        onChange={(v) => setTweak('ink', v)} />
      <TweakColor label="Fona tonis" value={t.bgTone}
        options={['#FFFFFF', '#FAF8F4', '#F4F2EE', '#F7F7F7']}
        onChange={(v) => setTweak('bgTone', v)} />
      <TweakSection label="Tipogrāfija" />
      <TweakSelect label="Virsraksta fonts" value={t.headingFont}
        options={['Space Grotesk', 'Manrope', 'Plus Jakarta Sans', 'DM Sans']}
        onChange={(v) => setTweak('headingFont', v)} />
      <TweakSection label="Izkārtojums" />
      <TweakRadio label="Sekciju blīvums" value={t.density}
        options={['compact', 'regular', 'comfy']}
        onChange={(v) => setTweak('density', v)} />
      <TweakToggle label="Hero statistikas josla" value={t.stripVisible}
        onChange={(v) => setTweak('stripVisible', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<VariantATweaks />);
