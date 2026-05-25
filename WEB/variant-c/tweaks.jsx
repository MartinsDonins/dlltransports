// === Variant C — Tweaks ===
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FFD200",
  "bgTone": "#F1EFE7",
  "gridVisible": true,
  "displayFont": "Space Grotesk",
  "monoFont": "JetBrains Mono"
}/*EDITMODE-END*/;

function VariantCTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--yellow', t.accent);
    r.style.setProperty('--bg', t.bgTone);
    r.style.setProperty('--font-display', `"${t.displayFont}", system-ui, sans-serif`);
    r.style.setProperty('--font-mono', `"${t.monoFont}", ui-monospace, monospace`);
    document.body.style.backgroundImage = t.gridVisible
      ? 'linear-gradient(var(--line-2) 1px,transparent 1px),linear-gradient(90deg,var(--line-2) 1px,transparent 1px)'
      : 'none';
  }, [t]);

  return (
    <TweaksPanel title="Variants C · Tweaks">
      <TweakSection label="Signāla krāsa" />
      <TweakColor label="Akcents" value={t.accent}
        options={['#FFD200', '#F5C518', '#FF7A00', '#7CFC00']}
        onChange={(v) => setTweak('accent', v)} />
      <TweakColor label="Fons" value={t.bgTone}
        options={['#F1EFE7', '#E8E5DA', '#EFEDE3', '#FAF8F0']}
        onChange={(v) => setTweak('bgTone', v)} />
      <TweakSection label="Tipogrāfija" />
      <TweakSelect label="Display fonts" value={t.displayFont}
        options={['Space Grotesk', 'Manrope', 'DM Sans']}
        onChange={(v) => setTweak('displayFont', v)} />
      <TweakSelect label="Mono fonts" value={t.monoFont}
        options={['JetBrains Mono', 'IBM Plex Mono', 'Space Mono']}
        onChange={(v) => setTweak('monoFont', v)} />
      <TweakSection label="Atmosfēra" />
      <TweakToggle label="Grida līnijas fonā" value={t.gridVisible}
        onChange={(v) => setTweak('gridVisible', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<VariantCTweaks />);
