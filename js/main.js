// ===== DATA =====
const SITE_DATA = {
  comparison: [
    { name:'COF-COAL', nameAr:'كوف كوال', cost:90, costLabel:'Économique (déchets valorisés)', sustainability:95, sustainabilityLabel:'Très élevée', pollution:5, pollutionLabel:'Négligeable', co2Emissions:10, co2Label:'Neutre (bilan carbone)', healthRisk:5, healthLabel:'Aucun risque chimique', production:85, productionLabel:'Locale et circulaire', efficiency:88, efficiencyLabel:'Élevée (combustion longue)', availability:75, availabilityLabel:'Production locale', environmentalImpact:98, environmentalLabel:'Très positif', icon:'☕', color:'#2d6a4f' },
    { name:'Charbon Minéral', nameAr:'الفحم المعدني', cost:30, costLabel:'Très coûteux (import)', sustainability:10, sustainabilityLabel:'Très faible', pollution:95, pollutionLabel:'Très élevée', co2Emissions:98, co2Label:'Très élevée', healthRisk:92, healthLabel:'Très dangereux', production:15, productionLabel:'Importé', efficiency:70, efficiencyLabel:'Moyenne', availability:40, availabilityLabel:'Disponible', environmentalImpact:5, environmentalLabel:'Très négatif', icon:'⛏️', color:'#6b7280' },
    { name:'Charbon de Bois', nameAr:'فحم الخشب', cost:55, costLabel:'Coût modéré', sustainability:30, sustainabilityLabel:'Faible (déforestation)', pollution:75, pollutionLabel:'Élevée', co2Emissions:82, co2Label:'Élevée', healthRisk:70, healthLabel:'Risques élevés', production:55, productionLabel:'Traditionnelle', efficiency:60, efficiencyLabel:'Moyenne', availability:85, availabilityLabel:'Largement disponible', environmentalImpact:15, environmentalLabel:'Négatif', icon:'🪵', color:'#a67c44' },
    { name:'Briquettes Artificielles', nameAr:'القوالب الاصطناعية', cost:45, costLabel:'Coût élevé', sustainability:40, sustainabilityLabel:'Moyenne', pollution:60, pollutionLabel:'Modérée (chimique)', co2Emissions:55, co2Label:'Modérée', healthRisk:55, healthLabel:'Produits chimiques', production:60, productionLabel:'Industrielle', efficiency:72, efficiencyLabel:'Moyenne à élevée', availability:60, availabilityLabel:'Limitée', environmentalImpact:30, environmentalLabel:'Négatif', icon:'🧱', color:'#f59e0b' }
  ],
  stats: [
    { icon:'☕', value:'26 000', suffix:'tonnes/an', label:'Café Consommé', desc:'La Tunisie consomme 26 000 tonnes de café chaque année' },
    { icon:'♻️', value:'5 000', suffix:'tonnes/semaine', label:'Déchets de Café', desc:'5 000 tonnes de déchets de café jetées chaque semaine' },
    { icon:'💰', value:'223M', suffix:'$', label:'Importation Charbon', desc:'Dépensés chaque année pour importer du charbon polluant' },
    { icon:'🌱', value:'1 arbre', suffix:'/100 packs', label:'Arbres Plantés', desc:'1 arbre planté pour chaque 100 packs vendus' }
  ],
  environmental: [
    { category:'Émissions CO₂', biochar:10, charbonMineral:98, charbonBois:82, briquettes:60 },
    { category:'Déforestation', biochar:0, charbonMineral:5, charbonBois:90, briquettes:30 },
    { category:'Produits Chimiques', biochar:0, charbonMineral:30, charbonBois:5, briquettes:85 },
    { category:'Gestion Déchets', biochar:98, charbonMineral:20, charbonBois:30, briquettes:45 },
    { category:'Économie Circulaire', biochar:100, charbonMineral:5, charbonBois:15, briquettes:25 },
    { category:'Biodiversité', biochar:95, charbonMineral:10, charbonBois:15, briquettes:35 }
  ],
  health: [
    { condition:'Émanations Toxiques', biochar:'Aucune (100% naturel)', mineralRisk:'CO, SOx, métaux lourds', boisRisk:'CO, HAP, particules', briquettesRisk:'CO, COV, liants chimiques', icon:'🌿' },
    { condition:'Risques Respiratoires', biochar:'Nuls (zéro fumée nocive)', mineralRisk:'Très élevés', boisRisk:'Élevés', briquettesRisk:'Modérés', icon:'🫁' },
    { condition:'Contact Cutané', biochar:'Aucun risque', mineralRisk:'Irritant', boisRisk:'Irritant', briquettesRisk:'Allergènes possibles', icon:'🧴' },
    { condition:'Qualité de l\'Air Intérieur', biochar:'Excellente', mineralRisk:'Mauvaise', boisRisk:'Médiocre', briquettesRisk:'Moyenne', icon:'💨' },
    { condition:'Sécurité Alimentaire', biochar:'Sûr (certifié alimentaire)', mineralRisk:'Non adapté', boisRisk:'Non adapté', briquettesRisk:'Risques chimiques', icon:'🍽️' }
  ],
  economic: [
    { indicator:'Coût par Pack (DT)', biochar:'Économique et compétitif', mineralRisk:'Très cher (import)', charbonBois:'Cher (déforestation)', briquettes:'Cher (chimique)', icon:'💰' },
    { indicator:'Importation', biochar:'Zéro (production locale)', mineralRisk:'100% importé', charbonBois:'Partiellement local', briquettes:'Partiellement local', icon:'🚢' },
    { indicator:'Création d\'Emplois', biochar:'50+ emplois locaux', mineralRisk:'0 emploi local', charbonBois:'Emplois informels', briquettes:'Emplois industriels', icon:'👥' },
    { indicator:'Économies pour le Pays', biochar:'Réduction importation', mineralRisk:'223M$/an perdus', charbonBois:'Coût écologique', briquettes:'Coût élevé', icon:'📊' },
    { indicator:'Retour sur Investissement', biochar:'ROI : 1 an et 3 mois', mineralRisk:'ROI négatif', charbonBois:'ROI moyen', briquettes:'ROI long terme', icon:'📈' }
  ],
  production: [
    { step:1, title:'Collecte des Déchets de Café', desc:'Partenariat avec cafés, restaurants et hôtels pour collecter les déchets de café. Plus de 50 emplois créés dans la collecte.', icon:'☕', temp:'Ambiante', duration:'Collecte quotidienne' },
    { step:2, title:'Séchage Industriel', desc:'Les déchets de café sont séchés dans des fours industriels à basse température pour atteindre le taux d\'humidité optimal.', icon:'🌡️', temp:'80-100°C', duration:'4-6 heures' },
    { step:3, title:'Compression et Moulage', desc:'Le marc de café séché est compressé sous haute pression dans des moules spécifiques, sans ajout de liants chimiques.', icon:'⚙️', temp:'Ambiante', duration:'2-3 heures' },
    { step:4, title:'Contrôle Qualité par IA', desc:'Un système de vision par IA inspecte chaque briquette pour garantir une qualité uniforme (densité, taille, humidité).', icon:'🤖', temp:'Ambiante', duration:'Temps réel' },
    { step:5, title:'Emballage Plantable', desc:'Emballage biodégradable en carton recyclé infusé de graines, imprimé avec des encres végétales. Zéro déchet plastique.', icon:'🌱', temp:'Ambiante', duration:'Conditionnement continu' }
  ],
  faq: [
    { q:'Qu\'est-ce que COF-COAL ?', a:'COF-COAL est un charbon écologique fabriqué à partir de déchets de café. C\'est une alternative durable, sans produits chimiques, au charbon minéral importé et au charbon de bois.', cat:'Définition' },
    { q:'Comment est-il fabriqué ?', a:'Les déchets de café sont collectés auprès des cafés et restaurants, séchés, compressés sous haute pression sans liants chimiques, puis contrôlés par IA. Le tout est emballé dans un carton biodégradable plantable.', cat:'Production' },
    { q:'Est-il vraiment écologique ?', a:'Oui ! Il valorise des déchets, évite la déforestation, réduit les émissions de CO₂, ne contient aucun produit chimique et son emballage est biodégradable et plantable. Chaque achat contribue à planter des arbres.', cat:'Environnement' },
    { q:'Quels sont les avantages économiques ?', a:'Produit localement, COF-COAL réduit la dépendance aux importations (223M$/an). Il crée 50+ emplois et offre un retour sur investissement en seulement 1 an et 3 mois.', cat:'Économie' },
    { q:'Où acheter COF-COAL ?', a:'Disponible dans les grandes surfaces (Carrefour, Monoprix, rayon BIO&ECO), dans les boutiques écologiques, et en ligne via notre chatbot IA 24/7.', cat:'Vente' },
    { q:'Est-ce que ça pollue moins à brûler ?', a:'Oui, la combustion de COF-COAL émet beaucoup moins de particules fines, de CO et de composés toxiques que le charbon traditionnel, grâce à sa composition naturelle et son processus de fabrication contrôlé.', cat:'Santé' },
    { q:'Qu\'est-ce que l\'emballage plantable ?', a:'Notre emballage est en carton recyclé contenant des graines. Après usage, vous pouvez le planter dans la terre pour faire pousser des plantes. Zéro déchet, 100% circulaire !', cat:'Produit' },
    { q:'Comment l\'IA est-elle utilisée ?', a:'Notre système de contrôle qualité par intelligence artificielle inspecte chaque briquette pour vérifier la densité, la taille et l\'humidité, garantissant une qualité premium constante.', cat:'Technologie' },
    { q:'Quels sont vos engagements sociaux ?', a:'Nous plantons 1 arbre pour chaque 100 packs vendus, organisons des campagnes de sensibilisation dans les écoles et des événements verts trimestriels avec nos clients.', cat:'Social' },
    { q:'Quels sont vos projets futurs ?', a:'Nous prévoyons d\'étendre notre technologie à d\'autres déchets : olive, bois, coques de noix et thé, pour créer toute une gamme de charbons écologiques tunisiens.', cat:'Vision' }
  ],
  conclusions: [
    { icon:'☕', title:'Solution Écologique Innovante', content:'COF-COAL transforme 26 000 tonnes de déchets de café en énergie propre. Zéro déforestation, zéro produit chimique, zéro importation.' },
    { icon:'📈', title:'Viabilité Économique', content:'ROI en 15 mois, 50+ emplois créés, réduction de la facture d\'importation de 223M$. Un modèle économique durable et rentable.' },
    { icon:'🌍', title:'Impact ODD (ONU)', content:'COF-COAL contribue à 8 Objectifs de Développement Durable : énergie propre, action climatique, vie terrestre, consommation responsable, et plus.' }
  ],
  store: [
    { name:'Charbon Chicha', weight:'1 kg', price:'8,50 DT', pricePerKg:'8,50 DT/kg', autonomy:'~6h', packaging:'Sachet kraft', badge:'', icon:'💨', desc:'Charbon naturel pour chicha, sans odeur ni étincelles', features:['100% marc de café recyclé','Sans odeur, sans fumée','Combustion longue et homogène'] },
    { name:'Charbon Cheminée', weight:'1 kg', price:'7,50 DT', pricePerKg:'7,50 DT/kg', autonomy:'~5h', packaging:'Sachet kraft', badge:'', icon:'🔥', desc:'Charbon écologique pour cheminée et chauffage', features:['100% marc de café recyclé','Haute puissance calorifique','Faible taux de cendres'] },
    { name:'Charbon BBQ', weight:'1 kg', price:'8 DT', pricePerKg:'8 DT/kg', autonomy:'~5h', packaging:'Sachet kraft', badge:'', icon:'🍖', desc:'Charbon grill pour barbecue et grillades', features:['100% marc de café recyclé','Chauffe rapide et uniforme','Sans additifs ni chimie'] }
  ],
  recommendations: [
    { icon:'🎯', title:'Adopter COF-COAL', content:'Remplacez le charbon traditionnel par notre alternative écologique, performante et économique. Même qualité, impact positif.' },
    { icon:'♻️', title:'Rejoindre la Collecte', content:'Cafés et restaurants : participez à notre programme de collecte de déchets de café et contribuez à l\'économie circulaire.' },
    { icon:'📢', title:'Sensibiliser', content:'Participez à nos campagnes de sensibilisation dans les écoles et nos événements verts trimestriels. Ensemble pour un Tunisie plus propre.' },
    { icon:'🌱', title:'Planter avec Nous', content:'Chaque achat compte. 1 arbre planté pour 100 packs vendus. Rejoignez notre programme de reforestation.' },
    { icon:'🤝', title:'Devenir Partenaire', content:'Distributeurs, grandes surfaces, institutions : contactez-nous pour rejoindre le réseau COF-COAL.' }
  ]
};

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initScrollTop();
  initAnimations();
  initComparisonSort();
  initAccordions();
  initBars();
});

