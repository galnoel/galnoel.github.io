import { asset } from './content.mjs';

const step = (id, en, idCopy, button) => ({ id, en, idCopy, button });
const flow = (title, idTitle, steps) => ({ title, idTitle, steps });
export const evidence = {
    yudha: flow('How the game server decides a match', 'Cara server menentukan hasil pertandingan', [
        step('yudha-panel-connect', ['Connect', 'The Flutter client connects to the NestJS game server through Socket.IO. Practice and progress go through REST APIs on a separate app backend.'], ['Hubungkan', 'Aplikasi Flutter terhubung ke server gim NestJS melalui Socket.IO. Latihan dan kemajuan ditangani lewat REST API pada backend aplikasi terpisah.'], 'yudha-step-connect'),
        step('yudha-panel-validate', ['Validate', 'The game server checks each action before accepting it. This keeps the rules in one place for both players.'], ['Validasi', 'Server gim memeriksa setiap tindakan sebelum menerimanya. Dengan begitu, aturan yang sama berlaku bagi kedua pemain.'], 'yudha-step-validate'),
        step('yudha-panel-state', ['Keep state', 'Redis holds matchmaking and game state. Supabase PostgreSQL stores persistent data.'], ['Simpan status', 'Redis menyimpan antrean pemain dan status pertandingan. Supabase PostgreSQL menyimpan data jangka panjang.'], 'yudha-step-state'),
        step('yudha-panel-resolve', ['Resolve', 'The server determines the battle result from the validated game state.'], ['Tentukan hasil', 'Server menentukan hasil pertandingan berdasarkan status gim yang telah divalidasi.'], 'yudha-step-resolve')
    ]),
    neurokit: {
        title: 'Prototype and evaluation', idTitle: 'Prototipe dan evaluasi',
        views: [
            { id: 'neurokit-hardware', en: ['Hardware', 'The 15 × 14.5 × 20 cm enclosure integrates lighting, audio, sensing, and a display.'], idCopy: ['Perangkat', 'Kotak berukuran 15 × 14,5 × 20 cm memuat lampu, audio, sensor, dan layar.'], photos: [1] },
            { id: 'neurokit-mobile', en: ['Mobile controls', 'The Flutter app controls audio and study sessions over Bluetooth.'], idCopy: ['Kontrol ponsel', 'Aplikasi Flutter mengatur audio dan sesi belajar melalui Bluetooth.'], photos: [2, 3] },
            { id: 'neurokit-validation', en: ['Validation', 'Lighting measured 516–553 lux at five distances between 30 and 70 cm. The team reported an 11.35% improvement in a supplementary Wechsler Memory Scale evaluation. The available records give limited detail about the study design.'], idCopy: ['Validasi', 'Pencahayaan terukur 516–553 lux di lima titik antara 30 dan 70 cm. Tim melaporkan peningkatan 11,35% dalam evaluasi tambahan Wechsler Memory Scale. Dokumen yang tersedia hanya memuat rincian terbatas mengenai rancangan studi.'], photos: [4] }
        ]
    },
    cora: {
        title: 'Match and settlement', idTitle: 'Pertandingan dan penyelesaian transaksi',
        views: [
            { id: 'cora-landing', en: ['Overview', 'The CORA game interface introduces the multiplayer experience.'], idCopy: ['Gambaran umum', 'Halaman utama CORA memperkenalkan gim multipemain.'], photos: [0] },
            { id: 'cora-gameplay', en: ['Live match', 'Screenshot of a real-time match from the project.'], idCopy: ['Pertandingan', 'Tangkapan layar pertandingan real-time dalam proyek CORA.'], photos: [2] },
            { id: 'cora-flow', en: ['Settlement path', 'How a finished match becomes a payout.'], idCopy: ['Alur transaksi', 'Alur dari akhir pertandingan hingga pembayaran.'], flow: flow('Settlement steps', 'Tahapan transaksi', [
                step('cora-match', ['Match', 'Bun and Hono WebSockets track match state.'], ['Pertandingan', 'WebSocket Bun dan Hono melacak status pertandingan.']),
                step('cora-verify', ['Verify', 'The server evaluates the game payload.'], ['Verifikasi', 'Server memeriksa data hasil pertandingan.']),
                step('cora-sign', ['Sign', 'The oracle generates a deterministic signature.'], ['Tanda tangan', 'Oracle menghasilkan tanda tangan deterministik.']),
                step('cora-settle', ['Settle', 'The transaction executes the native SOL payout.'], ['Pembayaran', 'Transaksi membayarkan SOL native.'])
            ]) }
        ]
    },
    aksara: {
        title: 'Evaluation figures', idTitle: 'Gambar evaluasi',
        views: [
            { id: 'aksara-matrix', en: ['Confusion matrix', 'Validation predictions across 20 handwritten Javanese script classes.'], idCopy: ['Matriks kebingungan', 'Prediksi validasi untuk 20 kelas aksara Jawa tulisan tangan.'], photos: [1] },
            { id: 'aksara-interpret', en: ['Interpretation', 'Attribution output used to inspect structural features after preprocessing.'], idCopy: ['Interpretasi', 'Visualisasi atribusi untuk memeriksa ciri struktural setelah prapemrosesan.'], photos: [2] }
        ]
    },
    socratix: flow('Illustrative request flow', 'Contoh alur permintaan', [
        step('socratix-route', ['Route and plan', 'For a request like 3x + 5 = 14, the router identifies the problem type, variables, and known values.'], ['Rutekan dan rencanakan', 'Untuk permintaan seperti 3x + 5 = 14, perute mengenali jenis soal, variabel, dan nilai yang diketahui.']),
        step('socratix-check', ['Validate', 'Math.js AST substitution checks equations before the response is generated.'], ['Validasi', 'Substitusi AST Math.js memeriksa persamaan sebelum respons dibuat.']),
        step('socratix-guide', ['Guide', 'The tutoring agent builds a step-by-step Socratic prompt and requests the next useful visual.'], ['Bimbing', 'Agen tutor menyusun pertanyaan Sokratik bertahap dan meminta visual pendukung.']),
        step('socratix-show', ['Visualize', 'The visual agent plans a balance scale, fraction bar, number line, or coordinate scene.'], ['Visualisasikan', 'Agen visual menyiapkan timbangan, batang pecahan, garis bilangan, atau bidang koordinat.'])
    ])
};

export const legacyEvidence = {
    yudha: ['yudha-system-title', ...evidence.yudha.steps.flatMap(({ id, button }) => [id, button])],
    cora: evidence.cora.views.flatMap(({ id }) => [id, id + '-tab']),
    neurokit: evidence.neurokit.views.flatMap(({ id }) => [id, id + '-tab']),
    aksara: evidence.aksara.views.flatMap(({ id }) => [id, id + '-tab'])
};

export const supplementalImages = {
    portrait: asset('site-fekdi-portrait.webp'),
    award: asset('site-pidi.webp')
};
