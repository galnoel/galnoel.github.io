export const projects = {
    yudha: {
        title: 'Platform persiapan ujian',
        focus: 'Rekayasa backend',
        summary: 'Saya memimpin perancangan arsitektur dan membangun dua backend NestJS untuk latihan ujian secara real-time.',
        intro: 'YUDHA adalah aplikasi Flutter untuk pelamar CPNS dan BUMN. Aplikasi ini menyediakan latihan soal, duel kuis, pelacakan kemajuan, dan simulasi wawancara dengan AI.',
        sections: {
            Problem: 'Menjaga agar pencocokan pemain, status pertandingan, dan kemajuan belajar tetap konsisten saat ada permintaan serentak atau pemain terputus.',
            'My role': 'Sebagai pemimpin teknis dan pengembang backend, saya bertanggung jawab atas arsitektur, kedua layanan NestJS, basis data Supabase, autentikasi, dan penerapan di Railway.',
            Approach: 'Backend aplikasi menyediakan REST API untuk latihan dan pelacakan kemajuan. Backend gim memakai Socket.IO untuk duel dan Redis untuk pencocokan pemain serta status pertandingan. Supabase PostgreSQL menyimpan data jangka panjang.',
            'Key decision': 'Server memvalidasi tindakan pemain dan menentukan hasil pertandingan.',
            Result: 'Saya menyelesaikan kedua backend dan menerbitkan aplikasi Android di Google Play. Tim meraih juara kedua PIDI DIGDAYA x HACKATHON 2026.',
            'Project scope': 'Versi beta terbuka mencakup pusat belajar, mode latihan Standard, Focus, dan Speed, serta simulasi wawancara berdasarkan perusahaan dan posisi. Fitur AI dan suara bergantung pada konfigurasi penyedia layanan.'
        },
        alts: ['Tampilan aplikasi YUDHA untuk belajar, berduel, dan berlatih wawancara']
    },
    neurokit: {
        title: 'Perangkat pendamping belajar',
        focus: 'Perangkat terhubung',
        summary: 'Saya memimpin tim yang membangun perangkat belajar dengan lampu adaptif dan aplikasi terhubung melalui Bluetooth.',
        intro: 'NEUROKIT adalah prototipe penelitian PKM yang didanai. Perangkat ini memadukan pencahayaan adaptif, terapi musik, gamifikasi, dan aplikasi Flutter. Tim menggunakan OpenRouter dan Prosa TTS untuk menghasilkan afirmasi personal dalam bentuk suara.',
        sections: {
            Problem: 'Mengintegrasikan lampu adaptif, audio, dan kontrol ponsel dalam satu prototipe pendamping belajar.',
            'My role': 'Saya memimpin tim PKM-KC.',
            Approach: 'Tim menghubungkan perangkat ESP32 ke aplikasi Flutter melalui Bluetooth untuk mengatur sesi belajar, audio, dan afirmasi bersuara.',
            'Key decision': 'Sensor jarak HC-SR04 dan rangkaian MOSFET dengan kontrol PWM menyesuaikan pencahayaan pada jarak 30–70 cm.',
            Result: 'Pencahayaan prototipe terukur pada 516–553 lux di lima titik pengujian antara 30 dan 70 cm.',
            Recognition: 'Tim meraih juara ketiga dan menerima penghargaan setara perunggu pada kategori presentasi PKM-KC1 di PIMNAS 38.'
        },
        alts: ['Perangkat NEUROKIT dengan lampu adaptif dan tampilan aplikasi pendamping', 'Prototipe NEUROKIT dengan modul lampu dan audio', 'Layar kontrol terapi di aplikasi NEUROKIT', 'Layar sesi belajar di aplikasi NEUROKIT', 'Sesi pengujian NEUROKIT bersama peserta']
    },
    lexara: {
        title: 'Asisten riset hukum Indonesia',
        focus: 'Rekayasa AI/ML',
        summary: 'Saya membangun alur pelatihan model, pencarian hibrida, dan antarmuka untuk riset hukum Indonesia.',
        intro: 'Lexara menggabungkan model Qwen 2.5 7B yang disetel ulang dengan pencarian atas lebih dari 1.900 halaman dokumen hukum ketenagakerjaan Indonesia.',
        sections: {
            Problem: 'Menemukan kutipan yang relevan dalam kumpulan dokumen hukum dan memudahkan pembaca memeriksa sumber setiap jawaban.',
            'My role': 'Saya mengerjakan proyek akhir Dicoding ini sendiri, dari alur pelatihan model dan pencarian hibrida hingga antarmuka riset yang responsif.',
            Approach: 'Saya menyetel ulang Qwen 2.5 7B dengan QLoRA dan Group Relative Policy Optimization (GRPO), menggunakan fungsi reward khusus untuk penalaran terstruktur.',
            'Key decision': 'Saya menggabungkan pencarian kata kunci BM25 dan pencarian vektor ChromaDB dengan Reciprocal Rank Fusion. Ekspansi kueri HyDE dan potongan dokumen bertingkat menambah konteks.',
            'Retrieval checks': 'Saya menambahkan pemeringkatan ulang dengan FlashRank, ambang keyakinan, dan pencarian cadangan lewat DuckDuckGo.',
            Result: 'Saya menerbitkan model gabungan 16-bit di Hugging Face Hub dan menerapkan Lexara di Vercel, dengan contoh pertanyaan, filter dokumen, status backend, dan rujukan hingga tingkat halaman.'
        },
        alts: ['Ruang kerja Lexara dengan pustaka dokumen dan contoh pertanyaan riset']
    },
    'fish-freshness': {
        name: 'Kesegaran ikan',
        title: 'Klasifikasi multimodal',
        focus: 'Sains data',
        summary: 'Saya menyiapkan data gambar untuk model tim yang menggabungkan foto tuna dan pembacaan sensor gas.',
        intro: 'Untuk babak penyisihan GEMASTIK XVIII, tim kami membuat pengklasifikasi kesegaran tuna menggunakan foto dan pembacaan sensor gas. Saya menangani prapemrosesan gambar.',
        sections: {
            Problem: 'Menggabungkan sinyal visual dan sensor gas sambil mempertahankan informasi penting dari keduanya.',
            'My role': 'Saya mengekstrak waktu pengambilan foto, memeriksa integritas gambar, menambah variasi data melalui augmentasi, dan menyeragamkan ukuran gambar.',
            Approach: 'Tim menyelaraskan foto dan pembacaan sensor DaFiF berdasarkan waktu, menyaring anomali, lalu menggabungkan DINOv2 dengan enkoder sensor MLP.',
            'Key decision': 'Tim menyelaraskan kedua modalitas dengan contrastive loss bergaya CLIP, lalu menggabungkannya lewat cross-attention dua arah. Focal Tversky Loss menangani ketimpangan kelas.',
            Result: 'Pada data validasi tuna, model tim mencapai akurasi 85,4%, macro F1 84,3%, dan F1 92,7% untuk kelas kesegaran Marginal.',
            'Model interpretation': 'Tim menggunakan Grad-CAM untuk melihat bagian gambar yang memengaruhi prediksi.'
        },
        alts: ['Peta perhatian model klasifikasi kesegaran tuna', 'Visualisasi Grad-CAM pada token gambar untuk klasifikasi kesegaran ikan']
    },
    cora: {
        title: 'Backend gim multipemain',
        focus: 'Sistem real-time',
        summary: 'Saya membangun alur pertandingan real-time dan verifikasi penyelesaian transaksi untuk gim Solana.',
        intro: 'Saya membangun alur pertandingan di server dan verifikasi penyelesaian transaksi CORA agar status gim, deposit, dan pembayaran tetap konsisten ketika peristiwa terjadi bersamaan.',
        sections: {
            Problem: 'Menjaga konsistensi pertandingan multipemain dan taruhan SOL dari deposit hingga pembayaran.',
            'My role': 'Saya mengembangkan mesin status pertandingan, oracle penyelesaian transaksi, dan endpoint Solana Actions.',
            Approach: 'Saya menghubungkan WebSocket Bun dan Hono dengan alur verifikasi, penandatanganan, serta pembayaran. Saya juga menambahkan pembungkusan wSOL dan mesin status deposit berurutan.',
            'Key decision': 'Saya mengunci parameter transaksi di setiap langkah agar peristiwa yang diproses bersamaan tetap menghasilkan pembayaran yang sama.',
            'On-chain integration': 'MagicBlock Ephemeral mencerminkan permainan di blockchain untuk keperluan verifikasi.',
            Result: 'Saya menyelesaikan alur pertandingan real-time dengan penyelesaian transaksi deterministik. Tim CORA menempati peringkat ke-9 dari 482 pengajuan di jalur 100xDevs Frontier Hackathon.'
        },
        alts: ['Halaman utama gim Solana CORA', 'Halaman utama gim Solana CORA', 'Tampilan pertandingan real-time CORA']
    },
    socratix: {
        title: 'Tutor matematika Sokratik',
        focus: 'Rekayasa AI',
        summary: 'Tutor yang mengenali jenis soal, memeriksa persamaan, dan membimbing siswa langkah demi langkah.',
        intro: 'Socratix berawal dari proyek LIDM 2025 untuk belajar matematika dengan visual dinamis. Prototipe berikutnya memakai beberapa agen, dengan antarmuka Next.js dan pipeline NestJS untuk perutean, perencanaan, validasi matematika deterministik, dan visual interaktif yang dikirim secara bertahap.',
        sections: {
            Problem: 'Mengubah pertanyaan siswa yang beragam menjadi soal terstruktur yang dapat diperiksa dan dijelaskan oleh tutor.',
            'My role': 'Saya merancang perute dan perencana soal memakai Groq dan NestJS, termasuk klasifikasi masukan dan ekstraksi konteks.',
            Approach: 'Aturan regex menangani pola umum, dengan LLM melalui Vercel AI SDK sebagai cadangan. Skema Zod memeriksa persamaan, jenis soal, dan parameter.',
            'Key decision': 'Math.js memeriksa persamaan sebelum tutor menyusun panduan. Penanganan galat dan mitigasi prompt injection membantu menghadapi masukan tak terduga.',
            Result: 'Perute mengklasifikasikan 20 dari 20 contoh dalam evaluasi proyek berskala kecil yang memakai API Groq.',
            Recognition: 'Tim menempati peringkat ke-11 pada jalur AI for Education ASEAN AI Hackathon pada Mei 2026 dan juara pertama seleksi UNSRAT untuk divisi Inovasi Teknologi Digital Pendidikan LIDM pada September 2025.'
        },
        alts: ['Tampilan Socratix dengan tutor matematika AI serta portal guru dan siswa']
    },
    spark: {
        title: 'Asisten percakapan untuk web dan seluler',
        focus: 'Kepemimpinan pengembangan',
        summary: 'Saya memimpin 12 kontributor membangun asisten AI dengan chat real-time, riwayat percakapan, dan interaksi suara berbahasa Indonesia di Android.',
        intro: 'SPARK adalah asisten AI pribadi untuk web dan Android. Di web, pengguna bisa memilih contoh pertanyaan, mengetik pertanyaan sendiri, atau membuka kembali percakapan yang tersimpan. Saya memimpin 12 kontributor dari bidang web, seluler, backend, machine learning, dan data untuk UNSRAT IT Community (UNITY).',
        sections: {
            Problem: 'Menyatukan percakapan teks, riwayat sesi, dan interaksi suara di web dan Android.',
            'My role': 'Saya mengoordinasikan pengembangan web, seluler, AI, dan data serta mengawasi integrasi antartim.',
            Approach: 'Tim menghubungkan Next.js dan Flutter ke NestJS dengan autentikasi JWT, pesan Socket.IO, serta penyimpanan percakapan di PostgreSQL melalui Prisma.',
            'Voice workflow': 'Di Android, pengguna mengetuk tombol mikrofon untuk memulai percakapan suara. SPARK mengubah ucapan menjadi teks dan merespons secara real-time, dengan sintesis suara untuk jawaban dalam bahasa Indonesia.',
            'Service integration': 'Kontrak gRPC terpisah menghubungkan backend chat dengan respons AI dan sintesis suara. Layanan Python memakai Flask, SpeechRecognition, dan Edge TTS untuk percakapan berbahasa Indonesia.',
            Result: 'UNITY meluncurkan SPARK pada 11 November 2024. Tim kami menyelesaikan aplikasi web dan Android, backend chat, dan layanan suara, lalu mendemonstrasikan asisten ini di TECHOFEST 2024.'
        },
        alts: ['Halaman utama proyek SPARK', 'Antarmuka chat SPARK dengan enam contoh pertanyaan, kolom pesan, dan tombol riwayat', 'Demonstrasi chatbot SPARK di panggung TECHOFEST 2024'],
        captions: ['', 'Chat web menyediakan contoh pertanyaan dalam bahasa Indonesia tentang keterampilan belajar, blockchain, daur ulang, dan topik lainnya.']
    },
    mlops: {
        title: 'Rilis dan pemantauan model',
        focus: 'MLOps',
        summary: 'Rilis model otomatis dengan dasbor volume permintaan, galat, dan latensi.',
        intro: 'Saya mengerjakan proyek akhir Dicoding ini sendiri. Pipeline menghubungkan eksperimen model dengan rilis kontainer teruji, pemantauan inferensi, dan peringatan layanan.',
        sections: {
            Problem: 'Membuat rilis model dapat diulang dan mendeteksi perubahan performa layanan setelah penerapan.',
            'My role': 'Saya membuat otomatisasi rilis, exporter Prometheus, dasbor Grafana, dan aturan peringatan.',
            Approach: 'MLflow, Docker, dan GitHub Actions menjalankan pengujian unit, mengelola versi artefak model, dan menerbitkan image ke Docker Hub.',
            'Key decision': 'Dasbor menampilkan volume inferensi, tingkat galat, dan latensi p95 bersama informasi rilis.',
            Result: 'Pipeline merilis model secara otomatis dan mengirim peringatan saat latensi melonjak atau layanan menurun.'
        },
        alts: ['Dasbor Grafana dengan metrik permintaan, latensi, dan inferensi']
    },
    diffusion: {
        title: 'Pembuatan dan penyuntingan gambar',
        focus: 'AI generatif',
        summary: 'Ruang kerja Streamlit untuk membuat gambar, mengisi area bertopeng, dan memperluas kanvas.',
        intro: 'Saya mengerjakan proyek akhir Dicoding ini sendiri, membangun aplikasi Streamlit dengan Stable Diffusion 1.5 untuk membuat gambar, menyunting area tertentu, dan memperluas gambar.',
        sections: {
            Problem: 'Memberi pengguna kendali atas pembuatan gambar dan penyuntingan bagian tertentu dalam satu antarmuka.',
            'My role': 'Saya membuat pipeline difusi, alur penyuntingan, dan aplikasi Streamlit.',
            Approach: 'Antarmuka menyediakan pengaturan seed, negative prompt, sampling, serta masker kanvas untuk inpainting dan outpainting.',
            'Key decision': 'Seed deterministik memungkinkan pengulangan hasil. Pencampuran pada tepi masker menyatukan area yang disunting dengan gambar sekitarnya.',
            Result: 'Aplikasi interaktif mendukung pembuatan gambar, inpainting, dan outpainting.'
        },
        alts: ['Gambar astronaut di permukaan planet yang dibuat dengan Stable Diffusion']
    },
    aksara: {
        name: 'Aksara Jawa',
        title: 'Klasifikasi tulisan tangan',
        focus: 'Visi komputer',
        summary: 'Model klasifikasi 20 aksara tulisan tangan dalam tantangan lima jam.',
        intro: 'Pada final GEMASTIK XVIII, saya bertugas sebagai pemodel untuk pipeline klasifikasi 20 kelas aksara Jawa tulisan tangan. Tim memakai Co-Scale Conv-Attentional Transformers (CoaT).',
        sections: {
            Problem: 'Mengklasifikasikan 20 kategori tulisan tangan dengan waktu terbatas dan data latih yang timpang.',
            'My role': 'Saya membandingkan arsitektur model, menerapkan penyetelan dua tahap dengan Focal Loss, dan memeriksa prediksi dengan Captum Integrated Gradients.',
            Approach: 'Saya membandingkan CoaT, Swin, dan EfficientNet. Pelatihan dimulai dengan patch embedding yang dibekukan, lalu dilanjutkan dengan penyetelan bertahap memakai AdamW dan Kornia Focal Loss.',
            'Key decision': 'Macro F1 mengukur performa lintas kelas. Captum Integrated Gradients membantu memeriksa kontribusi goresan dan mendeteksi kemungkinan model mengandalkan petunjuk semu.',
            Result: 'Model akhir CoaT mencapai macro F1 96,7% pada validasi 20 kelas.',
            'Recognition shown in project footer': 'Tim menerima penghargaan Most Inspiring Team pada GEMASTIK XVIII.'
        },
        alts: ['Klasifikasi aksara Jawa dan interpretasi model', 'Matriks kebingungan untuk 20 kelas aksara Jawa tulisan tangan', 'Visualisasi interpretasi model klasifikasi aksara Jawa']
    },
    semara: {
        title: 'Aplikasi perawatan harian',
        focus: 'Rekayasa backend',
        summary: 'Aplikasi untuk membantu lansia mengatur rutinitas, pengingat obat, dan catatan gizi.',
        intro: 'SEMARA (Senja Emas Rahayu) menyatukan pengingat obat, jadwal konsultasi, aktivitas, dan catatan gizi dalam satu aplikasi seluler. Saya mengerjakan backend-nya.',
        sections: {
            Problem: 'Menyatukan rutinitas dan informasi perawatan pribadi bagi pengguna lansia.',
            'My role': 'Pengembang backend aplikasi seluler SEMARA.',
            Approach: 'Pendaftaran terhubung ke dasbor pengingat obat, jadwal konsultasi, rencana aktivitas, catatan makanan, dan laporan mingguan.',
            Result: 'Tim meraih juara pertama seleksi Universitas Sam Ratulangi untuk divisi Pengembangan Perangkat Lunak GEMASTIK XVII pada 2024.'
        },
        alts: ['Layar aplikasi SEMARA untuk pendaftaran, pengingat obat, dan laporan mingguan']
    },
    'tweet-sentiment-tuning': {
        name: 'Analisis sentimen tweet',
        title: 'Penyetelan hiperparameter',
        focus: 'Pemrosesan bahasa alami',
        summary: 'Eksperimen klasifikasi tweet berbahasa Indonesia dengan prapemrosesan teks dan perbandingan konfigurasi model.',
        intro: 'Saya berkolaborasi dalam eksperimen analisis sentimen tweet Indonesia dengan prapemrosesan teks, pengklasifikasi scikit-learn, dan perbandingan hiperparameter.',
        sections: {
            Problem: 'Mengklasifikasikan sentimen pada tweet informal berbahasa Indonesia dan membandingkan dampak konfigurasi model.',
            'My role': 'Saya berkolaborasi dalam eksperimen analisis sentimen dan penyetelan hiperparameter.',
            Approach: 'Kami menyiapkan teks tweet, mencoba konfigurasi model di Python dan scikit-learn, lalu membandingkan laporan klasifikasi.',
            Result: 'Notebook Colab bersama mendokumentasikan alur klasifikasi, konfigurasi model, dan perbandingan evaluasi.'
        },
        alts: ['Laporan klasifikasi sentimen dengan presisi, recall, dan F1']
    },
    deepfake: {
        title: 'Pertukaran wajah dan suara',
        focus: 'AI multimedia',
        summary: 'Prototipe tim UNITY untuk pertukaran wajah dan konversi suara dengan kNN-VC.',
        intro: 'Saya berkolaborasi dalam proyek UNITY yang menggabungkan pertukaran wajah dan konversi suara. Tim mendemonstrasikan prototipe multimedia ini di TECHOFEST 2023.',
        sections: {
            Problem: 'Menggabungkan transformasi wajah dan suara dalam satu demonstrasi multimedia.',
            'My role': 'Saya berkontribusi pada pengembangan dan demonstrasi bersama tim UNITY.',
            Approach: 'Tim mengeksplorasi pertukaran wajah dan menghubungkan layanan suara Python berbasis PyTorch, kNN-VC, dan gRPC ke prototipe berantarmuka Flask.',
            'Voice workflow': 'Layanan menyiapkan audio mono, mencocokkan ciri audio sumber dengan suara rujukan, lalu mengembalikan audio hasil konversi.',
            Result: 'Tim mempresentasikan prototipe di UNITY Techofest 2023 dan memublikasikan video proyek.'
        },
        alts: ['Materi visual proyek pertukaran wajah dan suara']
    },
    jtehub: {
        title: 'Platform pemesanan fasilitas',
        focus: 'Rekayasa backend',
        intro: 'Saya membuat backend penjadwalan dengan NestJS, penanganan zona waktu, pemeriksaan jadwal yang bentrok di Supabase PostgreSQL, dan kontrol akses berbasis peran.',
        alts: ['Situs JTEHub untuk pemesanan fasilitas']
    },
    anthropometric: {
        name: 'Rekomendasi fasilitas umum',
        focus: 'Penggalian data',
        intro: 'Tim menerapkan Apriori dan Eclat pada data pengukuran tubuh 182 lansia di Indonesia. Kami menghasilkan tujuh aturan ergonomi untuk kursi, pegangan tangga, dan meja layanan, serta menjadi salah satu dari 20 finalis nasional GEMASTIK XVII divisi Data Mining.',
        sections: { 'Result or context': 'Finalis nasional GEMASTIK XVII' },
        alts: ['Gambar penelitian antropometri untuk rekomendasi fasilitas umum']
    },
    'employee-attrition': {
        name: 'Analisis pengunduran diri karyawan',
        focus: 'Sains data',
        intro: 'Untuk proyek akhir Dicoding, saya menganalisis pola pengunduran diri karyawan secara mandiri. Saya menyajikan hasilnya dalam dasbor SDM dan mencatat evaluasi model di notebook proyek.',
        sections: { 'Result or context': 'Dasbor dan evaluasi model' },
        alts: ['Dasbor SDM yang menampilkan pola pengunduran diri dan komposisi karyawan']
    },
    'warong-warem': {
        title: 'Situs restoran',
        focus: 'Pengembangan web',
        intro: 'Saya mengerjakan backend situs restoran dengan PHP, basis data relasional, dan validasi formulir.',
        sections: { 'My role': 'Pengembang backend.', 'Result or context': 'Proyek akademik' },
        alts: ['Tampilan situs restoran Warong Warem']
    }
};