// ===== HEADER =====
function initHeader() {
  const header = document.querySelector('header');
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  const currentPath = window.location.pathname;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
  });

  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === './' + currentPath.split('/').pop() || (currentPath.endsWith(href))) {
      link.classList.add('active');
    }
  });

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function() {
      navMobile.classList.toggle('open');
    });
    document.querySelectorAll('.nav-mobile a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMobile.classList.remove('open');
      });
    });
  }
}

// ===== SCROLL TOP =====
function initScrollTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) { btn.classList.add('visible'); }
    else { btn.classList.remove('visible'); }
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ANIMATIONS =====
function initAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
  });
}

// ===== COMPARISON SORT =====
function initComparisonSort() {
  var select = document.getElementById('sort-select');
  if (!select) return;
  select.addEventListener('change', function() {
    var criteria = this.value;
    var items = Array.from(document.querySelectorAll('.compare-item'));
    items.sort(function(a, b) {
      var scoreA = parseFloat(a.dataset[criteria]) || 0;
      var scoreB = parseFloat(b.dataset[criteria]) || 0;
      return scoreB - scoreA;
    });
    var container = document.getElementById('comparison-list');
    items.forEach(function(item) { container.appendChild(item); });
    document.querySelector('.comparison-result').textContent = 'Meilleur choix : ' + items[0].querySelector('h3').textContent;
  });
}

