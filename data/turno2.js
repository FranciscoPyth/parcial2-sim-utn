window.TURNO_2 = {
  id: 'turno-2',
  nombre: 'Turno 2 — Drones',
  pdf: 'assets/Tema-2-Enunciado.pdf',
  iteracionesXlsx: 'assets/Tema-2-Iteraciones.xlsx',
  enunciadoHtml: `
    <h3>Tema 2:</h3>
    <p>En un centro técnico especializado en reparación de drones, los clientes acuden solicitando
    reparaciones generales o reparaciones especializadas. El centro cuenta con dos técnicos, cada uno
    trabajando en puestos de reparación independientes y con la misma capacidad operativa.</p>

    <p>Los clientes llegan al centro siguiendo una distribución exponencial negativa, con un tiempo
    medio entre llegadas de 4 minutos.</p>

    <p><strong>Tipos de reparación y asignación:</strong></p>
    <ul>
      <li>Reparaciones generales pueden ser realizadas por cualquiera de los dos técnicos.</li>
      <li>Reparaciones especializadas sólo pueden ser realizadas por el Técnico 1, ya que el
      Técnico 2 no está certificado para ello.</li>
      <li>Cada reparación, ya sea general o especializada, tiene una duración distribuida uniformemente
      entre 6 y 10 minutos.</li>
      <li>Los clientes son atendidos por orden de llegada y asignados al primer técnico libre que sea
      compatible con el tipo de reparación requerida.</li>
      <li>Si ambos técnicos están libres, el siguiente cliente es atendido por Técnico 1, siempre que sea
      compatible.</li>
      <li>Si al terminar una reparación el Técnico 1 observa que hay clientes esperando por reparaciones
      especializadas, les da prioridad, incluso si hay clientes con reparaciones generales en espera.</li>
    </ul>

    <p>Los clientes que requieren reparaciones generales no están dispuestos a esperar más de un tiempo
    máximo t, el cual se determina resolviendo la siguiente ecuación diferencial:</p>

    <p style="text-align:center; font-size: 1.1em;">
      <strong>dE/dt = 0,19·E + 0,21·t + 0,28</strong>
    </p>

    <p>Método de resolución: <strong>Runge-Kutta de 4º orden</strong>. Paso de integración: <strong>h=0,1</strong>
    (una unidad de integración equivale a 1 minuto). Condición inicial: <strong>E(t=0)=0</strong>. Se considera
    que el cliente abandona si <strong>E&gt;100</strong>.</p>

    <p>Todos los clientes de reparaciones generales comparten el mismo límite de espera.</p>

    <p>Además, si al llegar el cliente observa que ya hay tres personas en espera, se retira directamente,
    sin importar el tipo de reparación que esperen los otros.</p>

    <p>Debido a fallas masivas en drones en zonas remotas, cada 90 minutos (distribución exponencial
    negativa), llega una llamada telefónica solicitando asistencia técnica remota, que debe ser atendida
    por uno de los técnicos. La llamada dura exactamente 5 minutos. La asignación para responder la
    llamada sigue esta lógica:</p>
    <ul>
      <li>Si el Técnico 1 está libre o atendiendo una reparación general, atiende la llamada.</li>
      <li>Si T1 está realizando una reparación especializada, la llamada es atendida por el Técnico 2,
      incluso si está ocupado.</li>
    </ul>

    <p>Luego de la llamada, el técnico retoma exactamente la tarea que estaba realizando, desde donde
    la dejó. Si una segunda llamada llega mientras otra está en curso, se descarta y se pierde.</p>

    <p><strong>Se solicita calcular:</strong></p>
    <ol>
      <li>La cantidad de clientes que abandonan el centro técnico por superar su tiempo máximo de
      espera.</li>
      <li>La cantidad de clientes que ni siquiera se quedan a esperar (se retiran inmediatamente al ver
      que hay 3 personas esperando).</li>
      <li>El porcentaje de ocupación de cada técnico, considerando sólo el tiempo atendiendo clientes
      (no incluye el tiempo dedicado a llamadas telefónicas).</li>
      <li>El Tiempo medio de espera en cola de los clientes que no se van, sean de reparaciones
      generales o de especialidad.</li>
    </ol>

    <p class="nota"><strong>Para todos los valores del vector de estado que contengan decimales, truncar
    a dos decimales (no redondear).</strong></p>
  `,
  preguntas: [
    {
      id: 't2_p1', numero: 1, tipo: 'multi',
      enunciado: 'Un sistema con servidores en paralelo se caracteriza por:',
      opciones: [
        { id: 'a', texto: 'No permitir simulación computacional.', correcta: false },
        { id: 'b', texto: 'Mayor probabilidad de espera.', correcta: false },
        { id: 'c', texto: 'Usar múltiples colas por servidor.', correcta: false },
        { id: 'd', texto: 'Ser más eficiente en promedio que uno en serie.', correcta: true },
        { id: 'e', texto: 'Distribuir las llegadas entre múltiples servidores.', correcta: true },
      ],
      explicacion: 'Servidores en paralelo dividen la carga: cada llegada va al primer servidor compatible libre, reduciendo el tiempo medio de espera respecto a una configuración en serie.'
    },
    {
      id: 't2_p2', numero: 2, tipo: 'multi',
      enunciado: 'Eventos (e) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera en cola reparación especializada (abandono de cola).', correcta: false },
        { id: 'b', texto: 'Fin de espera en cola reparación general (abandono de cola).', correcta: true },
        { id: 'c', texto: 'Ninguno de los propuestos.', correcta: false },
        { id: 'd', texto: 'Fin de espera en cola reparación general B (abandono de cola).', correcta: false },
        { id: 'e', texto: 'Fin de espera en cola reparación especializada A (abandono de cola).', correcta: false },
        { id: 'f', texto: 'Fin Ayuda telefónica.', correcta: true },
      ],
      explicacion: 'Sólo los clientes de reparación general pueden abandonar por tiempo (la ecuación diferencial aplica únicamente a esa cola). El fin de ayuda telefónica también es evento NECESARIO porque libera al técnico que estaba atendiendo la llamada para retomar su tarea.'
    },
    {
      id: 't2_p3', numero: 3, tipo: 'multi',
      enunciado: '¿Cuáles Colas son NECESARIAS?',
      opciones: [
        { id: 'a', texto: 'Cola de clientes reparación general 1.', correcta: false },
        { id: 'b', texto: 'Cola de clientes reparación general.', correcta: true },
        { id: 'c', texto: 'Cola de llamadas.', correcta: false },
        { id: 'd', texto: 'Cola del Técnico 1.', correcta: false },
        { id: 'e', texto: 'Cola de clientes reparación especializada.', correcta: true },
        { id: 'f', texto: 'Cola del Técnico 2.', correcta: false },
      ],
      explicacion: 'Como los técnicos trabajan en paralelo y no hay cola dedicada por servidor, sólo hacen falta dos colas: una de generales y otra de especializadas. Las llamadas no hacen cola — si llega una segunda mientras hay otra en curso, se descarta.'
    },
    {
      id: 't2_p4', numero: 4, tipo: 'multi',
      enunciado: '¿Cuáles de estas columnas son NECESARIAS para resolver la simulación?',
      opciones: [
        { id: 'a', texto: 'Contador de clientes que abandonan la cola de reparación general (por superar el tiempo máximo).', correcta: true },
        { id: 'b', texto: 'Contador de clientes con reparación finalizada.', correcta: false },
        { id: 'c', texto: 'Contador de clientes que no ingresan (se retiran al ver 3 esperando).', correcta: true },
        { id: 'd', texto: 'Contador de clientes que son atendidos inmediatamente.', correcta: false },
        { id: 'e', texto: 'Contador de clientes con reparación finalizada por el Técnico 1.', correcta: false },
        { id: 'f', texto: 'Contador de clientes que abandonan la cola de reparación especializada.', correcta: false },
        { id: 'g', texto: 'Acumulador de tiempo de permanencia en cola + Contador de clientes con acceso a un técnico.', correcta: true },
      ],
      explicacion: 'Los resultados pedidos en el enunciado son: clientes que abandonan (contador a), clientes que ni siquiera entran (contador c) y tiempo medio en cola (acumulador del tiempo de espera dividido por la cantidad de clientes que sí accedieron a un técnico, opción g). El % de ocupación se obtiene del AC Ocupado de cada técnico (que ya forma parte del estado de cada uno), no requiere un contador propio.'
    },
    {
      id: 't2_p5', numero: 5, tipo: 'single',
      enunciado: 'Eventos (d) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de espera Cola 1.', correcta: false },
        { id: 'b', texto: 'Fin de espera Técnico 2.', correcta: false },
        { id: 'c', texto: 'Fin de espera Técnico 1.', correcta: false },
        { id: 'd', texto: 'Fin de espera Cola 2.', correcta: false },
        { id: 'e', texto: 'Ninguno de los propuestos.', correcta: true },
      ],
      explicacion: 'No existe un "fin de espera" asociado a un técnico ni a colas numeradas por técnico: el único abandono por tiempo es el de la cola general (cubierto en otra pregunta) y no se modela esperando por un servidor en particular.'
    },
    {
      id: 't2_p6', numero: 6, tipo: 'multi',
      enunciado: 'Eventos (b) ¿Cuáles de estos Eventos son NECESARIOS para resolver el problema?',
      opciones: [
        { id: 'a', texto: 'Fin de reparación general.', correcta: false },
        { id: 'b', texto: 'Fin de reparación especializada.', correcta: false },
        { id: 'c', texto: 'Fin de reparación 1.', correcta: false },
        { id: 'd', texto: 'Fin de reparación Técnico 2.', correcta: true },
        { id: 'e', texto: 'Fin de reparación Técnico 1.', correcta: true },
        { id: 'f', texto: 'Ninguno de los propuestos.', correcta: false },
      ],
      explicacion: 'El evento de fin de reparación debe modelarse por técnico (no por tipo de reparación) porque cada técnico tiene su propio tiempo de servicio U(6,10) y se necesita saber cuándo se libera cada uno para tomar el siguiente cliente.'
    },
  ]
};
