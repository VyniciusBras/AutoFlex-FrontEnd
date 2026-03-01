# 🚀 AutoFlex - Front End
Aplicação web Next.js + React responsiva para gestão de materiais e sugestões de produção da AutoFlex Materials.

O front‑end consome uma API armazenada em src/services/api.ts e oferece funcionalidades de:

Visualizar inventário de matérias‑primas
Cadastrar/editar/excluir materiais
Criar produtos que consomem materiais
Exibir sugestões inteligentes de produção
Controle de estoque com alertas de baixo estoque

```bash
autoflex/
├── public/                     # ativos estáticos
├── src/
│   ├── app/                    # rotas e layout (Next.js 13+)
│   ├── components/             # UI reutilizável
│   ├── hooks/                  # lógica de estado (useInventory)
│   ├── inventory/              # modais de material
│   ├── services/               # cliente HTTP da API
│   ├── types/                  # tipos TypeScript
│   └── tests/                  # testes com Jest/React Testing Library
├── jest.config.js              # configuração de testes
├── tsconfig.json               # TypeScript
├── next.config.ts              # configurações do Next.js
├── package.json
└── README.md                  
```

## 🛠️ Tecnologias
- Next.js 13 (app router)
- React + TypeScript
- Tailwind CSS para estilização
- lucide-react para ícones
- Jest + React Testing Library para testes
- Hooks customizados (useInventory) para separar lógica de dados

## ⚡ Instalação & Execução

```bash
# Clonando e instalando dependências
git clone https://github.com/VyniciusBras/AutoFlex-FrontEnd.git

# Entrar na pasta autoflex
cd AutoFlex-FrontEnd/autoflex

# Instalar as dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev

# Para visualizar em localhost acesse:
http://localhost:3000

```

## 🧪 Executando Testes
Os testes cobrem componentes principais, incluindo a dashboard.
```bash
npm test
```

## 📦 Serviços e API
O arquivo src/services/api.ts define o inventoryService que interage com o backend.
As chamadas incluem:

- getMaterials(), createMaterial(), updateMaterial(), deleteMaterial()
- getProductionSuggestions()
- createProduct(), deleteProduct()

A arquitetura CRUD em back end, segue fluxo client-first utilizando hooks para cache/refetch.

## 🧩 Componentes-Chave

| Componente       | Descrição                                     |
|------------------|-----------------------------------------------|
| Header           | barra superior com ações de adicionar         |
| InventoryTable   | tabela de materiais com edição/exclusão       |
| ProductModal     | formulário de criação de produto              |
| MaterialModal    | formulário de material (criar/editar)         |
| SuggestionCard   | mostra sugestões inteligentes                 |

## 📌 Observações
- Modais e formulários respeitam estado exterior via props.
- Ordenação de materiais por quantidade e indicação de “Low Stock” a partir de 10 unidades.
- Uso de tipagens (RawMaterial, ProductionSuggestion) para segurança.

## Autor
Desenvolvido por VyniciusBras.