// ===== ACCORDIONS =====
function initAccordions() {
  document.querySelectorAll('.accordion-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var content = this.nextElementSibling;
      var isOpen = content.classList.contains('open');
      document.querySelectorAll('.accordion-content.open').forEach(function(c) {
        c.classList.remove('open');
        c.previousElementSibling.classList.remove('active');
      });
      if (!isOpen) {
        content.classList.add('open');
        this.classList.add('active');
      }
    });
  });
}

// ===== ANIMATED BARS =====
function initBars() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        bar.style.width = bar.dataset.width + '%';
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.bar-fill[data-width]').forEach(function(el) {
    observer.observe(el);
  });
}

// ===== LOAD PAGE DATA =====
function loadComparisonData() {
  var container = document.getElementById('comparison-list');
  if (!container) return;
  SITE_DATA.comparison.forEach(function(item, i) {
    var el = document.createElement('div');
    el.className = 'card compare-item animate-on-scroll';
    el.dataset.efficiency = item.efficiency;
    el.dataset.cost = item.cost;
    el.dataset.sustainability = item.sustainability;
    el.dataset.pollution = item.pollution;
    el.innerHTML = '<div style="padding:1.5rem"><div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem"><span style="font-size:2.5rem">' + item.icon + '</span><div><h3 style="font-weight:700;margin-bottom:0.25rem">' + item.name + '</h3><span class="badge" style="background:' + item.color + '20;color:' + item.color + '">Note globale: ' + Math.round((item.efficiency + item.sustainability + (100-item.pollution) + (100-item.co2Emissions) + (100-item.healthRisk) + item.production + item.availability + item.environmentalImpact) / 8) + '%</span></div></div>' +
      '<div style="margin-top:1rem"><div class="compare-row"><span class="label">Efficacité</span><div class="bar"><div class="bar-fill" style="width:0%;background:' + item.color + '" data-width="' + item.efficiency + '"></div></div></div>' +
      '<div class="compare-row"><span class="label">Coût</span><div class="bar"><div class="bar-fill" style="width:0%;background:' + item.color + '" data-width="' + item.cost + '"></div></div></div>' +
      '<div class="compare-row"><span class="label">Durabilité</span><div class="bar"><div class="bar-fill" style="width:0%;background:' + item.color + '" data-width="' + item.sustainability + '"></div></div></div>' +
      '<div class="compare-row"><span class="label">Disponibilité</span><div class="bar"><div class="bar-fill" style="width:0%;background:' + item.color + '" data-width="' + item.availability + '"></div></div></div></div></div>';
    container.appendChild(el);
  });
  initBars();
  initAnimations();
}

