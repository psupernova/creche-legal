interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: number;
  keywords: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'como-escolher-creche-cachorro',
    title: 'Como escolher a melhor creche legal de cachorro',
    excerpt: 'Descubra os principais fatores a considerar ao escolher uma creche para seu pet...',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80',
    date: '2024-03-15',
    author: 'Maria Silva',
    readTime: 5,
    keywords: ['creche para cachorro', 'day care canino', 'hotel para cachorro', 'cuidados com pets'],
    content: `
      <article class="prose lg:prose-xl max-w-none">
        <h1>Como escolher a melhor creche legal de cachorro</h1>
        
        <p>Escolher a creche ideal para seu cachorro é uma decisão importante que requer cuidadosa consideração. Uma creche legal de cachorro deve oferecer não apenas um ambiente seguro, mas também estimulante e acolhedor para seu pet.</p>

        <h2>1. Avalie a estrutura física</h2>
        <p>Uma boa creche legal de cachorro deve ter:</p>
        <ul>
          <li>Espaço amplo para brincadeiras</li>
          <li>Áreas separadas para cães de diferentes portes</li>
          <li>Ambiente climatizado</li>
          <li>Sistema de monitoramento por câmeras</li>
          <li>Área de descanso confortável</li>
        </ul>

        <h2>2. Verifique a equipe</h2>
        <p>Profissionais qualificados são essenciais em uma creche legal de cachorro. Certifique-se de que:</p>
        <ul>
          <li>A equipe tem formação em comportamento animal</li>
          <li>Há veterinário disponível</li>
          <li>Os funcionários são atenciosos e pacientes</li>
          <li>Existe treinamento contínuo da equipe</li>
        </ul>

        <h2>3. Observe os protocolos de segurança</h2>
        <p>Uma creche legal de cachorro deve ter:</p>
        <ul>
          <li>Exigência de carteira de vacinação atualizada</li>
          <li>Avaliação comportamental dos cães</li>
          <li>Procedimentos de emergência estabelecidos</li>
          <li>Limite adequado de cães por monitor</li>
        </ul>

        <h2>Produtos Recomendados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/61SAKXRe2aS._AC_SL1200_.jpg" alt="Cama Luppet" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Cama Luppet Luxo</h3>
              <p class="text-gray-600 mb-4">Para Cachorro Pequeno Médio Porte Até 12Kg</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 134,30</p>
              <a href="https://www.amazon.com.br/Cachorro-Luppet-Pequeno-M%C3%A9dio-Grafite/dp/B094LDTVFR?th=1&linkCode=sl1&tag=supernova0f6-20&linkId=f3d89821a89d73282cf905f275df6745&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/41sig9bxmdL._AC_.jpg" alt="Brinquedo JAMBO PET" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Brinquedo Pelúcia JAMBO PET</h3>
              <p class="text-gray-600 mb-4">Pato Formato Fofo E Som Divertido</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 37,99</p>
              <a href="https://www.amazon.com.br/JAMBO-PET-Brinquedo-Pel%C3%BAcia-Divertido/dp/B0D8V496Y6?th=1&linkCode=sl1&tag=supernova0f6-20&linkId=a279f2242dba7250530f45a43833e932&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>
        </div>
      </article>
    `
  },
  {
    id: '2',
    slug: 'beneficios-socializacao',
    title: 'Benefícios da socialização em uma creche legal de cachorro',
    excerpt: 'Entenda por que a socialização é fundamental para o desenvolvimento do seu cachorro...',
    image: 'https://images.unsplash.com/photo-1556866261-8763a7662333?auto=format&fit=crop&q=80',
    date: '2024-03-10',
    author: 'João Santos',
    readTime: 4,
    keywords: ['socialização de cães', 'comportamento canino', 'creche para cachorro', 'desenvolvimento pet'],
    content: `
      <article class="prose lg:prose-xl max-w-none">
        <h1>Benefícios da socialização em uma creche legal de cachorro</h1>
        
        <p>A socialização é um aspecto crucial no desenvolvimento comportamental dos cães. Uma creche legal de cachorro proporciona um ambiente ideal para essa importante etapa da vida do seu pet.</p>

        <h2>1. Desenvolvimento comportamental</h2>
        <p>A socialização em uma creche legal de cachorro proporciona:</p>
        <ul>
          <li>Redução da ansiedade de separação</li>
          <li>Melhora nas habilidades sociais</li>
          <li>Diminuição da agressividade</li>
          <li>Aumento da confiança</li>
        </ul>

        <h2>2. Benefícios físicos</h2>
        <p>A interação com outros cães promove:</p>
        <ul>
          <li>Exercício físico regular</li>
          <li>Estímulo mental</li>
          <li>Melhor qualidade do sono</li>
          <li>Sistema imunológico mais forte</li>
        </ul>

        <h2>3. Vantagens emocionais</h2>
        <p>O convívio social proporciona:</p>
        <ul>
          <li>Redução do estresse</li>
          <li>Maior equilíbrio emocional</li>
          <li>Desenvolvimento da empatia</li>
          <li>Melhora no humor</li>
        </ul>

        <h2>Produtos Recomendados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/61J9s8bbHhL._AC_SL1200_.jpg" alt="Kit Brinquedos" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Kit 5 Brinquedos para Filhote</h3>
              <p class="text-gray-600 mb-4">Mordedor Bolinha Pet Galinha Sonoro</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 39,90</p>
              <a href="https://www.amazon.com.br/Brinquedo-Filhote-Mordedor-cachorros-Bolinha/dp/B0CS9V8W2V?psc=1&linkCode=sl1&tag=supernova0f6-20&linkId=8a3a8bb0350436feb9be42bec5700525&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/51WAp7PEBmL._AC_SL1065_.jpg" alt="Cama Pet Acrimet" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Cama Pet Confortável</h3>
              <p class="text-gray-600 mb-4">Higiênica com Manta Verde</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 223,80</p>
              <a href="https://www.amazon.com.br/Cachorros-Confort%C3%A1vel-Higi%C3%AAnica-Manta-Acrimet/dp/B0BTTG9T18?psc=1&linkCode=sl1&tag=supernova0f6-20&linkId=c450216bf99c314a8b3acc4a9fd52798&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>
        </div>
      </article>
    `
  },
  {
    id: '3',
    slug: 'primeiro-dia-creche',
    title: 'Preparando seu pet para o primeiro dia na creche legal de cachorro',
    excerpt: 'Dicas práticas para tornar a adaptação do seu cachorro mais tranquila...',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80',
    date: '2024-03-05',
    author: 'Ana Oliveira',
    readTime: 6,
    keywords: ['adaptação pet', 'primeiro dia creche', 'creche para cachorro', 'cuidados com pets'],
    content: `
      <article class="prose lg:prose-xl max-w-none">
        <h1>Preparando seu pet para o primeiro dia na creche legal de cachorro</h1>
        
        <p>O primeiro dia em uma creche legal de cachorro pode ser desafiador tanto para o pet quanto para o tutor. Com a preparação adequada, você pode tornar essa transição mais suave e positiva.</p>

        <h2>1. Preparação prévia</h2>
        <p>Antes do primeiro dia:</p>
        <ul>
          <li>Atualize as vacinas</li>
          <li>Faça uma visita prévia à creche</li>
          <li>Prepare os documentos necessários</li>
          <li>Mantenha a rotina normal do pet</li>
        </ul>

        <h2>2. No dia da adaptação</h2>
        <p>Para um primeiro dia tranquilo:</p>
        <ul>
          <li>Chegue cedo</li>
          <li>Mantenha-se calmo e positivo</li>
          <li>Traga o brinquedo favorito</li>
          <li>Faça uma despedida breve</li>
        </ul>

        <h2>3. Acompanhamento</h2>
        <p>Durante o período de adaptação:</p>
        <ul>
          <li>Monitore o comportamento</li>
          <li>Mantenha comunicação com a equipe</li>
          <li>Observe sinais de estresse</li>
          <li>Celebre os progressos</li>
        </ul>

        <h2>Produtos Recomendados</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/61CdcYxHrVL._AC_SL1000_.jpg" alt="Cama Ortopédica" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Cama Ortopédica Duke & Dixie</h3>
              <p class="text-gray-600 mb-4">Colchão Antiderrapante 75x45cm</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 160,48</p>
              <a href="https://www.amazon.com.br/Colch%C3%A3o-Ortop%C3%A9dica-Confort%C3%A1vel-Confort-Antiderrapante/dp/B0CWPR3VT5?th=1&linkCode=sl1&tag=supernova0f6-20&linkId=3412715e86d4c6d57b136e28baaa3b5c&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://m.media-amazon.com/images/I/61R-Q+NddUL._AC_SL1000_.jpg" alt="Kit Brinquedos Antiestresse" class="w-full h-48 object-cover"/>
            <div class="p-4">
              <h3 class="font-bold mb-2">Kit 5 Brinquedos Antiestresse</h3>
              <p class="text-gray-600 mb-4">Mordedor Corda Interativo</p>
              <p class="text-lg font-bold text-amber-600 mb-4">R$ 69,90</p>
              <a href="https://www.amazon.com.br/Brinquedo-Resistente-Antiestresse-Ansiedade-Interativo/dp/B0D8YZHB66?psc=1&linkCode=sl1&tag=supernova0f6-20&linkId=e35eaf60877ecd1dd84b55c55d9f636d&language=pt_BR&ref_=as_li_ss_tl" target="_blank" rel="noopener noreferrer" class="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-amber-600 transition">
                Comprar na Amazon
              </a>
            </div>
          </div>
        </div>
      </article>
    `
  }
];