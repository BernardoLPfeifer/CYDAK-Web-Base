(() => {
  'use strict';
  const host = document.querySelector('[data-dashboard]');
  if (!host) return;
  const shifts = {
    morning: { hours: ['06h', '07h', '08h', '09h', '10h', '11h'], values: [180, 215, 205, 250, 270, 240], lines: [420, 360, 315, 265], rejected: 34, rework: 68 },
    afternoon: { hours: ['12h', '13h', '14h', '15h', '16h', '17h'], values: [220, 245, 230, 280, 265, 260], lines: [450, 390, 350, 310], rejected: 30, rework: 60 },
    night: { hours: ['18h', '19h', '20h', '21h', '22h', '23h'], values: [190, 200, 225, 210, 240, 215], lines: [380, 330, 300, 270], rejected: 32, rework: 64 }
  };
  const format = new Intl.NumberFormat('pt-BR');
  const percent = value => `${value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
  const sum = values => values.reduce((a, b) => a + b, 0);
  const svg = (label, body) => `<svg viewBox="0 0 640 260" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  function grid(max) {
    return Array.from({ length: 5 }, (_, index) => {
      const y = 210 - index * 45;
      return `<line class="cy-chart__grid" x1="52" y1="${y}" x2="616" y2="${y}"/><text class="cy-chart__text" x="42" y="${y + 4}" text-anchor="end">${max * index / 4}</text>`;
    }).join('');
  }
  function lineChart(data) {
    const points = data.values.map((value, index) => [64 + index * 108, 210 - value / 400 * 180]);
    return svg('Produção por hora e meta de 250 peças por hora. Valores na tabela abaixo.', grid(400) +
      `<line class="cy-chart__target" x1="52" y1="97.5" x2="616" y2="97.5"/>
      <polygon class="cy-chart__area" points="64,210 ${points.map(p => p.join(',')).join(' ')} 604,210"/>
      <polyline class="cy-chart__line" points="${points.map(p => p.join(',')).join(' ')}"/>` +
      points.map(([x, y], index) => `<circle class="cy-chart__point" cx="${x}" cy="${y}" r="5"><title>${data.hours[index]}: ${data.values[index]} peças</title></circle><text class="cy-chart__text" x="${x}" y="${y - 13}" text-anchor="middle">${data.values[index]}</text><text class="cy-chart__text" x="${x}" y="238" text-anchor="middle">${data.hours[index]}</text>`).join(''));
  }
  function barChart(data) {
    return svg('Produção por linha, em peças. Valores na tabela abaixo.', grid(600) + data.lines.map((value, index) => {
      const x = 88 + index * 140;
      const height = value / 600 * 180;
      return `<rect class="cy-chart__bar" x="${x}" y="${210 - height}" width="64" height="${height}" rx="3"><title>Linha ${index + 1}: ${value} peças</title></rect><text class="cy-chart__text" x="${x + 32}" y="${198 - height}" text-anchor="middle">${value}</text><text class="cy-chart__text" x="${x + 32}" y="238" text-anchor="middle">Linha ${index + 1}</text>`;
    }).join(''));
  }
  function pieChart(values) {
    const total = sum(values);
    let angle = -Math.PI / 2;
    const slices = values.map((value, index) => {
      const start = angle;
      angle += value / total * Math.PI * 2;
      return `<path class="cy-chart__slice cy-chart__slice--${index}" d="M 120 120 L ${120 + 100 * Math.cos(start)} ${120 + 100 * Math.sin(start)} A 100 100 0 ${value / total > .5 ? 1 : 0} 1 ${120 + 100 * Math.cos(angle)} ${120 + 100 * Math.sin(angle)} Z"><title>${['Aprovadas', 'Retrabalho', 'Refugadas'][index]}: ${value} (${percent(value / total * 100)})</title></path>`;
    }).join('');
    return `<svg viewBox="0 0 240 240" role="img" aria-label="Distribuição de qualidade. Quantidades e percentuais na legenda." xmlns="http://www.w3.org/2000/svg">${slices}</svg>`;
  }
  function table(headers, rows) {
    return `<table><caption>Dados demonstrativos do turno selecionado</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr><th scope="row">${row[0]}</th>${row.slice(1).map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  }
  function render() {
    const data = shifts[host.querySelector('select').value];
    const total = sum(data.values);
    const approved = total - data.rejected - data.rework;
    const quality = [approved, data.rework, data.rejected];
    host.querySelector('[data-kpi="production"]').textContent = format.format(total);
    host.querySelector('[data-kpi="target"]').textContent = percent(total / 1500 * 100);
    host.querySelector('[data-kpi="quality"]').textContent = percent(approved / total * 100);
    host.querySelector('[data-kpi="rejected"]').textContent = format.format(data.rejected);
    host.querySelector('[data-chart="line"]').innerHTML = lineChart(data);
    host.querySelector('[data-chart="bar"]').innerHTML = barChart(data);
    host.querySelector('[data-chart="pie"]').innerHTML = pieChart(quality);
    host.querySelector('[data-pie-legend]').innerHTML = quality.map((value, index) => `<li><span class="cy-chart__key cy-chart__key--${index}" aria-hidden="true"></span><span>${['Aprovadas', 'Retrabalho', 'Refugadas'][index]}</span><strong>${format.format(value)} <small>(${percent(value / total * 100)})</small></strong></li>`).join('');
    host.querySelector('[data-table="line"]').innerHTML = table(['Hora', 'Produção (peças)', 'Meta (peças)'], data.hours.map((hour, index) => [hour, data.values[index], 250]));
    host.querySelector('[data-table="bar"]').innerHTML = table(['Linha', 'Produção (peças)'], data.lines.map((value, index) => [`Linha ${index + 1}`, value]));
    host.querySelector('[data-dashboard-status]').textContent = `${host.querySelector('select').selectedOptions[0].textContent}: ${format.format(total)} peças produzidas. Gráficos atualizados.`;
  }
  host.querySelector('select').addEventListener('change', render);
  render();
})();