// ===== CHATBOT INTELLIGENT =====
var CHATBOT_KNOWLEDGE = [];
var CHATBOT_LAST_TOPIC = null;

function buildKnowledge() {
  SITE_DATA.faq.forEach(function(f) { CHATBOT_KNOWLEDGE.push({ q: f.q, a: f.a, cat: f.cat, weight: 3 }); });
  SITE_DATA.production.forEach(function(p) { CHATBOT_KNOWLEDGE.push({ q: p.title, a: p.desc + ' (Temp: ' + p.temp + ', Durée: ' + p.duration + ')', cat:'Production', weight:2 }); });
  SITE_DATA.stats.forEach(function(s) { CHATBOT_KNOWLEDGE.push({ q: s.label, a: s.label + ' : ' + s.value + ' ' + s.suffix + '. ' + s.desc, cat:'Chiffres', weight:1 }); });
  SITE_DATA.comparison.forEach(function(c) { CHATBOT_KNOWLEDGE.push({ q: c.name + ' charbon', a: c.name + ' : Note globale ' + Math.round((c.efficiency+c.sustainability+(100-c.pollution)+(100-c.co2Emissions)+(100-c.healthRisk)+c.production+c.availability+c.environmentalImpact)/8) + '%. ' + c.costLabel + ', ' + c.sustainabilityLabel + '.', cat:'Comparaison', weight:2 }); });
  SITE_DATA.environmental.forEach(function(e) { CHATBOT_KNOWLEDGE.push({ q: e.category + ' environnement', a: e.category + ' : COF-COAL ' + e.biochar + '%, Charbon Minéral ' + e.charbonMineral + '%, Charbon Bois ' + e.charbonBois + '%, Briquettes ' + e.briquettes + '%.', cat:'Environnement', weight:1 }); });
  SITE_DATA.health.forEach(function(h) { CHATBOT_KNOWLEDGE.push({ q: h.condition + ' sante', a: h.condition + ' : COF-COAL : ' + h.biochar + '. Charbon minéral : ' + h.mineralRisk + '. Charbon bois : ' + h.boisRisk + '. Briquettes : ' + h.briquettesRisk + '.', cat:'Santé', weight:1 }); });
  SITE_DATA.economic.forEach(function(e) { CHATBOT_KNOWLEDGE.push({ q: e.indicator + ' economie', a: e.indicator + ' : COF-COAL : ' + e.biochar + '. Charbon minéral : ' + e.mineralRisk + '. Charbon bois : ' + e.charbonBois + '. Briquettes : ' + e.briquettes + '.', cat:'Économie', weight:1 }); });
  SITE_DATA.conclusions.forEach(function(c) { CHATBOT_KNOWLEDGE.push({ q: c.title + ' conclusion', a: c.content, cat:'Conclusion', weight:2 }); });
  SITE_DATA.recommendations.forEach(function(r) { CHATBOT_KNOWLEDGE.push({ q: r.title + ' recommandation', a: r.content, cat:'Recommandation', weight:2 }); });
  SITE_DATA.store.forEach(function(s) { CHATBOT_KNOWLEDGE.push({ q: s.name + ' pack produit boutique', a: s.name + ' ' + s.weight + ' - ' + s.price + ' (' + s.pricePerKg + '). Autonomie ' + s.autonomy + '. ' + s.packaging + '. ' + s.desc, cat:'Boutique', weight:2 }); });
  addKnowledge([
    { q:'fondatrice cof coal qui fonde', a:'Kohli Rihem est la fondatrice et CEO de COF-COAL. Incubée au CFA Bizerte, elle a identifié le potentiel des déchets de café en Tunisie pour créer une alternative écologique au charbon traditionnel.', cat:'Entreprise', w:3 },
    { q:'presentez vous bonjour salut hello', a:'Bonjour ! Je suis l\'assistant virtuel de COF-COAL, votre startup tunisienne qui transforme les déchets de café en charbon écologique. Posez-moi toutes vos questions !', cat:'Accueil', w:3 },
    { q:'merci merci bonne', a:'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions sur COF-COAL. Belle journée ! ☀️', cat:'Accueil', w:3 },
    { q:'avantage inconvenient charbon', a:'COF-COAL : 100% naturel, zéro chimique, zéro déforestation, bilan CO₂ neutre, emballage plantable. Inconvénients : production encore limitée, disponible principalement en Tunisie, prix légèrement plus élevé que le charbon bois.', cat:'Comparaison', w:2 },
    { q:'comparaison comparer differents', a:'Découvrez notre classement : 1. COF-COAL (☕) 91%, 2. Briquettes (🧱) 55%, 3. Charbon Bois (🪵) 45%, 4. Charbon Minéral (⛏️) 39%. COF-COAL surpasse tous les concurrents en durabilité, santé et impact environnemental.', cat:'Comparaison', w:2 },
    { q:'prix cout tarif pack combien coute produit boutique', a:'🌟 Nos produits COF-COAL :\n• Charbon Chicha → 8,50 DT/kg 💨\n• Charbon Cheminée → 7,50 DT/kg 🔥\n• Charbon BBQ → 8 DT/kg 🍖\n📦 Livraison 24-72h en Tunisie.', cat:'Boutique', w:5 },
    { q:'carrefour monoprix boutique magasin acheter pack', a:'COF-COAL est disponible :\n📍 Carrefour et Monoprix (rayon BIO&ECO)\n📍 Boutiques écologiques partenaires\n📍 En ligne via notre site\n🚚 Livraison 24-72h partout en Tunisie\n🌟 Frais de port offerts dès 50 DT d\'achat !', cat:'Boutique', w:4 },
    { q:'cafe collecte dechets marc partenariat', a:'Nous collectons le marc de café auprès des cafés, restaurants et hôtels partenaires. Chaque tonne de marc devient du charbon écologique. Rejoignez notre programme de collecte !', cat:'Production', w:2 },
    { q:'objectif developpement durable odd onu', a:'COF-COAL contribue à 8 ODD : 7 (Énergie propre), 8 (Travail décent), 9 (Industrie innovation), 11 (Villes durables), 12 (Consommation responsable), 13 (Action climatique), 15 (Vie terrestre), 17 (Partenariats).', cat:'Environnement', w:2 },
    { q:'chiffre donnees statistiques nombre', a:'Chiffres clés COF-COAL : 26 000 t/an de café consommé en Tunisie, 5 000 t/semaine de déchets de café, 223M$ économisés sur l\'importation de charbon, 50+ emplois créés, 1 arbre planté/100 packs, ROI 15 mois.', cat:'Chiffres', w:2 },
    { q:'investissement financement retour', a:'Investissement initial : 40 000 DT. Coûts fixes : 1 400 DT/mois. Coûts variables : 1 440 DT/mois. Chiffre d\'affaires : 5 900 DT/mois. Seuil de rentabilité : 1 500 DT/mois. ROI : 15 mois.', cat:'Économie', w:2 },
    { q:'partenaire institutionnel ministere', a:'Partenaires institutionnels : Ministère de l\'Environnement, ANGed, ANME, APII, APIA, ANETI. Financement : BTS, GIZ, PNUD, UE. Incubation : Labess, Flat6Labs, Wiki Startup.', cat:'Recherche', w:2 },
    { q:'emballage plantable graine carton', a:'Notre emballage est en carton recyclé biodégradable incrusté de graines (basilic, menthe, fleurs). Après usage, plantez-le, arrosez-le, et des plantes pousseront ! Zéro déchet, 100% circulaire.', cat:'Produit', w:3 },
    { q:'equivalent bois olivier the noix biomasse', a:'Notre technologie s\'étend à d\'autres biomasses : grignons d\'olive, sciure de bois, coques de noix et déchets de thé. Chaque filière crée de nouveaux emplois verts.', cat:'Vision', w:2 },
    { q:'bilan carbone co2 neutralite', a:'COF-COAL est neutre en carbone : le CO₂ libéré à la combustion est celui capté par les caféiers. De plus, pas de transport maritime ni de déforestation. Emballage plantable qui capture encore plus de CO₂.', cat:'Environnement', w:2 },
    { q:'marche cible client horeca hotel restaurant', a:'Nos marchés cibles : HORECA (hôtels, restaurants, cafés), familles (chauffage, barbecue), grandes surfaces (Carrefour, Monoprix), boutiques écologiques, industrie (chaudières), collectivités (programmes municipaux).', cat:'Vente', w:2 },
    { q:'bonjour bonsoir salut hello hi coucou hey', a:'Bonjour ! 👋 Je suis l\'assistant virtuel de COF-COAL. Comment puis-je vous aider aujourd\'hui ? Posez-moi une question sur nos produits écologiques !', cat:'Accueil', w:5 },
    { q:'comment allez vous ca va bien et toi', a:'Je vais très bien, merci ! 🤖 Prêt à répondre à toutes vos questions sur COF-COAL. Que puis-je faire pour vous ?', cat:'Accueil', w:5 },
    { q:'merci merci beaucoup thanks merci bien', a:'Avec plaisir ! 😊 N\'hésitez pas à revenir vers moi si vous avez d\'autres questions. Bonne journée !', cat:'Accueil', w:5 },
    { q:'super excellent parfait genial cool nickel top', a:'Ravi que cela vous plaise ! 🌟 Y a-t-il autre chose que vous souhaitez savoir sur COF-COAL ?', cat:'Accueil', w:4 },
    { q:'au revoir bye a plus a bientot adieu bonne journee', a:'Au revoir ! 👋 Merci de votre intérêt pour COF-COAL ! À bientôt pour plus d\'informations sur notre charbon écologique tunisien !', cat:'Accueil', w:5 },
    { q:'ou es tu qui es tu', a:'Je suis l\'assistant virtuel intelligent de COF-COAL 🤖 Je suis là pour vous renseigner sur notre startup qui transforme les déchets de café en charbon écologique. Je connais tous nos produits, nos chiffres et notre impact environnemental !', cat:'Accueil', w:4 },
    { q:'peux tu m aider aide aider', a:'Bien sûr ! Je peux vous renseigner sur :\n1️⃣ Qu\'est-ce que COF-COAL ?\n2️⃣ Nos produits et leurs avantages\n3️⃣ Où acheter\n4️⃣ Notre impact environnemental\n5️⃣ Le processus de fabrication\nQue souhaitez-vous savoir ?', cat:'Accueil', w:4 },
    { q:'quoi de neuf quoi nouveau actualite', a:'COF-COAL est en pleine expansion ! 🚀 Lancement commercial en 2028, nouveaux partenariats avec Carrefour et Monoprix, et développement de notre technologie IA de contrôle qualité. Suivez notre parcours !', cat:'Accueil', w:3 },
    { q:'contact telephone email adresse whatsapp', a:'📞 Contact COF-COAL :\n📧 Email : contact.cofcoal.tn@gmail.com\n💬 WhatsApp : +216 54 119 874\n📍 CFA Bizerte, Tunisie\nNotre équipe vous répond rapidement !', cat:'Vente', w:4 },
    { q:'bizerte localisation siege adresse', a:'COF-COAL est incubé au CFA Bizerte, en Tunisie. C\'est là que notre fondatrice Kohli Rihem a développé le projet et que nous produisons notre charbon écologique.', cat:'Entreprise', w:2 },
    { q:'probleme inconvenient defi difficulte', a:'Le principal défi de COF-COAL est de changer les habitudes des consommateurs tunisiens qui utilisent encore du charbon minéral importé ou du charbon de bois. Notre mission est de prouver que l\'alternative écologique est aussi performante !', cat:'Entreprise', w:2 },
    { q:'emploie recrutement poste travail carriere', a:'COF-COAL a créé plus de 50 emplois locaux dans la collecte, la production et la distribution. Nous recrutons régulièrement. Contactez-nous pour les opportunités !', cat:'Social', w:2 }
  ]);
}
function addKnowledge(items) {
  items.forEach(function(i) { CHATBOT_KNOWLEDGE.push({ q:i.q, a:i.a, cat:i.cat, weight:i.w }); });
}

