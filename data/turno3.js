window.TURNO_3 = {
  id: 'turno-3',
  nombre: 'Turno 3 — Camiones',
  pdf: 'assets/Tema-3-Enunciado.pdf',
  iteracionesXlsx: 'assets/Tema-3-Iteraciones.xlsx',
  enunciadoHtml: `
    <h3>Tema 3:</h3>
    <p>En una estación de servicio para camiones, los conductores pueden detenerse para realizar una
    carga de combustible o una revisión técnica básica. La estación cuenta con dos mecánicos, ambos con
    la misma capacidad operativa.</p>

    <p>Los camiones que sólo requieren carga de combustible llegan al sistema según una distribución
    exponencial negativa, con un tiempo entre llegadas de 5 minutos. Los camiones que requieren
    revisión técnica también llegan de manera exponencial negativa, a razón de 4 camiones por hora.</p>

    <p>El tiempo de atención, para ambas tareas, sigue una distribución normal con media de 11 minutos
    y desviación estándar de 3 minutos. Generar los valores usando el método Box-Müller, aplicando
    primero la fórmula que incluye el coseno.</p>

    <p>Los camiones son atendidos por orden de llegada, sin distinción por tipo de tarea.</p>
    <ul>
      <li>Si hay un mecánico libre, se le asigna el siguiente camión de la cola.</li>
      <li>Si ambos mecánicos están libres:
        <ul>
          <li>Para un camión que requiere carga de combustible, lo atiende Mecánico 1.</li>
          <li>Para un camión que requiere revisión técnica, ambos mecánicos colaboran y el tiempo de
          atención se reduce a la mitad.</li>
        </ul>
      </li>
    </ul>

    <p>Si un camión está siendo atendido en una revisión técnica por un solo mecánico, y el otro
    mecánico finaliza una tarea y no hay camiones en espera, el segundo mecánico se une para ayudar,
    reduciendo el tiempo restante de atención a la mitad.</p>

    <p>Esta ayuda <strong>no se interrumpe</strong> por la llegada de nuevos camiones, pero
    <strong>sí se interrumpe si llega una llamada por radio</strong>. Si es interrumpida, debe ajustarse
    el tiempo remanente correctamente.</p>

    <p>Cada 70 minutos (distribución exponencial negativa), se recibe una llamada desde un camión
    varado, solicitando asistencia por radio.</p>
    <ul>
      <li>Si algún mecánico está libre, atiende la llamada.</li>
      <li>Si ambos están libres, atiende Mecánico 1.</li>
      <li>Si un mecánico está ayudando al otro, interrumpe la ayuda para atender la llamada.</li>
      <li>Si ambos están ocupados con tareas propias, la llamada se pierde.</li>
    </ul>

    <p><strong>Tras finalizar la llamada:</strong></p>
    <ul>
      <li>Si el mecánico estaba ayudando, retoma la ayuda sólo si:
        <ul>
          <li>La tarea aún no terminó.</li>
          <li>El otro mecánico sigue atendiendo una revisión.</li>
          <li>Y no hay camiones en espera.</li>
        </ul>
      </li>
      <li>Si hay camiones esperando, se asigna a uno de ellos.</li>
      <li>Si llega una nueva llamada mientras otra está en curso, esta se descarta y se pierde.</li>
    </ul>

    <p>El tiempo de cada llamada se determina resolviendo la siguiente ecuación diferencial:</p>

    <p style="text-align:center; font-size: 1.1em;">
      <strong>dL/dt = (L − 10) · (1 − L/120)</strong>
    </p>

    <ul>
      <li>Resolverla mediante el <strong>método de Runge-Kutta de 4º orden</strong>. Usar un
      <strong>h=0,1</strong> (una unidad de integración equivale a 1 minuto). Condición inicial:
      <strong>L(t=0)=12</strong>. Debe averiguar el momento en que <strong>L&gt;100</strong>. Realice
      los cálculos truncando en 6 decimales.</li>
      <li>Todas las llamadas duran el mismo tiempo.</li>
      <li>Usar al menos 6 decimales en los cálculos intermedios.</li>
    </ul>

    <p><strong>Se solicita calcular:</strong></p>
    <ol>
      <li>El tiempo medio de permanencia en la cola de los camiones que fueron atendidos
      (indistintamente del tipo de servicio).</li>
      <li>El tiempo medio de permanencia en el sistema completo (desde la llegada hasta el fin de la
      atención), sólo para camiones que fueron efectivamente atendidos.</li>
    </ol>

    <p class="nota"><strong>Para los valores del vector de estado que involucren números decimales,
    truncar a dos decimales (no redondear).</strong></p>
  `,
  preguntas: [
    {
      id: 't3_p1', numero: 1, tipo: 'multi',
      enunciado: '¿Qué consecuencias puede tener un servidor con baja ocupación?',
      opciones: [
        { id: 'a', texto: 'Alta tasa de rechazo.', correcta: false },
        { id: 'b', texto: 'Congestión del sistema.', correcta: false },
        { id: 'c', texto: 'Costos innecesarios por inactividad.', correcta: true },
        { id: 'd', texto: 'Reducción del tiempo promedio en sistema.', correcta: true },
        { id: 'e', texto: 'Incremento del tiempo ocioso.', correcta: true },
      ],
      explicacion: 'Un servidor con baja ocupación pasa mucho tiempo libre (tiempo ocioso ↑), implica costos fijos sin generar throughput (costos por inactividad) y al haber capacidad sobrante los clientes esperan poco o nada en cola, lo que reduce el tiempo promedio en sistema. No genera rechazos ni congestión.'
    },
    {
      id: 't3_p2', numero: 2, tipo: 'multi',
      enunciado: '¿Cuáles colas son NECESARIAS?',
      opciones: [
        { id: 'a', texto: 'Cola carga combustible.', correcta: false },
        { id: 'b', texto: 'Ninguna cola de las anteriores.', correcta: false },
        { id: 'c', texto: 'Cola revisión técnica.', correcta: false },
        { id: 'd', texto: 'Cola de camiones.', correcta: true },
        { id: 'e', texto: 'Cola de llamadas.', correcta: false },
      ],
      explicacion: 'Los camiones se atienden por orden de llegada sin distinguir tipo de servicio, así que basta una única cola compartida. Las llamadas por radio no hacen cola: si ambos mecánicos están ocupados, la llamada se pierde.'
    },
    {
      id: 't3_p3', numero: 3, tipo: 'multi',
      enunciado: '¿Cuáles de estos Eventos NECESITA definir para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera en cola Mecánico 1.', correcta: false },
        { id: 'b', texto: 'Comienzo de interrupción por llamada telefónica.', correcta: false },
        { id: 'c', texto: 'Ninguno de los propuestos.', correcta: false },
        { id: 'd', texto: 'Fin de espera en cola Mecánico 2.', correcta: false },
        { id: 'e', texto: 'Fin ayuda radio.', correcta: true },
        { id: 'f', texto: 'Fin cambio de actividad Mecánico 1.', correcta: false },
      ],
      explicacion: 'Los camiones no abandonan la cola por tiempo (la ec. diferencial sólo da la duración fija de las llamadas), por eso no hay eventos "fin de espera". La interrupción por llamada y el cambio de actividad no son eventos en sí — son consecuencias instantáneas de "llegada_llamada_radio". El único evento extra que sí hace falta es el Fin Ayuda Radio, que libera al mecánico para retomar su tarea o tomar otro camión.'
    },
    {
      id: 't3_p4', numero: 4, tipo: 'multi',
      enunciado: '¿Qué Objetos identifica?',
      opciones: [
        { id: 'a', texto: 'Camión.', correcta: true },
        { id: 'b', texto: 'Teléfono.', correcta: false },
        { id: 'c', texto: 'Puesto de carga de combustible.', correcta: false },
        { id: 'd', texto: 'Camión revisión técnica.', correcta: false },
        { id: 'e', texto: 'Camión carga combustible.', correcta: false },
        { id: 'f', texto: 'Mecánico N (con N = 1, 2).', correcta: true },
      ],
      explicacion: 'Los dos objetos del modelo son el Camión (entidad que circula por el sistema, sin distinción de tipo) y el Mecánico, que es una entidad indexada (N = 1, 2). Camión por tipo y Puesto no son objetos separados, son atributos o roles dentro de los objetos ya identificados.'
    },
    {
      id: 't3_p5', numero: 5, tipo: 'multi',
      enunciado: '¿Qué columnas NECESITA para resolver las estadísticas solicitadas por el problema?',
      opciones: [
        { id: 'a', texto: 'Acumulador de tiempo de espera de los camiones.', correcta: true },
        { id: 'b', texto: 'Acumulador de tiempo de permanencia en el sistema de los camiones que requieren revisión técnica.', correcta: false },
        { id: 'c', texto: 'Contador de camiones que son atendidos inmediatamente.', correcta: false },
        { id: 'd', texto: 'Contador de camiones atención finalizada.', correcta: true },
        { id: 'e', texto: 'Contador de camiones que esperan en cola.', correcta: false },
        { id: 'f', texto: 'Acumulador de tiempo de permanencia en el sistema de los camiones.', correcta: true },
        { id: 'g', texto: 'Ninguna de las anteriores.', correcta: false },
        { id: 'h', texto: 'Acumulador de tiempo de permanencia en el sistema de los camiones que cargan combustible.', correcta: false },
      ],
      explicacion: 'Para el tiempo medio en cola: AC tiempo de espera ÷ (camiones que efectivamente entraron a atención, igual a Cont. atención finalizada). Para el tiempo medio en sistema: AC tiempo de permanencia ÷ Cont. atención finalizada. No se discrimina por tipo de servicio (carga / revisión), así que no se necesitan acumuladores separados.'
    },
    {
      id: 't3_p6', numero: 6, tipo: 'single',
      enunciado: '¿Cuáles de estos Eventos NECESITA definir para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera en cola Mecánico 2.', correcta: false },
        { id: 'b', texto: 'Fin de espera en cola Mecánico 1.', correcta: false },
        { id: 'c', texto: 'Fin de espera en cola 2.', correcta: false },
        { id: 'd', texto: 'Fin de espera en cola.', correcta: false },
        { id: 'e', texto: 'Ninguno de los propuestos.', correcta: true },
      ],
      explicacion: 'No hay abandonos por tiempo en este sistema, así que ningún evento "fin de espera" es necesario, ya sea por mecánico, por cola numerada o por cola única.'
    },
    {
      id: 't3_p7', numero: 7, tipo: 'numeric',
      enunciado: 'Integre numéricamente la ecuación diferencial y, en base a eso, complete los siguientes resultados. Responda con 4 (CUATRO) decimales, usando el punto del teclado numérico:',
      campos: [
        { label: 'Para t = 1,6: L =', correcto: 18.1739, tol: 0.0005 },
        { label: 'Para t = 5,1: K4 =', correcto: 21.7504, tol: 0.0005 },
        { label: '¿Para qué valor de t la función L(t) supera 100? t =', correcto: 6.0000, tol: 0.0005, sufijo: 'min' },
      ],
      explicacion: 'Aplicando Runge-Kutta 4º orden con h=0,1 y L(t=0)=12 sobre dL/dt = (L−10)·(1 − L/120). El valor de t para el cual L supera 100 fija la duración de todas las llamadas por radio del sistema.'
    },
    {
      id: 't3_p9', numero: 9, tipo: 'numeric',
      enunciado: 'Descargar el encabezado del vector estado con el Evento Cero (estado inicial). Simular los primeros 3 eventos y completar. Responda con 2 decimales (excepto las colas), usando el punto:',
      campos: [
        { label: 'En evento 2, Próxima llegada Revisión =', correcto: 7.40, tol: 0.01 },
        { label: 'Fin Atención Mecánico 2 =', correcto: 13.26, tol: 0.01 },
        { label: 'En evento 3, Fin Atención Mecánico 2 =', correcto: null, tol: 0.01, placeholder: '?' },
        { label: 'AC Tiempos de permanencia =', correcto: 4.56, tol: 0.01 },
      ],
      explicacion: 'El AC de tiempo de permanencia es asíncrono: se acumula sólo cuando un cliente sale del sistema. El AC de tiempo de espera también es asíncrono: se acumula cuando un camión completa su tiempo de espera (entra a atención).'
    },
    {
      id: 't3_p11', numero: 11, tipo: 'numeric',
      enunciado: 'Descargar el vector estado con el 4° evento. Simular los siguientes 3 eventos y completar. Responda con 2 decimales (excepto las colas):',
      campos: [
        { label: 'En evento 5, Fin Atención Mecánico 1 =', correcto: 17.55, tol: 0.01 },
        { label: 'En evento 6, Cola de Camiones =', correcto: null, tol: 0.01, placeholder: '?' },
        { label: 'En evento 7, AC Tiempos de espera =', correcto: null, tol: 0.01, placeholder: '?' },
        { label: 'Cont. Cam. atención finalizada =', correcto: null, tol: 0.01, placeholder: '?' },
      ],
      explicacion: 'Recordá: AC tiempo de espera se actualiza en el momento en que un camión inicia la atención (no antes); el contador de camiones con atención finalizada se incrementa en cada evento "fin_atencion".'
    },
    {
      id: 't3_p13', numero: 13, tipo: 'numeric',
      enunciado: 'Descargar el vector estado con el 15° evento. Simular los siguientes 4 eventos y completar. Responda con 2 decimales (excepto las colas):',
      campos: [
        { label: 'En evento 16, Fin atención Mecánico 1 =', correcto: null, tol: 0.01, placeholder: '?' },
        { label: 'En evento 18, Próxima llegada Revisión =', correcto: 48.53, tol: 0.01 },
        { label: 'Cola de camiones =', correcto: 2, tol: 0.01 },
        { label: 'En evento 19, Fin atención Mecánico 2 =', correcto: null, tol: 0.01, placeholder: '?' },
        { label: 'AC Tiempos de espera =', correcto: 23.94, tol: 0.01 },
      ],
      explicacion: 'Atención con la regla de colaboración: si un mecánico termina y el otro está en una revisión sin nadie esperando, ayuda y reduce el tiempo restante a la mitad. La llegada de una nueva llamada por radio interrumpe esa ayuda.'
    },
    {
      id: 't3_p15', numero: 15, tipo: 'numeric',
      enunciado: 'De acuerdo a la simulación realizada, responda las preguntas del enunciado. Responda con 2 decimales:',
      campos: [
        { label: 'Tiempo medio de permanencia en cola de cada camión con acceso a Mecánico =', correcto: 2.99, tol: 0.01, sufijo: 'min' },
        { label: 'Tiempo medio de permanencia en el sistema de cada camión con atención finalizada =', correcto: 11.61, tol: 0.01, sufijo: 'min' },
      ],
      explicacion: 'Tiempo medio en cola = AC Tiempos de espera ÷ Cant. Camiones con acceso a mecánico. Tiempo medio en sistema = AC Tiempos de permanencia ÷ Cant. Camiones con atención finalizada.'
    },
  ]
};
