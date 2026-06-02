(function () {
  'use strict';

  // === Registro de turnos disponibles ===
  // Para sumar un turno: crear data/turnoN.js exponiendo window.TURNO_N,
  // importarlo en index.html y pushearlo en TURNOS.
  const TURNOS = [window.TURNO_1, window.TURNO_2, window.TURNO_3].filter(Boolean);
  const PLACEHOLDERS = [];

  const ESCALA = [
    { rango: '0% a 39%',   nota: 1,  estado: 'No Aprobado' },
    { rango: '40% a 49%',  nota: 4,  estado: 'Aprobado'    },
    { rango: '50% a 59%',  nota: 5,  estado: 'Aprobado'    },
    { rango: '60% a 69%',  nota: 6,  estado: 'Aprobado'    },
    { rango: '70% a 79%',  nota: 7,  estado: 'Aprobado'    },
    { rango: '80% a 89%',  nota: 8,  estado: 'Aprobado'    },
    { rango: '90% a 100%', nota: 10, estado: 'Aprobado'    },
  ];

  const tabsEl = document.getElementById('tabs');
  const mainEl = document.getElementById('main');
  let activoId = TURNOS.length ? TURNOS[0].id : null;

  // === Render tabs ===
  function renderTabs() {
    tabsEl.innerHTML = '';
    TURNOS.forEach(t => {
      const btn = document.createElement('button');
      btn.className = 'tab' + (t.id === activoId ? ' active' : '');
      btn.innerHTML = `${escapeHtml(t.nombre)} <span class="badge">${t.preguntas.length} preg.</span>`;
      btn.addEventListener('click', () => {
        activoId = t.id;
        renderTabs();
        renderTurno(t);
      });
      tabsEl.appendChild(btn);
    });
    PLACEHOLDERS.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'tab';
      btn.disabled = true;
      btn.innerHTML = `${escapeHtml(p.nombre)} <span class="badge">próx.</span>`;
      tabsEl.appendChild(btn);
    });
  }

  // === Render turno completo ===
  function renderTurno(turno) {
    mainEl.innerHTML = '';

    // Card: tabla de notas
    const escalaCard = document.createElement('section');
    escalaCard.className = 'card';
    escalaCard.innerHTML = `
      <h2><span class="icon">📊</span> Escala de notas (evaluaciones parciales)</h2>
      <table class="scale-table">
        <thead><tr><th>%</th><th>Nota</th><th>Estado</th></tr></thead>
        <tbody>
          ${ESCALA.map(e => `
            <tr>
              <td>${e.rango}</td>
              <td>${e.nota}</td>
              <td class="${e.estado === 'Aprobado' ? 'ok' : 'no'}">${e.estado}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    `;
    mainEl.appendChild(escalaCard);

    // Card: enunciado
    const enunciadoCard = document.createElement('section');
    enunciadoCard.className = 'card enunciado-wrap';
    enunciadoCard.innerHTML = `
      <details open>
        <summary>Enunciado — ${escapeHtml(turno.nombre)}</summary>
        <div class="enunciado-body">${turno.enunciadoHtml}</div>
        <div class="pdf-actions">
          <a class="btn" href="${turno.pdf}" target="_blank" rel="noopener">📄 Abrir PDF original</a>
          <a class="btn secondary" href="${turno.pdf}" download>⬇ Descargar PDF</a>
          ${turno.iteracionesXlsx ? `
            <a class="btn secondary" href="${turno.iteracionesXlsx}" download title="Excel con la cabecera + fragmentos de filas a completar, tal como en el parcial">📊 Descargar Excel de iteraciones</a>
          ` : ''}
        </div>
        ${turno.iteracionesXlsx ? `
          <p class="iter-hint">El Excel de iteraciones contiene una hoja por cada fragmento que pide el parcial (cabecera + filas iniciales para continuar).</p>
        ` : ''}
      </details>
    `;
    mainEl.appendChild(enunciadoCard);

    // Card: cabecera quiz
    const quizHead = document.createElement('section');
    quizHead.className = 'card';
    quizHead.innerHTML = `
      <h2><span class="icon">📝</span> Cuestionario</h2>
      <p>Respondé las preguntas y luego presioná <strong>Corregir</strong> para ver tu puntaje y las respuestas correctas. Las preguntas de subida de archivo del parcial original (8, 10, 12, 14) se omitieron porque no son evaluables de forma automática.</p>
    `;
    mainEl.appendChild(quizHead);

    // Preguntas
    const formEl = document.createElement('form');
    formEl.id = 'quiz';
    formEl.addEventListener('submit', e => e.preventDefault());

    turno.preguntas.forEach(p => formEl.appendChild(renderPregunta(p)));

    // Barra de acciones
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.innerHTML = `
      <button type="button" class="btn" id="btn-corregir">✔ Corregir</button>
      <button type="button" class="btn secondary" id="btn-reset">↺ Reiniciar</button>
      <button type="button" class="btn danger" id="btn-explicaciones">💡 Mostrar explicaciones</button>
      <div class="score" id="score">Sin corregir</div>
    `;
    formEl.appendChild(actions);
    mainEl.appendChild(formEl);

    document.getElementById('btn-corregir').addEventListener('click', () => corregir(turno));
    document.getElementById('btn-reset').addEventListener('click', () => renderTurno(turno));
    document.getElementById('btn-explicaciones').addEventListener('click', toggleExplicaciones);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // === Render de una pregunta ===
  function renderPregunta(p) {
    const wrap = document.createElement('div');
    wrap.className = 'question';
    wrap.dataset.id = p.id;
    wrap.dataset.tipo = p.tipo;

    const tipoLabel =
      p.tipo === 'multi'   ? 'Selección múltiple' :
      p.tipo === 'single'  ? 'Selección única'   :
                             'Respuesta numérica';

    let body = '';
    if (p.tipo === 'single' || p.tipo === 'multi') {
      const inputType = p.tipo === 'single' ? 'radio' : 'checkbox';
      body = `<div class="options">${p.opciones.map(op => `
        <label class="option" data-opid="${op.id}">
          <input type="${inputType}" name="${p.id}" value="${op.id}" />
          <span><strong>${op.id})</strong> ${escapeHtml(op.texto)}</span>
        </label>`).join('')}</div>`;
    } else if (p.tipo === 'numeric') {
      body = `<div class="numeric-fields">${p.campos.map((c, i) => `
        <div class="numeric-row" data-idx="${i}">
          <label>${escapeHtml(c.label)}</label>
          <input type="number" step="any" name="${p.id}_${i}" placeholder="${c.placeholder || ''}" />
          ${c.sufijo ? `<span class="sufijo">${escapeHtml(c.sufijo)}</span>` : ''}
        </div>`).join('')}</div>`;
    }

    wrap.innerHTML = `
      <div class="question-head">
        <span class="num">Pregunta ${p.numero}</span>
        <span class="tipo">${tipoLabel}</span>
        <span class="estado pending" data-role="estado">Sin responder</span>
      </div>
      <div class="question-body">
        <div class="enunciado">${escapeHtml(p.enunciado)}</div>
        ${body}
        ${p.explicacion ? `<div class="explicacion" hidden><strong>Explicación:</strong> ${escapeHtml(p.explicacion)}</div>` : ''}
      </div>
    `;
    return wrap;
  }

  // === Corregir ===
  function corregir(turno) {
    let correctas = 0;
    let total = 0;
    let evaluables = 0;

    turno.preguntas.forEach(p => {
      const qEl = mainEl.querySelector(`.question[data-id="${p.id}"]`);
      const estadoEl = qEl.querySelector('[data-role="estado"]');

      if (p.tipo === 'single' || p.tipo === 'multi') {
        total++; evaluables++;
        const selected = Array.from(qEl.querySelectorAll('input:checked')).map(i => i.value);
        const correctIds = p.opciones.filter(o => o.correcta).map(o => o.id);
        const ok = arrEq(selected.sort(), correctIds.sort());

        p.opciones.forEach(op => {
          const optEl = qEl.querySelector(`.option[data-opid="${op.id}"]`);
          optEl.classList.remove('correct', 'wrong', 'missed');
          const wasChecked = selected.includes(op.id);
          // limpiar tags previas
          const oldTag = optEl.querySelector('.feedback-tag');
          if (oldTag) oldTag.remove();

          if (op.correcta && wasChecked) {
            optEl.classList.add('correct');
            addTag(optEl, '✓ Correcta');
          } else if (op.correcta && !wasChecked) {
            optEl.classList.add('missed');
            addTag(optEl, 'Faltó marcar');
          } else if (!op.correcta && wasChecked) {
            optEl.classList.add('wrong');
            addTag(optEl, '✗ Incorrecta');
          }
        });

        if (ok) { correctas++; setEstado(estadoEl, 'ok', '✓ Correcta'); }
        else    { setEstado(estadoEl, 'fail', '✗ Incorrecta'); }

      } else if (p.tipo === 'numeric') {
        let allOk = true;
        let hasEvaluables = false;
        p.campos.forEach((c, i) => {
          const row = qEl.querySelector(`.numeric-row[data-idx="${i}"]`);
          const input = row.querySelector('input');
          input.classList.remove('correct', 'wrong', 'missed');
          const old = row.querySelector('.esperado');
          if (old) old.remove();

          if (c.correcto === null || c.correcto === undefined) {
            // Sin respuesta conocida — no se evalúa
            input.classList.add('missed');
            const span = document.createElement('span');
            span.className = 'esperado';
            span.innerHTML = `<em>(sin respuesta de referencia)</em>`;
            row.appendChild(span);
            return;
          }
          hasEvaluables = true;
          const val = parseFloat(input.value);
          if (isNaN(val)) {
            input.classList.add('wrong');
            allOk = false;
          } else if (Math.abs(val - c.correcto) <= (c.tol || 0.01)) {
            input.classList.add('correct');
          } else {
            input.classList.add('wrong');
            allOk = false;
          }
          const span = document.createElement('span');
          span.className = 'esperado';
          span.innerHTML = `esperado: <strong>${c.correcto}</strong>${c.sufijo ? ' ' + escapeHtml(c.sufijo) : ''}`;
          row.appendChild(span);
        });
        if (hasEvaluables) {
          total++; evaluables++;
          if (allOk) { correctas++; setEstado(estadoEl, 'ok', '✓ Correcta'); }
          else       { setEstado(estadoEl, 'fail', '✗ Incorrecta'); }
        } else {
          setEstado(estadoEl, 'pending', 'Sin referencia');
        }
      }

      // Mostrar explicación
      const expl = qEl.querySelector('.explicacion');
      if (expl) expl.hidden = false;
    });

    const pct = total > 0 ? Math.round((correctas / total) * 100) : 0;
    const escala = ESCALA.find(e => pctInRango(pct, e.rango)) || ESCALA[0];
    const scoreEl = document.getElementById('score');
    const notaClass = escala.estado === 'Aprobado' ? 'nota' : 'nota bajo';
    scoreEl.innerHTML = `
      ${correctas}/${total} correctas (${pct}%)
      &nbsp;·&nbsp;
      Nota estimada: <span class="${notaClass}">${escala.nota}</span> (${escala.estado})
    `;

    // Scroll a la primera pregunta incorrecta o al score
    const firstWrong = mainEl.querySelector('.question .estado.fail');
    if (firstWrong) {
      firstWrong.closest('.question').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      scoreEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function toggleExplicaciones() {
    const expls = mainEl.querySelectorAll('.explicacion');
    const anyHidden = Array.from(expls).some(e => e.hidden);
    expls.forEach(e => e.hidden = !anyHidden);
  }

  // === Helpers ===
  function setEstado(el, cls, text) {
    el.classList.remove('pending', 'ok', 'fail');
    el.classList.add(cls);
    el.textContent = text;
  }
  function addTag(optEl, text) {
    const span = document.createElement('span');
    span.className = 'feedback-tag';
    span.textContent = text;
    optEl.appendChild(span);
  }
  function arrEq(a, b) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }
  function pctInRango(pct, rango) {
    // "0% a 39%" → [0, 39]
    const m = rango.match(/(\d+)%\s*a\s*(\d+)%/);
    if (!m) return false;
    const lo = +m[1], hi = +m[2];
    return pct >= lo && pct <= hi;
  }
  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  // === Boot ===
  if (!TURNOS.length) {
    mainEl.innerHTML = '<section class="card"><p>No hay turnos cargados todavía.</p></section>';
  } else {
    renderTabs();
    renderTurno(TURNOS[0]);
  }
})();