var SYNONYMS = {
  quoi:['cest','definir','definition','signifie','c quoi','quesque','c\'est'],
  fabrique:['fabrication','produit','production','processus','comment','fabriquer'],
  ecologique:['vert','environnement','naturel','eco','verte','durable','recyclage'],
  acheter:['achat','trouver','localiser','disponible','vente','commander','carrefour','monoprix','boutique','magasin','rayon','commande','pack','produit'],
  sante:['sain','nocif','toxique','pollution','risque','dangereux','chimique'],
  economie:['economique','emploi','investissement','roi','cout','prix','argent'],
  futur:['futur','projet','vision','developpement','expansion','objectif','plan'],
  biomasse:['dechet','dechets','marc','cafe','olive','the','noix','bois'],
  ia:['intelligence','artificielle','ai','robot','automatique','vision','qualite','controle']
};

function normalizeText(t) {
  return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
}

function expandQuery(q) {
  var words = q.split(/\s+/);
  var expanded = words.slice();
  words.forEach(function(w) {
    for (var key in SYNONYMS) {
      if (key === w || SYNONYMS[key].indexOf(w) !== -1) {
        expanded = expanded.concat(SYNONYMS[key]);
        break;
      }
    }
  });
  return expanded;
}

function scoreMatch(qWords, target, weight) {
  var tNorm = normalizeText(target);
  var tWords = tNorm.split(/\s+/);
  var score = 0;
  qWords.forEach(function(w) {
    if (w.length < 2) return;
    var exact = tWords.indexOf(w);
    if (exact !== -1) { score += weight * 2; }
    else if (tNorm.indexOf(w) !== -1) { score += weight; }
    tWords.forEach(function(tw) {
      if (tw.length > 3 && w.length > 2 && (tw.indexOf(w) !== -1 || w.indexOf(tw) !== -1)) { score += 0.3; }
    });
  });
  var qJoined = qWords.join(' ');
  tWords.forEach(function(tw) {
    if (tw.length > 3 && qJoined.indexOf(tw) !== -1) { score += 0.2; }
  });
  return score;
}

