// Mock work orders for The Grove (London, ON). Local only — no backend.

export type LangCode = "en" | "zh" | "es" | "fr" | "ar";

export const languages: Record<LangCode, { label: string; native: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", native: "English", dir: "ltr" },
  zh: { label: "Mandarin", native: "普通话", dir: "ltr" },
  es: { label: "Spanish", native: "Español", dir: "ltr" },
  fr: { label: "French", native: "Français", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", dir: "rtl" },
};

export type WorkOrderStatus = "emergency" | "in-progress" | "scheduled" | "resolved";

export type MessageAuthor = "resident" | "manager" | "ai";

export interface ThreadMessage {
  id: string;
  author: MessageAuthor;
  time: string;
  /** Text as written by the author. */
  original: string;
  /** Language `original` is written in. */
  originalLang: LangCode;
  /** Translation into the other party's language; null when none is needed or not yet available. */
  translation: string | null;
}

export interface TimelineStep {
  time: string;
  label: string;
}

export type AfterHoursOutcome =
  | {
      mode: "auto-resolved";
      receivedAt: string;
      classification: string;
      managerPages: 0;
      steps: TimelineStep[];
    }
  | {
      mode: "escalated";
      receivedAt: string;
      classification: string;
      voiceSummary: string;
      voiceSeconds: number;
      transferTo: string;
      connectedIn: string;
      steps: TimelineStep[];
    };

export interface WorkOrder {
  id: string;
  title: string;
  location: string;
  category: string;
  status: WorkOrderStatus;
  reportedAt: string;
  scheduledFor?: string;
  assignee: string;
  resident: { name: string; lang: LangCode };
  afterHours?: AfterHoursOutcome;
  thread: ThreadMessage[];
}

export const workOrders: WorkOrder[] = [
  {
    id: "WO-1190",
    title: "Active leak through bathroom ceiling",
    location: "Unit 804",
    category: "Plumbing",
    status: "emergency",
    reportedAt: "Today · 3:42 AM",
    assignee: "D. Okafor (on-call) · Aqua-Tech London",
    resident: { name: "Lucía Hernández", lang: "es" },
    afterHours: {
      mode: "escalated",
      receivedAt: "3:42 AM",
      classification: "Emergency — water near electrical",
      voiceSummary: "Active leak, Unit 804 bathroom ceiling, near an outlet. Likely from 904. Resident is safe.",
      voiceSeconds: 5,
      transferTo: "D. Okafor, on-call manager",
      connectedIn: "22 sec",
      steps: [
        { time: "3:42 AM", label: "Resident message received" },
        { time: "3:42 AM", label: "AI classified as emergency (water + electrical)" },
        { time: "3:43 AM", label: "5-second voice summary generated" },
        { time: "3:43 AM", label: "Warm transfer to on-call manager — connected in 22 sec" },
        { time: "3:51 AM", label: "Water shut off at riser 9B" },
        { time: "4:10 AM", label: "Aqua-Tech London plumber on site" },
      ],
    },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "3:42 AM",
        original:
          "¡Hay agua cayendo del techo del baño! Está goteando sobre el piso y cerca del enchufe. ¿Pueden enviar a alguien ya?",
        originalLang: "es",
        translation:
          "Water is coming through the bathroom ceiling! It's dripping onto the floor and near the outlet. Can you send someone now?",
      },
      {
        id: "m2",
        author: "ai",
        time: "3:42 AM",
        original:
          "Hemos marcado esto como emergencia. Por favor, no toque el enchufe y coloque toallas en el piso. Le estamos comunicando con el gerente de guardia.",
        originalLang: "es",
        translation:
          "We've flagged this as an emergency. Please don't touch the outlet and place towels on the floor. We're connecting you to the on-call manager.",
      },
    ],
  },
  {
    id: "WO-1187",
    title: "Elevator 2 stopped between floors 6 and 7",
    location: "Elevator 2",
    category: "Elevator",
    status: "emergency",
    reportedAt: "Today · 7:55 AM",
    assignee: "KONE technician · ETA 9:30 AM",
    resident: { name: "Front desk", lang: "en" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "7:55 AM",
        original: "Elevator 2 stopped between 6 and 7. Nobody inside. Out-of-service signs posted on every floor.",
        originalLang: "en",
        translation: null,
      },
    ],
  },
  {
    id: "WO-1186",
    title: "No heat in bedroom",
    location: "Unit 418",
    category: "HVAC",
    status: "in-progress",
    reportedAt: "Yesterday · 9:20 PM",
    assignee: "M. Tremblay",
    resident: { name: "Amélie Gagnon", lang: "fr" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "9:20 PM",
        original: "Bonjour, le chauffage ne fonctionne plus dans la chambre depuis hier soir. Il fait environ 17 °C.",
        originalLang: "fr",
        translation: "Hello, the heating in the bedroom hasn't worked since last night. It's about 17°C.",
      },
      {
        id: "m2",
        author: "manager",
        time: "8:05 AM",
        original: "Thanks Amélie, Marc will come by today between 1 and 3 PM to check the baseboard heater.",
        originalLang: "en",
        translation: "Merci Amélie, Marc passera aujourd'hui entre 13 h et 15 h pour vérifier la plinthe chauffante.",
      },
    ],
  },
  {
    id: "WO-1182",
    title: "Kitchen faucet leaking",
    location: "Unit 312",
    category: "Plumbing",
    status: "in-progress",
    reportedAt: "Today · 9:14 AM",
    assignee: "M. Tremblay",
    resident: { name: "Priya Patel", lang: "en" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "9:14 AM",
        original: "The kitchen faucet keeps dripping even when it's fully closed. There's a small puddle under the sink too.",
        originalLang: "en",
        translation: null,
      },
    ],
  },
  {
    id: "WO-1185",
    title: "Hallway lights out",
    location: "Floor 9 · East hallway",
    category: "Electrical",
    status: "scheduled",
    reportedAt: "Yesterday · 6:40 PM",
    scheduledFor: "Wed, Nov 25 · 2:00 PM",
    assignee: "In-house maintenance",
    resident: { name: "Concierge", lang: "en" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "6:40 PM",
        original: "Three ceiling fixtures out near units 905–910. Emergency lighting is working.",
        originalLang: "en",
        translation: null,
      },
    ],
  },
  {
    id: "WO-1184",
    title: "Dishwasher not draining",
    location: "Unit 615",
    category: "Appliance",
    status: "scheduled",
    reportedAt: "Mon · 5:10 PM",
    scheduledFor: "Thu, Nov 26 · 10:00 AM",
    assignee: "Reliance Appliance Repair",
    resident: { name: "Carlos Romero", lang: "es" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "5:10 PM",
        original: "El lavavajillas no desagua; queda agua sucia en el fondo después de cada ciclo.",
        originalLang: "es",
        translation: "The dishwasher won't drain; dirty water stays at the bottom after every cycle.",
      },
      {
        id: "m2",
        author: "manager",
        time: "Tue · 9:30 AM",
        original:
          "Hi Carlos, we've booked an appliance technician for Thursday at 10 AM. Please clear the area under the sink.",
        originalLang: "en",
        translation:
          "Hola Carlos, programamos un técnico de electrodomésticos para el jueves a las 10 a. m. Por favor, despeje el área debajo del fregadero.",
      },
    ],
  },
  {
    id: "WO-1180",
    title: "Annual smoke alarm test",
    location: "Unit 210",
    category: "Life safety",
    status: "scheduled",
    reportedAt: "Fri · 11:00 AM",
    scheduledFor: "Fri, Nov 27 · 9:00 AM–12:00 PM",
    assignee: "Fire Safety Inc.",
    resident: { name: "Li Na (李娜)", lang: "zh" },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "Sat · 4:12 PM",
        original: "请问检查烟雾报警器需要我在家吗?",
        originalLang: "zh",
        translation: "Do I need to be home for the smoke alarm inspection?",
      },
      {
        id: "m2",
        author: "manager",
        time: "Mon · 9:02 AM",
        original: "No need — we'll enter with 24-hour written notice. The visit takes about 10 minutes.",
        originalLang: "en",
        translation: "不需要在家——我们会提前24小时书面通知后入户,检查大约需要10分钟。",
      },
    ],
  },
  {
    id: "WO-1189",
    title: "Resident locked out",
    location: "Unit 1107",
    category: "Access",
    status: "resolved",
    reportedAt: "Today · 2:15 AM",
    assignee: "OpenLobby AI · Overnight security",
    resident: { name: "Wei Zhang (张伟)", lang: "zh" },
    afterHours: {
      mode: "auto-resolved",
      receivedAt: "2:15 AM",
      classification: "Non-emergency — lockout",
      managerPages: 0,
      steps: [
        { time: "2:15 AM", label: "Resident message received (Mandarin)" },
        { time: "2:15 AM", label: "AI classified as non-emergency lockout" },
        { time: "2:16 AM", label: "Identity verified against tenant file" },
        { time: "2:16 AM", label: "Overnight security dispatched to Unit 1107" },
        { time: "2:24 AM", label: "Resident confirmed entry — ticket closed" },
      ],
    },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "2:15 AM",
        original: "你好,我被锁在门外了,钥匙忘在屋里。现在是凌晨两点,请问有人能帮我开门吗?",
        originalLang: "zh",
        translation: "Hi, I'm locked out — I left my keys inside. It's 2 AM, can someone help me open the door?",
      },
      {
        id: "m2",
        author: "ai",
        time: "2:16 AM",
        original: "已核实您的身份。夜班保安将在10分钟内到达1107室为您开门。",
        originalLang: "zh",
        translation: "Your identity has been verified. Overnight security will arrive at Unit 1107 within 10 minutes to let you in.",
      },
      {
        id: "m3",
        author: "resident",
        time: "2:24 AM",
        original: "谢谢!门已经开了。",
        originalLang: "zh",
        translation: "Thank you! The door is open now.",
      },
    ],
  },
  {
    id: "WO-1188",
    title: "Noise complaint — loud music",
    location: "Unit 1204 → 1304",
    category: "Noise",
    status: "resolved",
    reportedAt: "Today · 1:48 AM",
    assignee: "OpenLobby AI",
    resident: { name: "Omar Haddad", lang: "ar" },
    afterHours: {
      mode: "auto-resolved",
      receivedAt: "1:48 AM",
      classification: "Non-emergency — noise",
      managerPages: 0,
      steps: [
        { time: "1:48 AM", label: "Resident message received (Arabic)" },
        { time: "1:48 AM", label: "AI classified as non-emergency noise complaint" },
        { time: "1:49 AM", label: "Quiet-hours reminder (11 PM–7 AM) sent to Unit 1304" },
        { time: "2:20 AM", label: "No repeat report — logged for morning review" },
      ],
    },
    thread: [
      {
        id: "m1",
        author: "resident",
        time: "1:48 AM",
        original: "هناك موسيقى عالية جداً من الشقة التي فوقي منذ ساعة. لدي عمل في الصباح الباكر.",
        originalLang: "ar",
        translation: "There's been very loud music from the unit above me for an hour. I have work early in the morning.",
      },
      {
        id: "m2",
        author: "ai",
        time: "1:49 AM",
        original: "نعتذر عن الإزعاج. أرسلنا تذكيراً بساعات الهدوء إلى الشقة 1304، وسنتابع إذا استمر الضجيج.",
        originalLang: "ar",
        translation:
          "Sorry for the disturbance. We've sent a quiet-hours reminder to Unit 1304 and will follow up if the noise continues.",
      },
    ],
  },
];