export const experience = [
    {
        role: 'Magang Rekayasa AI',
        body: ['Saya membangun dan menerapkan asisten RAG di server internal bank dengan Ollama, n8n, dan Supabase pgvector. Inferensi dan penyimpanan vektor berjalan secara lokal agar staf dapat menelusuri informasi internal.', 'Saya mendokumentasikan sistem dengan diagram use case, sekuens, dan relasi entitas, termasuk koneksi antara frontend Next.js dan backend AI.'],
        alts: ['Diskusi proyek magang di Bank SulutGo', 'Galnoel di kantor Bank SulutGo saat magang']
    },
    {
        role: 'Pemimpin Pengembangan',
        body: ['Saya memimpin 12 kontributor untuk membuat SPARK, asisten percakapan AI untuk UNSRAT IT Community. Sistem menghubungkan aplikasi Next.js dan Flutter dengan backend NestJS dan Socket.IO, serta layanan suara Python melalui gRPC.', 'Saya mengoordinasikan pengembangan web dan seluler serta mengawasi pengumpulan dan analisis data.'],
        alts: ['Presentasi SPARK di panggung TECHOFEST 2024', 'Tim TECHOFEST 2024 di depan latar acara', 'Presentasi fitur percakapan suara SPARK']
    },
    {
        role: 'Pengurus Divisi Machine Learning',
        body: ['Saya menyusun kurikulum machine learning enam bulan dan memimpin lokakarya untuk lebih dari 20 anggota. Saya juga membimbing lima anggota junior dalam proyek chatbot dari perencanaan hingga implementasi.'],
        alts: ['Anggota divisi machine learning UNSRAT IT Community saat lokakarya Python']
    }
];