function findBestAnswer(query) {
  var q = normalizeText(query);
  var qWords = expandQuery(q);
  var best = null, bestScore = 0;
  CHATBOT_KNOWLEDGE.forEach(function(k) {
    var score = scoreMatch(qWords, k.q, k.weight);
    if (k.cat === CHATBOT_LAST_TOPIC) score += 0.5;
    if (score > bestScore) { bestScore = score; best = k; }
  });
  if (best && bestScore > 0) {
    CHATBOT_LAST_TOPIC = best.cat;
    return best;
  }
  return null;
}

function getFollowUps(cat) {
  var map = {
    'Définition':['Comment est-il fabriqué ?','Est-il vraiment écologique ?'],
    Production:['Quel est le rôle de l\'IA ?','Comment est-il fabriqué ?'],
    Environnement:['Est-ce que ça pollue en brûlant ?','Quels sont vos engagements sociaux ?'],
    'Économie':['Quels sont les avantages économiques ?','Où peut-on acheter COF-COAL ?'],
    Vente:['Où peut-on acheter COF-COAL ?','Quel est le prix ?'],
    'Santé':['Est-ce que ça pollue en brûlant ?','Est-il vraiment écologique ?'],
    Produit:['C\'est quoi un emballage plantable ?','Qu\'est-ce que COF-COAL ?'],
    Technologie:['Quel est le rôle de l\'IA ?','Comment est-il fabriqué ?'],
    Social:['Quels sont vos engagements sociaux ?','Quels sont vos projets futurs ?'],
    Vision:['Quels sont vos projets futurs ?','Où peut-on acheter COF-COAL ?'],
    Entreprise:['Qu\'est-ce que COF-COAL ?','Comment est-il fabriqué ?'],
    Accueil:['Qu\'est-ce que COF-COAL ?','Où acheter ?'],
    Boutique:['Quel est le prix ?','Où acheter ?','Quels packs sont disponibles ?'],
    Conclusion:['Qu\'est-ce que COF-COAL ?','Quels sont vos engagements sociaux ?'],
    Recommandation:['Comment est-il fabriqué ?','Où acheter ?'],
    Chiffres:['Quels sont les avantages économiques ?','Est-il vraiment écologique ?'],
    Recherche:['Quels sont vos projets futurs ?','Où acheter ?'],
    Comparaison:['Quels sont les avantages économiques ?','Qu\'est-ce que COF-COAL ?']
  };
  return map[cat] || ['Qu\'est-ce que COF-COAL ?','Où acheter ?','Est-ce écologique ?'];
}

