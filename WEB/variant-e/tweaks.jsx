// === Variant E — Tweaks ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFD200",
  "lightBg": "#F8F6F1",
  "darkBg": "#0E0E0E",
  "displayFont": "Plus Jakarta Sans",
  "splitRatio": "50"
}/*EDITMODE-END*/;

function VariantETweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--yellow', t.accent);
    r.style.setProperty('--bg', t.lightBg);
    r.style.setProperty('--bg-dark', t.darkBg);
    r.style.setProperty('--font-display', `"${t.displayFont}", "DM Sans", system-ui, sans-serif`);
    document.querySelectorAll('.hero-split, .two-track, .dual-cta, .contact-split').forEach(el => {
      if (t.splitRatio === '50') el.style.gridTemplateColumns = '1fr 1fr';
      else if (t.splitRatio === '60-40') el.style.gridTemplateColumns = '1.5fr 1fr';
      else if (t.splitRatio === '40-60') el.style.gridTemplateColumns = '1fr 1.5fr';
    });
  }, [t]);

  return (
    <TweaksPanel title="Variants E · Tweaks">
      <TweakSection label="Krāsas" />
      <TweakColor label="Akcents" value={t.accent}
        options={['#FFD200', '#F5C518', '#FF8A00', '#1F8A5B']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="B2B (gaišā) fons" value={t.lightBg}
        options={['#F8F6F1', '#FFFFFF', '#F4F2EE', '#FAF8F4']}
        onChange={(v) => setTweak('lightBg', v)} />
      <TweakColor label="B2C (tumšā) fons" value={t.darkBg}
        options={['#0E0E0E', '#161616', '#1A1A24', '#0F1A2E']}
        onChange={(v) => setTweak('darkBg', v)} />
      <TweakSection label="Tipogrāfija" />
      <TweakSelect label="Display fonts" value={t.displayFont}
        options={['Plus Jakarta Sans', 'DM Sans', 'Manrope', 'Space Grotesk']}
        onChange={(v) => setTweak('displayFont', v)} />
      <TweakSection label="Splita proporcijas" />
      <TweakRadio label="B2B / B2C dalījums" value={t.splitRatio}
        options={['60-40', '50', '40-60']}
        onChange={(v) => setTweak('splitRatio', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<VariantETweaks />);
