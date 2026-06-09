window.TURNO_1 = {
  id: 'turno-1',
  nombre: 'Turno 1 — Médicos',
  pdf: 'assets/Tema-1-Enunciado.pdf',
  iteracionesXlsx: 'assets/Tema-1-Iteraciones.xlsx',
  enunciadoHtml: `
    <h3>Tema 1 A:</h3>
    <p>En una guardia médica se atienden pacientes de consultas generales que pueden ser atendidos por
    cualquiera de los dos médicos disponibles. Estos pacientes llegan según una distribución exponencial
    con un <mark>tiempo entre llegadas de 4 minutos</mark>. A veces se atienden consultas especializadas
    que sólo pueden ser atendidas por el <mark>Médico 1</mark>, ya que el Médico 2 no está habilitado para
    casos especializados. Estos pacientes se acercan a la guardia según una distribución exponencial a
    razón de <mark>6 pacientes por hora</mark>.</p>

    <p>Ambos <mark>médicos trabajan de forma independiente y con la misma capacidad</mark>. La guardia
    tiene <mark>dos consultorios</mark>. Cada atención lleva un tiempo uniforme entre <mark>6 y 10
    minutos</mark> (sin importar si es un caso especializado o no). Los pacientes se asignan al médico
    libre según orden de llegada y compatibilidad (<mark>siempre que haya pacientes de especialidad
    esperando</mark>, el médico 1 les dará prioridad por sobre los generales cuando haya terminado con
    su consulta actual). Si ambos están libres, lo atiende Médico 1.</p>

    <p>Ningún paciente de <mark>consulta general está dispuesto a esperar más de una cantidad t de
    minutos</mark> especificada por una ecuación diferencial, llegado el caso se retira sin ser atendido.
    Y si un paciente al llegar ve que hay otras <mark>tres personas antes</mark> que él,
    <mark>entonces se retira</mark> (independientemente de si las tres personas que ya esperaban eran
    para casos especializados o no).</p>

    <p>Hubo un accidente en un lugar remoto e inaccesible donde sólo hay paramédicos, por eso <mark>cada
    90 minutos (distribución exponencial negativa)</mark> se recibe una llamada telefónica solicitando
    el consejo de un médico, en ese caso uno de los de la guardia <mark>atiende y demora 5 minutos</mark>
    en dar la ayuda telefónica. En primer lugar, va el Médico 1 si está libre o atiende una consulta
    general, pero <mark>si está atendiendo una consulta especializada</mark> va el Medico 2,
    <mark>esté libre o no</mark>. Después de terminada la llamada retoma la atención que haya estado
    realizando en el estado en que la haya dejado. Si llegase una nueva llamada mientras algún médico
    estuviese atendiendo una llamada en curso, esta nueva llamada se descarta (la línea da
    "ocupado").</p>

    <p>La ecuación diferencial que determina el <mark>tiempo de espera</mark> de los pacientes de
    <mark>consulta general</mark> es la siguiente:
    <strong>dE/dt = 0,1·E² + 0,14·E + 0,1</strong>.
    Utilizando un <strong>h=0,1</strong> se debe <mark>averiguar el momento en que E supera el valor
    70</mark>. Una unidad de integración equivale a 1 minuto. Condición inicial: <strong>E(t=0) = 0</strong>.
    Se asume que todos los pacientes esperan como máximo una igual cantidad de tiempo. Método
    Runge-Kutta 4º orden, utilizar 6 decimales al menos.</p>

    <p><strong>Se necesita saber:</strong></p>
    <ol type="a">
      <li>Cantidad de pacientes que abandonan la guardia.</li>
      <li>Porcentaje de ocupación de cada médico (solo incluye tiempo atendiendo <mark>pacientes de la
      guardia</mark>).</li>
      <li>Tiempo medio de permanencia en cola de cada paciente (sin incluir a los pacientes que
      abandonaron la espera).</li>
    </ol>

    <p class="nota"><strong>Para todo valor en vector de estado que tenga decimales, se deberá truncar
    a dos decimales.</strong></p>
  `,
  preguntas: [
    {
      id: 'p1', numero: 1, tipo: 'multi',
      enunciado: 'Un sistema con servidores en paralelo se caracteriza por:',
      opciones: [
        { id: 'a', texto: 'No permitir simulación computacional.', correcta: false },
        { id: 'b', texto: 'Mayor probabilidad de espera.', correcta: false },
        { id: 'c', texto: 'Usar múltiples colas por servidor.', correcta: false },
        { id: 'd', texto: 'Ser más eficiente en promedio que uno en serie.', correcta: true },
        { id: 'e', texto: 'Distribuir las llegadas entre múltiples servidores.', correcta: true },
      ],
      explicacion: 'Servidores en paralelo dividen la carga: cada llegada va al servidor libre, reduciendo el tiempo medio de espera respecto a una configuración en serie.'
    },
    {
      id: 'p2', numero: 2, tipo: 'multi',
      enunciado: 'Eventos (e) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera en cola consulta especializada (abandono de cola).', correcta: false },
        { id: 'b', texto: 'Fin de espera en cola consulta general (abandono de cola).', correcta: true },
        { id: 'c', texto: 'Ninguno de los propuestos.', correcta: false },
        { id: 'd', texto: 'Fin de espera en cola consulta general B (abandono de cola).', correcta: false },
        { id: 'e', texto: 'Fin de espera en cola consulta especializada A (abandono de cola).', correcta: false },
        { id: 'f', texto: 'Fin Ayuda telefónica.', correcta: true },
      ],
      explicacion: 'Solo los pacientes de consulta general abandonan por tiempo (ecuación diferencial), por eso únicamente esa cola tiene evento de fin de espera. La ayuda telefónica también es evento NECESARIO porque libera al médico que la estaba atendiendo.'
    },
    {
      id: 'p3', numero: 3, tipo: 'multi',
      enunciado: '¿Cuáles Colas son NECESARIAS?',
      opciones: [
        { id: 'a', texto: 'Cola de pacientes atención general 1.', correcta: false },
        { id: 'b', texto: 'Cola de pacientes atención general.', correcta: true },
        { id: 'c', texto: 'Cola de llamadas.', correcta: false },
        { id: 'd', texto: 'Cola de Médico 1.', correcta: false },
        { id: 'e', texto: 'Cola de pacientes atención especializada.', correcta: true },
        { id: 'f', texto: 'Cola de Médico 2.', correcta: false },
      ],
      explicacion: 'Como los médicos trabajan en paralelo y no son colas dedicadas por servidor, hay una cola de generales y una de especializadas. Las llamadas no hacen cola (si está ocupada se descartan).'
    },
    {
      id: 'p4', numero: 4, tipo: 'multi',
      enunciado: '¿Cuáles de estas columnas son NECESARIAS para resolver la simulación?',
      opciones: [
        { id: 'a', texto: 'Contador de pacientes que abandonan la cola de consulta general.', correcta: true },
        { id: 'b', texto: 'Contador de pacientes con atención finalizada.', correcta: false },
        { id: 'c', texto: 'Contador de pacientes.', correcta: true },
        { id: 'd', texto: 'Contador de pacientes que son atendidos inmediatamente.', correcta: false },
        { id: 'e', texto: 'Contador de pacientes con atención finalizada por el Médico 1.', correcta: false },
        { id: 'f', texto: 'Contador de pacientes que abandonan la cola de atención especializada.', correcta: false },
        { id: 'g', texto: 'Contador de pacientes con atención finalizada por el Médico 2.', correcta: false },
      ],
      explicacion: 'La consigna pide cantidad de pacientes que abandonan (general) y porcentaje de ocupación de cada médico. El total de pacientes atendidos finalizados por cada médico se obtiene del % de ocupación, no requiere contador propio.'
    },
    {
      id: 'p5', numero: 5, tipo: 'single',
      enunciado: 'Eventos (d) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera Cola 1.', correcta: false },
        { id: 'b', texto: 'Fin de espera Médico 2.', correcta: false },
        { id: 'c', texto: 'Fin de espera Médico 1.', correcta: false },
        { id: 'd', texto: 'Fin de espera Cola 2.', correcta: false },
        { id: 'e', texto: 'Ninguno de los propuestos.', correcta: true },
      ],
      explicacion: 'No hay "fin de espera" asociado a un médico ni a colas numeradas por médico: la cola que abandona es única (consulta general) y ya está cubierta en otra pregunta.'
    },
    {
      id: 'p6', numero: 6, tipo: 'multi',
      enunciado: 'Eventos (b) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de Atención consulta general.', correcta: false },
        { id: 'b', texto: 'Fin de Atención consulta especializada.', correcta: false },
        { id: 'c', texto: 'Fin de Atención 1.', correcta: false },
        { id: 'd', texto: 'Fin de Atención Médico 2.', correcta: true },
        { id: 'e', texto: 'Fin de Atención Médico 1.', correcta: true },
        { id: 'f', texto: 'Ninguno de los propuestos.', correcta: false },
      ],
      explicacion: 'El evento de fin de atención debe ir por médico (no por tipo de consulta), porque cada médico tiene su propio tiempo de atención y se necesita saber cuándo se libera cada uno.'
    },
    {
      id: 'p7', numero: 7, tipo: 'numeric',
      enunciado: 'Integre numéricamente (ecuación diferencial) y en base a eso complete los siguientes resultados:',
      campos: [
        { label: 'Para t = 4,5: f =', correcto: 0.9316, tol: 0.001 },
        { label: 'y X1 =', correcto: 0.2461, tol: 0.001 },
        { label: '¿Para qué valor de t la función f(t) supera Pt = 1? t =', correcto: 5, tol: 0.5, sufijo: 'min' },
      ],
      explicacion: 'Aplicando Runge-Kutta 4º orden con h=0,1 y E(t=0)=0 sobre dE/dt = 0,1·E² + 0,14·E + 0,1.'
    },
    {
      id: 'p9', numero: 9, tipo: 'numeric',
      enunciado: 'Vector estado con el Evento 0 (estado inicial). Simule los primeros 3 eventos y luego pase a la siguiente pregunta. Responda con 2 decimales:',
      campos: [
        { label: 'En evento 3. Fin Atención 1 =', correcto: 11.62, tol: 0.01 },
        { label: 'Fin Atención 2 =', correcto: 14.61, tol: 0.01 },
        { label: 'En evento 5. Próxima llegada General =', correcto: 11.27, tol: 0.01 },
        { label: 'Próxima llegada Especial =', correcto: 14.00, tol: 0.01 },
      ],
      explicacion: 'Los tiempos de atención son uniformes [6, 10] min; las llegadas son exponenciales (4 min generales, 10 min especiales).'
    },
    {
      id: 'p11', numero: 11, tipo: 'numeric',
      enunciado: 'Vector estado con el 11° evento. Simule los siguientes 3 eventos. Responda con 2 decimales (excepto las colas):',
      campos: [
        { label: 'En evento 12. Cola de Pacientes Especialidad =', correcto: 1, tol: 0.01 },
        { label: 'Fin Atención 1 =', correcto: 29.99, tol: 0.01 },
        { label: 'En evento 14. Fin Ayuda Telefónica =', correcto: 29.69, tol: 0.01 },
        { label: 'AC Tiempo de Perm. en Cola =', correcto: 22.46, tol: 0.01 },
      ],
      explicacion: 'Recordar: los AC Ocupado de cada médico son síncronos (se actualizan en cada iteración), pero el AC Tiempo de Perm. en Cola es asíncrono — sólo se incrementa cuando un paciente completa su espera y entra a atención.'
    },
    {
      id: 'p13', numero: 13, tipo: 'numeric',
      enunciado: 'Vector estado con el 15° evento. Simule los siguientes 4 eventos (hasta el evento 19). Responda con 2 decimales (excepto las colas):',
      campos: [
        { label: 'En evento 18. AC Ocupado 2 (Médico 2) =', correcto: 16.92, tol: 0.01 },
        { label: 'Fin Atención 2 =', correcto: 39.12, tol: 0.01 },
        { label: 'En evento 19. Próxima llegada General =', correcto: 39.03, tol: 0.01 },
        { label: 'Fin Espera General 1 =', correcto: 46.84, tol: 0.01 },
        { label: 'Cont. Pac. con acceso a Médico =', correcto: 7, tol: 0.01 },
      ],
      explicacion: 'El AC Ocupado del médico es síncrono: en cada evento se le suma el delta de tiempo que estuvo ocupado entre el evento anterior y el actual. Sólo cuenta tiempo atendiendo pacientes de la guardia (excluye llamadas telefónicas).'
    },
    {
      id: 'p15', numero: 15, tipo: 'numeric',
      enunciado: 'De acuerdo a la simulación realizada, responda las preguntas del enunciado:',
      campos: [
        { label: 'Cantidad de pacientes que abandonan la guardia =', correcto: 1, tol: 0.01 },
        { label: 'Porcentaje de ocupación del Médico 1 =', correcto: 94.11, tol: 0.01, sufijo: '%' },
        { label: 'Porcentaje de ocupación del Médico 2 =', correcto: 61.05, tol: 0.01, sufijo: '%' },
        { label: 'Tiempo medio de permanencia en cola de cada paciente (sin incluir a los pacientes que abandonan la espera) =', correcto: 5.56, tol: 0.01, sufijo: 'min' },
      ],
      explicacion: '% ocupación = (AC Ocupado del médico ÷ tiempo total de simulación) × 100, considerando sólo el tiempo atendiendo pacientes de la guardia (excluye llamadas telefónicas). Tiempo medio en cola = AC Tiempo de Perm. en Cola ÷ Cant. Pac. con acceso a Médico.'
    },
  ]
};
