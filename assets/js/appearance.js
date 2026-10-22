(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'cydak-appearance';
  const palettes = {
    cydak: { name: 'CYDAK', colors: ['#004693', '#003570', '#91c4ff'] },
    indigo: { name: 'Índigo', colors: ['#4338ca', '#312e81', '#a5b4fc'] },
    emerald: { name: 'Esmeralda', colors: ['#047857', '#064e3b', '#6ee7b7'] },
    sky: { name: 'Céu', colors: ['#0369a1', '#0c4a6e', '#7dd3fc'] },
    rose: { name: 'Rosa', colors: ['#be123c', '#881337', '#fda4af'] },
    slate: { name: 'Grafite', colors: ['#334155', '#1e293b', '#cbd5e1'] }
  };
  const styles = {
    standard: { name: 'CYDAK original', description: 'Identidade institucional, azul sólido e títulos marcantes.' },
    tech: { name: 'Tecnológico', description: 'Grade técnica, luz de destaque, painéis e tipografia mono.' },
    minimal: { name: 'Minimalista', description: 'Superfícies limpas, menu neutro e hierarquia discreta.' },
    industrial: { name: 'Industrial', description: 'Linhas fortes, faixas de sinalização e controles robustos.' },
    editorial: { name: 'Editorial', description: 'Títulos serifados, linhas finas e composição elegante.' }
  };
  const logos = {
    'ams-gestao-ativos': { name: 'Rede de ativos', file: 'ams-gestao-ativos.png' },
    'ativos-industriais': { name: 'Ativos industriais', file: 'ativos-industriais.png' },
    'identidade-digital': { name: 'Identidade digital', file: 'identidade-digital.png' },
    'escudo-rota': { name: 'Escudo e rota', file: 'escudo-rota.png' },
    'ciclo-ativos': { name: 'Ciclo de ativos', file: 'ciclo-ativos.png' },
    'rede-organizada': { name: 'Rede organizada', file: 'rede-organizada.png' },
    'bussola-ativos': { name: 'Bússola de ativos', file: 'bussola-ativos.png' },
    'asset-link': { name: 'Asset Link', file: 'asset-link.png' },
    'inventario-inteligente': { name: 'Inventário inteligente', file: 'inventario-inteligente.png' },
    'rfid': { name: 'RFID', file: 'rfid.png' },
    'controle-ativos': { name: 'Controle de ativos', file: 'controle-ativos.png' },
    'gestao-ativos': { name: 'Gestão de ativos', file: 'gestao-ativos.png' },
    'monograma-ams': { name: 'Monograma AMS', file: 'monograma-ams.png' }
  };
  let choice = { palette: 'cydak', style: 'standard', logo: 'ams-gestao-ativos' };
  function read(value) {
    try {
      const parsed = JSON.parse(value);
      const savedStyle = ({ soft: 'editorial', compact: 'minimal' })[parsed?.style] || parsed?.style;
      choice = {
        palette: Object.hasOwn(palettes, parsed?.palette) ? parsed.palette : 'cydak',
        style: Object.hasOwn(styles, savedStyle) ? savedStyle : 'standard',
        logo: Object.hasOwn(logos, parsed?.logo) ? parsed.logo : 'ams-gestao-ativos'
      };
    } catch { choice = { palette: 'cydak', style: 'standard', logo: 'ams-gestao-ativos' }; }
  }
  try { read(localStorage.getItem(key)); } catch {}
  function apply() {
    const [primary, deep, light] = palettes[choice.palette].colors;
    root.style.setProperty('--cy-blue', primary);
    root.style.setProperty('--cy-blue-dark', deep);
    root.style.setProperty('--cy-palette-light', light);
    root.dataset.visualStyle = choice.style;
    root.dataset.palette = choice.palette;
    root.dataset.brandLogo = choice.logo;
    const logo = logos[choice.logo];
    document.querySelectorAll('[data-brand-image]').forEach(image => {
      image.src = `assets/brand/ams/${logo.file}`;
      image.closest('.cy-brand')?.setAttribute('aria-label', `CYDAK AMS — ${logo.name}`);
    });
    document.querySelectorAll('[data-palette]').forEach(button => {
      if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.palette === choice.palette));
    });
    document.querySelectorAll('[data-style-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.styleChoice === choice.style)));
    document.querySelectorAll('[data-logo-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.logoChoice === choice.logo)));
  }
  function save() {
    apply();
    try { localStorage.setItem(key, JSON.stringify(choice)); } catch {}
  }
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    const dialog = document.createElement('dialog');
    dialog.className = 'cy-appearance';
    dialog.id = 'aparencia';
    dialog.setAttribute('aria-labelledby', 'aparencia-titulo');
    dialog.innerHTML = `
      <div class="cy-appearance__heading"><div><span class="cy-eyebrow">Personalize sua experiência</span><h2 id="aparencia-titulo">Aparência</h2></div><button type="button" class="cy-appearance__close" aria-label="Fechar aparência" autofocus>×</button></div>
      <p class="cy-muted">Escolha o logotipo, a linguagem visual e a paleta da interface. As opções ficam salvas neste navegador.</p>
      <fieldset><legend>Logotipo CYDAK AMS</legend><p class="cy-appearance__intro">A versão selecionada se adapta automaticamente ao modo claro ou escuro.</p><div class="cy-appearance__logos">${Object.entries(logos).map(([id, logo]) => `<button type="button" data-logo-choice="${id}" class="cy-logo-choice"><span class="cy-logo-choice__preview"><img src="assets/brand/ams/${logo.file}" alt="" width="380" height="166" loading="lazy"></span><span>${logo.name}</span></button>`).join('')}</div></fieldset>
      <fieldset><legend>Paleta de cores</legend><div class="cy-appearance__palettes">${Object.entries(palettes).map(([id, palette]) => `<button type="button" data-palette="${id}" class="cy-appearance__option"><span class="cy-appearance__swatch" style="--swatch: ${palette.colors[0]}" aria-hidden="true"></span><span>${palette.name}<small>${palette.colors[0].toUpperCase()}</small></span></button>`).join('')}</div></fieldset>
      <fieldset><legend>Linguagem visual</legend><div class="cy-appearance__styles">${Object.entries(styles).map(([id, style]) => `<button type="button" data-style-choice="${id}" class="cy-appearance__option"><span class="cy-style-preview cy-style-preview--${id}" aria-hidden="true"><span class="cy-style-preview__rail"><i></i><i></i><i></i></span><span class="cy-style-preview__page"><span class="cy-style-preview__eyebrow">CYDAK / INTERFACE</span><span class="cy-style-preview__title">Forma &amp; função.</span><span class="cy-style-preview__line"></span><span class="cy-style-preview__cards"><i></i><i></i><i></i></span><span class="cy-style-preview__action"></span></span></span><span class="cy-style-choice__title">${style.name}</span><span class="cy-style-choice__description">${style.description}</span></button>`).join('')}</div></fieldset>
      <p class="cy-appearance__hint">As escolhas são salvas automaticamente. Feche o painel para explorar o resultado; o modo claro/escuro continua independente.</p>
      <div class="cy-appearance__actions"><button type="button" class="cy-button cy-button--outline" data-appearance-reset>Restaurar padrão CYDAK</button><button type="button" class="cy-button" data-appearance-done>Concluir</button></div>`;
    document.body.append(dialog);
    document.querySelectorAll('[data-appearance-open]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => dialog.showModal());
    });
    dialog.querySelector('.cy-appearance__close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-appearance-done]').addEventListener('click', () => dialog.close());
    dialog.querySelectorAll('[data-palette]').forEach(button => button.addEventListener('click', () => {
      choice.palette = button.dataset.palette;
      save();
    }));
    dialog.querySelectorAll('[data-style-choice]').forEach(button => button.addEventListener('click', () => {
      choice.style = button.dataset.styleChoice;
      save();
    }));
    dialog.querySelectorAll('[data-logo-choice]').forEach(button => button.addEventListener('click', () => {
      choice.logo = button.dataset.logoChoice;
      save();
    }));
    dialog.querySelector('[data-appearance-reset]').addEventListener('click', () => {
      choice = { palette: 'cydak', style: 'standard', logo: 'ams-gestao-ativos' };
      save();
    });
    apply();
  });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    read(event.newValue);
    apply();
  });
})();