/** Canned manager replies with ready translations (demo stand-in for live translation). */
export const quickReplies: { en: string; translations: Record<Exclude<LangCode, "en">, string> }[] = [
  {
    en: "A technician will be there within the hour.",
    translations: {
      zh: "技术人员将在一小时内到达。",
      es: "Un técnico llegará en menos de una hora.",
      fr: "Un technicien sera sur place d'ici une heure.",
      ar: "سيصل فني خلال ساعة.",
    },
  },
  {
    en: "Thanks for letting us know — we're on it.",
    translations: {
      zh: "感谢您告知我们——我们正在处理。",
      es: "Gracias por avisarnos; ya nos estamos ocupando.",
      fr: "Merci de nous avoir prévenus — nous nous en occupons.",
      ar: "شكراً لإبلاغنا — نحن نعمل على ذلك.",
    },
  },
  {
    en: "Please send a photo of the issue.",
    translations: {
      zh: "请发送一张问题的照片。",
      es: "Por favor, envíe una foto del problema.",
      fr: "Veuillez envoyer une photo du problème.",
      ar: "يرجى إرسال صورة للمشكلة.",
    },
  },
  {
    en: "We'll give 24-hour written notice before entering your unit.",
    translations: {
      zh: "进入您的单元前,我们会提前24小时书面通知。",
      es: "Le daremos un aviso por escrito con 24 horas de anticipación antes de entrar a su unidad.",
      fr: "Nous vous donnerons un préavis écrit de 24 heures avant d'entrer dans votre logement.",
      ar: "سنرسل لك إشعاراً كتابياً قبل 24 ساعة من دخول وحدتك.",
    },
  },
];