export const awards = [
    ['Juara kedua', 'Hackathon nasional', 'YUDHA mencapai 80 besar capstone dan 10 besar presentasi di Jakarta. Tim meraih juara kedua dalam tantangan penciptaan lapangan kerja.', 'Tim YUDHA bersama trofi PIDI DIGDAYA x HACKATHON 2026'],
    ['Juara ketiga · Penghargaan setara perunggu', 'PKM-KC1 · Kategori Presentasi', 'Tim NEUROKIT menguji prototipe dalam program PKM yang didanai, lalu menerima penghargaan setara perunggu pada kategori presentasi.', 'Tim NEUROKIT merayakan penghargaan perunggu PIMNAS 38'],
    ['Most Inspiring Team', 'Divisi Data Mining', 'Tim mengerjakan klasifikasi kesegaran tuna pada penyisihan. Di final, kami mengklasifikasikan 20 aksara Jawa dalam lima jam dan mempresentasikan pendekatan kami kepada juri.', 'Tim GEMASTIK XVIII memegang penghargaan Most Inspiring Team'],
    ['Finalis nasional', 'Divisi Data Mining', 'Tim menganalisis pengukuran tubuh 182 lansia dan menyusun tujuh aturan untuk dimensi kursi, pegangan tangga, dan meja layanan.', 'Tim finalis GEMASTIK XVII di acara nasional'],
    ['Peringkat ke-9', 'Jalur 100xDevs', 'Tim CORA menempati peringkat ke-9 dari 482 pengajuan di jalur 100xDevs pada Frontier Hackathon.', 'Tampilan gim multipemain CORA'],
    ['Peringkat ke-11', 'Jalur AI for Education', 'Socratix menempati peringkat ke-11 pada jalur AI for Education. Dokumen yang ditautkan adalah sertifikat partisipasi.', 'Spanduk ASEAN AI Hackathon 2026'],
    ['Juara pertama di UNSRAT', 'Inovasi Teknologi Digital Pendidikan', 'Versi awal Socratix meraih juara pertama dalam seleksi divisi di Universitas Sam Ratulangi.', 'Sertifikat juara pertama seleksi LIDM di Universitas Sam Ratulangi'],
    ['Juara pertama di UNSRAT', 'Pengembangan Perangkat Lunak · Seleksi UNSRAT', 'Tim SEMARA meraih juara pertama pada seleksi internal Universitas Sam Ratulangi.', 'Layar aplikasi SEMARA untuk lansia'],
    ['Juara pertama di UNSRAT', 'Big Data Challenge · Seleksi UNSRAT', 'Saya meraih juara pertama pada seleksi Big Data Challenge di Universitas Sam Ratulangi.', 'Lambang Universitas Sam Ratulangi']
];
