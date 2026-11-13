import { readFileSync } from 'node:fs';
import * as indonesian from './indonesian.mjs';

const profile = readFileSync(new URL('../GALNOEL_MASTER_PROFILE.md', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
export const origin = 'https://galnoel.github.io';
export const portfolio = '/public/assets/portfolio/';
export const asset = file => portfolio + encodeURIComponent(file);
const section = title => profile.split(`\n## ${title}\n`)[1].split(/\n## /)[0];
const records = body => [...body.matchAll(/<a id="([^"]+)"><\/a>\n\n### ([^\n]+)\n([\s\S]*?)(?=\n<a id=|$)/g)]
    .map(([, id, title, text]) => ({ id, title: title.replace(/^\d+\. /, ''), text }));
const fields = text => Object.fromEntries([...text.matchAll(/^\*\*([^*\n]+):\*\* ([^\n]+(?:\n(?!\n|\*|#|- )[^\n]+)*)/gm)]
    .map(([, key, value]) => [key, value.replace(/\s+/g, ' ').trim()]));
const paragraphs = text => text.trim().split(/\n\n+/).filter(line => /^[A-ZI]/.test(line) && !line.startsWith('Additional detail')).map(line => line.replace(/\s+/g, ' '));
const markdownLinks = text => [...text.matchAll(/^\s*- \[([^\n\]]+)\]\(([^)]+)\)([^\n]*)/gm)]
    .map(([, label, href, note]) => ({ label, href: href.startsWith(origin + '/public/') ? href.slice(origin.length) : href, note: note.replace(/^\s*(?:—|Additional description:)\s*/, '').trim() }));
const links = text => markdownLinks(text).filter(link => !link.href.startsWith(portfolio) && !link.label.startsWith('Original portfolio'));
const photos = text => markdownLinks(text).filter(link => link.href.startsWith(portfolio));
const profileTable = Object.fromEntries([...section('Profile and contact').matchAll(/^\| ([^|]+) \| ([^|]+) \|$/gm)].map(([, key, value]) => [key, value]));
const getURL = field => profileTable[field].match(/\]\(([^)]+)\)/)[1].replace(origin + '/public/', '/public/');
const education = fields(section('Education'));
export const person = {
    name: profileTable['Full name'], location: profileTable.Location,
    email: getURL('Email').slice(7), github: getURL('GitHub'), linkedin: getURL('LinkedIn'), resume: getURL('Existing résumé'),
    portrait: asset('me-at-fekdi.jpeg'), school: education.Institution, gpa: education['Cumulative GPA'], years: education['Study period']
};

const featured = new Set(['yudha', 'neurokit', 'lexara', 'fish-freshness', 'cora']);
const canonicalSlugs = { 'legal-ai': 'lexara', gemastik: 'fish-freshness', 'tweet-sentiment': 'tweet-sentiment-tuning' };
const outcomes = {
    yudha: ['Team second place · PIDI DIGDAYA x HACKATHON 2026', 'Tim juara kedua · PIDI DIGDAYA x HACKATHON 2026'],
    neurokit: ['Team third place (bronze-equivalent) · PIMNAS 38', 'Tim juara ketiga (setara perunggu) · PIMNAS 38'],
    lexara: ['1,900+ pages indexed · Page-level citations', '1.900+ halaman terindeks · Rujukan hingga tingkat halaman'],
    'fish-freshness': ['84.3% macro F1 on the tuna validation split', 'Macro F1 84,3% pada data validasi tuna'],
    cora: ['Team 9th of 482 · Frontier Hackathon, 100xDevs Track', 'Tim peringkat ke-9 dari 482 · Frontier Hackathon, jalur 100xDevs']
};
const caseSections = new Set([
    'Problem', 'My role', 'Approach', 'Key decision', 'Result', 'Project scope', 'Retrieval checks', 'On-chain integration',
    'Recognition', 'Model interpretation', 'Service integration', 'Recognition shown in project footer', 'Voice workflow', 'Result or context'
]);
const localizedDates = {
    JAN: 'Jan', FEB: 'Feb', MAR: 'Mar', APR: 'Apr', MAY: 'Mei', JUN: 'Jun', JUL: 'Jul',
    AUG: 'Agu', SEP: 'Sep', OCT: 'Okt', NOV: 'Nov', DEC: 'Des'
};
export const date = (value, lang) => value && (lang === 'id'
    ? value.replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi, month => localizedDates[month.toUpperCase()])
    : value.replace(/\b[A-Z]{3}\b/g, month => month[0] + month.slice(1).toLowerCase()));

const casePhotos = {
    yudha: asset('site-yudha.webp'), cora: asset('cora-gameplay.webp'),
    lexara: asset('site-lexara.webp'), neurokit: asset('a16z-speedrun.jpg')
};
const featuredFocus = { lexara: 'AI/ML engineering', neurokit: 'Connected devices', 'fish-freshness': 'Data science' };
export const projects = records(section('Projects')).map(({ id, title, text }) => {
    const legacySlug = id.slice('project-'.length);
    const slug = canonicalSlugs[legacySlug] || legacySlug;
    const translation = indonesian.projects[slug];
    const meta = fields(text);
    const [name, subject] = title.split(/ — |: /);
    const images = photos(text);
    let intro = paragraphs(text)[0];
    const sections = Object.entries(meta).filter(([key]) => caseSections.has(key));
    if (slug === 'lexara') sections.find(([key]) => key === 'My role')[1] =
        'I completed this Dicoding course project independently, building the model-training pipeline, hybrid retrieval system, and responsive research interface.';
    if (slug === 'warong-warem') sections.find(([key]) => key === 'My role')[1] = 'Backend developer.';
    if (['mlops', 'diffusion', 'employee-attrition'].includes(slug)) intro += ' I completed this Dicoding course project independently.';
    if (slug === 'anthropometric') sections.unshift(['Approach', 'Our team analyzed body measurements from 182 older adults in Indonesia. The seven rules informed recommendations for chairs, stair handrails, and service counters. We advanced as one of 20 national Data Mining finalist teams.']);
    const en = { name, subject, focus: featuredFocus[slug] || meta.Focus, intro, summary: meta['Card summary'] || intro, sections, images, outcome: outcomes[slug]?.[0] };
    const idCopy = {
        name: translation.name || name, subject: translation.title, focus: translation.focus, intro: translation.intro,
        summary: translation.summary || translation.intro, sections: Object.entries(translation.sections || {}),
        images: images.map((photo, index) => ({ ...photo, label: translation.alts[index], note: translation.captions?.[index] || '' })), outcome: outcomes[slug]?.[1]
    };
    return {
        slug, id, en, idCopy, featured: featured.has(slug),
        date: meta.Period.startsWith('Not specified') ? '' : meta.Period.split(' — ')[0],
        cover: casePhotos[slug] || images[0]?.href, tech: (meta['Technology stack and methods'] || meta['Technology stack'] || '').split(/; | · /).filter(Boolean),
        links: links(text), course: meta['Course association']?.match(/#(cert-[\w-]+)/)?.[1]
    };
});

function projectEndMonth(period) {
    const end = period.match(/(?:([A-Z]{3}) )?(\d{4})$/);
    if (!end) return 0;
    const [, month, year] = end;
    return Number(year) * 12 + (month ? Object.keys(localizedDates).indexOf(month) + 1 : 12);
}

export const selectedProjects = projects.filter(project => project.featured)
    .sort((first, second) => projectEndMonth(second.date) - projectEndMonth(first.date));

const experienceSummaries = [
    ['I deployed a private RAG assistant on bank servers with Ollama, n8n, and Supabase pgvector so staff could search internal information.', 'Saya menerapkan asisten RAG di server bank dengan Ollama, n8n, dan Supabase pgvector agar staf bisa menelusuri informasi internal.'],
    ['I led 12 contributors building SPARK, a web and mobile assistant with real-time chat and Indonesian voice services.', 'Saya memimpin 12 kontributor membangun SPARK, asisten web dan seluler dengan chat real-time dan layanan suara berbahasa Indonesia.'],
    ['I designed a six-month machine learning curriculum, taught workshops for 20+ members, and mentored five juniors on a chatbot project.', 'Saya menyusun kurikulum machine learning enam bulan, mengajar lebih dari 20 anggota, dan membimbing lima anggota junior dalam proyek chatbot.']
];
export const experience = records(section('Experience and leadership')).map(({ id, title, text }, index) => {
    const [role, employer = 'UNSRAT IT Community'] = title.split(' — ');
    return { id, role, employer, date: fields(text).Period, links: links(text), photos: photos(text),
        logo: employer === 'PT. Bank SulutGo' ? 'organization-bank-sulutgo.jpg' : 'organization-unity.webp', summary: experienceSummaries[index],
        body: paragraphs(text).filter(line => line !== 'RAG Systems' && line !== 'SPARK · TECHOFEST 2024'), idCopy: indonesian.experience[index] };
});

const awardSummaries = [
    'YUDHA advanced to the Top 80 capstone and the Top 10 in-person pitch in Jakarta. The team placed second.',
    'The NEUROKIT team tested the funded PKM prototype and earned a bronze-equivalent award for its national presentation.',
    'Our team classified tuna freshness in qualifying. At the final, we classified 20 handwritten Javanese characters in five hours and presented our approach to the jury.',
    'Our team analyzed body measurements from 182 older adults and developed seven rules to inform the dimensions of chairs, handrails, and service counters.',
    'Team CORA placed 9th among 482 submissions in the 100xDevs track at Frontier Hackathon.',
    'Socratix placed 11th in the AI for Education track. The linked certificate records participation.',
    'The early Socratix project placed first in the division at Universitas Sam Ratulangi.',
    'Team SEMARA placed first in the internal selection at Universitas Sam Ratulangi.',
    'I placed first in the Big Data Challenge selection at Universitas Sam Ratulangi.'
];
const additionalAwardAlts = {
    'recognition-1': ['Peserta berkumpul di bawah spanduk panggung PIDI Digitalent Expo 2026'],
    'recognition-2': ['Tim NEUROKIT mempresentasikan proyek di PIMNAS 38', 'Peserta berkumpul di ruang presentasi PKM-KC1'],
    'recognition-3': ['Tim PEKZPEKZ mempresentasikan perbandingan model kepada juri GEMASTIK']
};
const issuerLogos = {
    'Bank Indonesia': 'achievement-bank-indonesia.png',
    'Ministry of Higher Education, Science and Technology of Indonesia (Kemendiktisaintek)': 'achievement-kemdiktisaintek.jpg',
    Colosseum: 'achievement-colosseum.png',
    'P2A — Passage to ASEAN': 'achievement-p2a.jpg',
    'Universitas Sam Ratulangi': 'organization-unsrat.png'
};
export const awards = records(section('Recognition and competitions')).map(({ id, title, text }, index) => {
    const meta = fields(text);
    const [event, result] = title.split(' — ');
    const [resultId, trackId, summaryId, photoAltId] = indonesian.awards[index];
    const records = links(text);
    if (id === 'recognition-3') records.push({ label: 'Final-round project', href: '#project-aksara' });
    if (id === 'recognition-9') {
        const record = records.find(link => link.label === 'Competition record');
        record.href = record.href.replace('pusatprestasinasional.kemdikbud.go.id', 'pusatprestasinasional.kemendikdasmen.go.id');
        record.label = 'National competition record';
    }
    const issuer = meta['Issuer / organization listed'];
    return { id, event, result, resultId,
        date: meta.Date, level: meta.Level.toLowerCase(), track: meta['Division or track'],
        trackId, issuer, logo: issuerLogos[issuer], summary: awardSummaries[index], summaryId,
        photos: photos(text), altsId: [photoAltId, ...(additionalAwardAlts[id] || [])], links: records };
});

const courseScopes = {
    'cert-data-science': ['Business dashboards, customer segmentation, credit scoring, PySpark, and cloud workflows.', 'Dasbor bisnis, segmentasi pelanggan, penilaian risiko kredit, PySpark, dan alur kerja cloud.'],
    'cert-digdaya-practitioner': ['RAG implementation, startup development, and financial product design.', 'Penerapan RAG, pengembangan startup, dan perancangan produk keuangan.'],
    'cert-generative-ai': ['Text, image, and audio generation with open-weight models, Stable Diffusion, and Bark.', 'Pembuatan teks, gambar, dan audio dengan model berbobot terbuka, Stable Diffusion, dan Bark.'],
    'cert-mlops': ['Experiment tracking, automated retraining, model serving, and monitoring with MLflow, GitHub, and Docker.', 'Pelacakan eksperimen, pelatihan ulang otomatis, penyajian model, dan pemantauan dengan MLflow, GitHub, dan Docker.'],
    'cert-llm': ['RAG, fine-tuning, AI agents, and deployment. The final project used a fine-tuned LLM in a RAG system.', 'RAG, fine-tuning, agen AI, dan penerapan. Proyek akhir menggunakan LLM yang telah disetel ulang dalam sistem RAG.'],
    'cert-digdaya-essential': ['User-centered problem solving, project management, startup development, and practical AI.', 'Pemecahan masalah berpusat pada pengguna, manajemen proyek, pengembangan startup, dan penerapan AI.'],
    'cert-sololearn': ['Project planning with AI through theoretical and practical exercises.', 'Perencanaan proyek dengan AI melalui latihan teori dan praktik.'],
    'cert-azure-preparation': ['Preparation in Azure AI fundamentals through the elevAIte program.', 'Persiapan dasar-dasar Azure AI melalui program elevAIte.']
};
const providerLogos = {
    'Dicoding Indonesia': ['provider-dicoding.png'],
    'Bank Indonesia / LPPI': ['provider-bank-indonesia.png', 'provider-lppi.png'],
    Sololearn: ['provider-sololearn.ico'],
    'elevAIte / Microsoft': ['provider-microsoft.png']
};
export const credentials = records(section('Certificates and training')).filter(record => record.id.startsWith('cert-')).map(({ id, title, text }) => {
    const meta = fields(text);
    const provider = meta.Provider.replace(' (Dicoding in the portfolio and certificate).', '');
    return { id, title, provider, logos: providerLogos[provider], date: meta.Completed,
        duration: meta.Duration, scope: courseScopes[id], links: links(text), project: meta['My final project']?.match(/#(project-[\w-]+)/)?.[1] ||
            (id.startsWith('cert-digdaya') ? 'project-yudha' : '') };
});

export const language = {
    en: {
        work: 'Work', experience: 'Experience', recognition: 'Recognition', about: 'About', contact: 'Contact',
        description: 'Galnoel Peter Rindengan, an Informatics Engineering graduate working across AI/ML engineering, data science, backend engineering, and software engineering.',
        intro: 'I’m a recent Informatics Engineering graduate. My work spans real-time applications, applied research, and the systems that put models to work.',
        disciplines: ['AI/ML engineering', 'Data science', 'Backend engineering', 'Software engineering'],
        contactAction: 'Contact me', resume: 'Résumé (PDF)', selected: 'Selected projects', case: 'Read case study',
        workIntro: 'Applications and research across AI, data science, and software engineering.',
        experienceIntro: 'Industry experience, community development, and machine learning mentoring.',
        archive: 'All projects', archiveCount: 'more projects', menu: 'Menu', skip: 'Skip to content',
        theme: 'Switch to dark mode', light: 'Switch to light mode', nav: 'Primary navigation',
        bio: 'I’m a fresh graduate in Informatics Engineering from Universitas Sam Ratulangi, based in Manado, Indonesia.',
        capabilities: ['Language models and retrieval', 'Model evaluation and interpretation', 'Real-time services and state', 'Applications and connected devices'],
        education: 'Education', degree: 'Bachelor of Computer Science in Informatics Engineering',
        certificates: 'Certificates', certificate: 'Course completion', moreCredentials: 'View all eight certificates',
        prep: 'Preparation course', morePhotos: 'More photos', experienceDetails: 'Role details and photos', otherResults: 'International and university results',
        national: 'National', international: 'International', university: 'University',
        hire: 'Let’s talk about working together.', contactText: 'I’m a fresh graduate and welcome conversations about engineering and data roles.',
        copy: 'Copy email', copied: 'Email copied.', copyFailed: 'Select the email address to copy it.', email: 'Email me',
        close: 'Close case study', back: 'Back to work', evidence: 'Project evidence',
        links: 'Project links', stack: 'Tools and methods', missing: 'Page not found', missingText: 'Return to the portfolio to find projects, experience, and contact details.',
        portfolio: 'Engineering Portfolio', openProject: 'Open project', profile: 'Portfolio',
        labels: {}
    },
    id: {
        work: 'Karya', experience: 'Pengalaman', recognition: 'Penghargaan', about: 'Tentang saya', contact: 'Kontak',
        description: 'Galnoel Peter Rindengan, lulusan baru Teknik Informatika dengan karya di bidang rekayasa AI/ML, sains data, rekayasa backend, dan rekayasa perangkat lunak.',
        intro: 'Saya lulusan baru Teknik Informatika. Karya saya mencakup aplikasi real-time, riset terapan, dan sistem untuk menjalankan model.',
        disciplines: ['Rekayasa AI/ML', 'Sains data', 'Rekayasa backend', 'Rekayasa perangkat lunak'],
        contactAction: 'Hubungi saya', resume: 'CV (PDF)', selected: 'Proyek pilihan', case: 'Baca studi kasus',
        workIntro: 'Aplikasi dan riset di bidang AI, sains data, dan rekayasa perangkat lunak.',
        experienceIntro: 'Pengalaman di industri, pengembangan proyek komunitas, dan pendampingan machine learning.',
        archive: 'Semua proyek', archiveCount: 'proyek lainnya', menu: 'Menu', skip: 'Lewati ke konten',
        theme: 'Aktifkan mode gelap', light: 'Aktifkan mode terang', nav: 'Navigasi utama',
        bio: 'Saya lulusan baru Teknik Informatika dari Universitas Sam Ratulangi dan berdomisili di Manado, Indonesia.',
        capabilities: ['Model bahasa dan pencarian dokumen', 'Evaluasi dan interpretasi model', 'Layanan real-time dan pengelolaan status', 'Aplikasi dan perangkat terhubung'],
        education: 'Pendidikan', degree: 'Sarjana Komputer (S.Kom), Teknik Informatika',
        certificates: 'Sertifikat', certificate: 'Penyelesaian kursus', moreCredentials: 'Lihat kedelapan sertifikat',
        prep: 'Kursus persiapan', morePhotos: 'Foto lainnya', experienceDetails: 'Rincian peran dan foto', otherResults: 'Hasil tingkat internasional dan universitas',
        national: 'Nasional', international: 'Internasional', university: 'Universitas',
        hire: 'Mari bicara tentang peluang kerja.', contactText: 'Sebagai lulusan baru, saya terbuka untuk berdiskusi tentang peluang kerja di bidang rekayasa dan data.',
        copy: 'Salin email', copied: 'Alamat email disalin.', copyFailed: 'Pilih alamat email untuk menyalinnya.', email: 'Kirim email',
        close: 'Tutup studi kasus', back: 'Kembali ke karya', evidence: 'Bukti proyek',
        links: 'Tautan proyek', stack: 'Teknologi dan metode', missing: 'Halaman tidak ditemukan', missingText: 'Kembali ke portofolio untuk menemukan proyek, pengalaman, dan informasi kontak.',
        portfolio: 'Portofolio Teknik', openProject: 'Buka proyek', profile: 'Portofolio',
        labels: {
            Problem: 'Masalah', 'My role': 'Peran saya', Approach: 'Pendekatan', 'Key decision': 'Keputusan teknis',
            Result: 'Hasil', 'Project scope': 'Cakupan proyek', 'Retrieval checks': 'Pemeriksaan hasil pencarian',
            'On-chain integration': 'Integrasi blockchain', Recognition: 'Penghargaan', 'Model interpretation': 'Interpretasi model',
            'Service integration': 'Integrasi layanan', 'Voice workflow': 'Alur pemrosesan suara', 'Result or context': 'Hasil atau konteks',
            'Web prototype': 'Prototipe web', 'Landing page': 'Situs proyek', 'Source code': 'Kode sumber',
            'Live demo': 'Demo', Model: 'Model', 'Live website': 'Situs proyek', 'Project video': 'Video proyek',
            'Technical roadmap': 'Peta jalan teknis', 'Speech service source': 'Kode sumber layanan suara',
            'Project showcase': 'Video proyek', Notebook: 'Notebook', 'View SPARK project': 'Lihat proyek SPARK',
            'Related project': 'Proyek terkait', 'Final-round project': 'Proyek babak final', Prototype: 'Prototipe',
            Site: 'Situs proyek', Source: 'Kode sumber', Certificate: 'Sertifikat', Winner: 'Bukti penghargaan',
            Finalist: 'Bukti finalis', Participation: 'Bukti partisipasi', Results: 'Hasil', 'National competition record': 'Dokumen kompetisi nasional',
            'Certificate PDF': 'Sertifikat (PDF)', 'Verify credential': 'Verifikasi sertifikat', Curriculum: 'Kurikulum',
            'Recognition shown in project footer': 'Penghargaan'
        }
    }
};