function showTyping(messagesEl) {
  var div = document.createElement('div');
  div.className = 'chatbot-msg typing';
  div.textContent = '...';
  div.id = 'chatbotTyping';
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function removeTyping() {
  var el = document.getElementById('chatbotTyping');
  if (el) el.remove();
}

function initChatbot() {
  var container = document.getElementById('chatbotContainer');
  var panel = document.getElementById('chatbotPanel');
  var toggle = document.getElementById('chatbotToggle');
  var closeBtn = document.getElementById('chatbotClose');
  var input = document.getElementById('chatbotInput');
  var sendBtn = document.getElementById('chatbotSend');
  var messages = document.getElementById('chatbotMessages');
  if (!container) return;

  buildKnowledge();

  toggle.addEventListener('click', function() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      messages.scrollTop = messages.scrollHeight;
      setTimeout(function() { input.focus(); }, 300);
    }
  });
  closeBtn.addEventListener('click', function() { panel.classList.remove('open'); });

  function addMessage(text, isUser) {
    var div = document.createElement('div');
    div.className = 'chatbot-msg ' + (isUser ? 'user' : 'bot');
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function addChips(questions) {
    var container = document.getElementById('chatbotSuggestions');
    container.innerHTML = '';
    questions.forEach(function(q) {
      var btn = document.createElement('button');
      btn.className = 'chatbot-chip';
      btn.textContent = q;
      btn.addEventListener('click', function() { handleQuery(this.textContent); });
      container.appendChild(btn);
    });
  }

  function handleQuery(query) {
    if (!query.trim()) return;
    addMessage(query, true);
    input.value = '';
    showTyping(messages);
    setTimeout(function() {
      removeTyping();
      var q = normalizeText(query);
      var qWords = q.split(/\s+/).filter(function(w) { return w.length > 1; });
      if (qWords.length === 0) {
        addMessage("Je n'ai pas compris votre question. Essayez de taper un mot-clé comme 'COF-COAL', 'prix', 'acheter', 'fabrication' ou choisissez une suggestion ci-dessous.");
        addChips(['Qu\'est-ce que COF-COAL ?','Où acheter ?','Comment est-il fabriqué ?']);
        return;
      }
      var match = findBestAnswer(query);
      if (match) {
        addMessage(match.a);
        var followUps = getFollowUps(match.cat);
        addChips(followUps);
      } else {
        addMessage("Je n'ai pas trouvé de réponse à cette question. Essayez : 'COF-COAL', 'prix', 'acheter', 'fabrication', 'environnement', 'contact'.");
        addChips(['Qu\'est-ce que COF-COAL ?','Où acheter ?','Comment est-il fabriqué ?']);
      }
    }, 600 + Math.random() * 400);
  }

  sendBtn.addEventListener('click', function() { handleQuery(input.value); });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleQuery(input.value);
  });

  document.querySelectorAll('.chatbot-chip').forEach(function(chip) {
    chip.addEventListener('click', function() { handleQuery(this.textContent); });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadComparisonData();
  initChatbot();
  initAuth();
});

