// === Variant D — Tweaks ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFD200",
  "bgTone": "#0A0A0A",
  "displayFont": "Manrope",
  "headingWeight": "800",
  "showHeroStats": true
}/*EDITMODE-END*/;

function VariantDTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--yellow', t.accent);
    r.style.setProperty('--bg', t.bgTone);
    r.style.setProperty('--font-display', `"${t.displayFont}", system-ui, sans-serif`);
    document.querySelectorAll('h1, h2, h3, h4').forEach(h => { h.style.fontWeight = t.headingWeight; });
    const stats = document.querySelector('.hero-stats');
    if (stats) stats.style.display = t.showHeroStats ? '' : 'none';
  }, [t]);

  return (
    <TweaksPanel title="Variants D · Tweaks">
      <TweakSection label="Signāla krāsa" />
      <TweakColor label="Akcents" value={t.accent}
        options={['#FFD200', '#F5C518', '#FF7A00', '#7CFC00', '#FF3366']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="Fona dziļums" value={t.bgTone}
        options={['#0A0A0A', '#000000', '#101418', '#0F0E0C']}
        onChange={(v) => setTweak('bgTone', v)} />
      <TweakSection label="Tipogrāfija" />
      <TweakSelect label="Display fonts" value={t.displayFont}
        options={['Manrope', 'Space Grotesk', 'Plus Jakarta Sans', 'DM Sans']}
        onChange={(v) => setTweak('displayFont', v)} />
      <TweakRadio label="Virsraksta svars" value={t.headingWeight}
        options={['600', '700', '800']}
        onChange={(v) => setTweak('headingWeight', v)} />
      <TweakSection label="Hero" />
      <TweakToggle label="Statistikas kartes" value={t.showHeroStats}
        onChange={(v) => setTweak('showHeroStats', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<VariantDTweaks />);