// ===== AUTH / LOGIN =====
var AUTH_USER = localStorage.getItem('cofcoal_auth');

try {
  if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(SITE_CONFIG.firebase);
  }
} catch(e) { console.warn('Firebase init skipped:', e); }

function initAuth() {
  updateNavForAuth();

  var loginToggle = document.getElementById('loginToggle');
  var modal = document.getElementById('loginModal');
  var modalClose = document.getElementById('modalClose');
  var loginSubmit = document.getElementById('loginSubmit');
  if (!loginToggle || !modal) return;

  loginToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (AUTH_USER) {
      window.location.href = (window.location.pathname.includes('/pages/') ? '' : 'pages/') + 'dashboard.html';
    } else {
      modal.classList.add('open');
    }
  });

  if (modalClose) modalClose.addEventListener('click', function() { modal.classList.remove('open'); });
  modal.addEventListener('click', function(e) { if (e.target === modal) modal.classList.remove('open'); });

  if (loginSubmit) {
    loginSubmit.addEventListener('click', function() {
      var email = document.getElementById('loginEmail').value.trim();
      var password = document.getElementById('loginPassword').value;
      var errorEl = document.getElementById('loginError');
      if (!email || !password) {
        errorEl.textContent = 'Veuillez entrer email et mot de passe.';
        errorEl.classList.add('show');
        return;
      }
      if (email !== SITE_CONFIG.auth.email || password !== SITE_CONFIG.auth.password) {
        errorEl.textContent = 'Email ou mot de passe invalide.';
        errorEl.classList.add('show');
        return;
      }
      if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(function() {
            AUTH_USER = email;
            localStorage.setItem('cofcoal_auth', email);
            modal.classList.remove('open');
            updateNavForAuth();
          })
          .catch(function(err) {
            errorEl.textContent = 'Erreur: ' + err.message;
            errorEl.classList.add('show');
          });
      } else {
        AUTH_USER = email;
        localStorage.setItem('cofcoal_auth', email);
        modal.classList.remove('open');
        updateNavForAuth();
      }
    });
  }

  var inputs = document.querySelectorAll('#loginEmail, #loginPassword');
  inputs.forEach(function(inp) {
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && loginSubmit) loginSubmit.click();
    });
  });
}

function updateNavForAuth() {
  var toggle = document.getElementById('loginToggle');
  var dashMobile = document.getElementById('dashMobileLink');
  if (AUTH_USER) {
    if (toggle) { toggle.textContent = '📊 Tableau de bord'; toggle.classList.add('logged-in'); }
    if (dashMobile) dashMobile.style.display = '';
  } else {
    if (toggle) { toggle.textContent = '🔐 Connexion'; toggle.classList.remove('logged-in'); }
    if (dashMobile) dashMobile.style.display = 'none';
  }
}

function logoutUser() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().catch(function(e) { console.error(e); });
  }
  AUTH_USER = null;
  localStorage.removeItem('cofcoal_auth');
  updateNavForAuth();
  var modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('open');
  if (window.location.pathname.includes('dashboard.html')) {
    window.location.href = (window.location.pathname.includes('/pages/') ? '../' : '') + 'index.html';
  }
}
